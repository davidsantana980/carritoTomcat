package com.carritotomcat.api.controladores;

import com.carritotomcat.api.DB.DBConfig;
import com.carritotomcat.api.modelos.DetallePedido;
import com.carritotomcat.api.modelos.Pedido;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.*;
import java.util.*;

@WebServlet(name = "ControladorPedido", value = {"/ControladorPedido", "/api/pedidos"})
public class ControladorPedido extends HttpServlet {
    private static DBConfig conexion = new DBConfig();
    private static Connection pool;
    Gson gson = new Gson();
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        pool = conexion.connect();

        response.setContentType("application/json");
        response.setCharacterEncoding("utf-8");

        PrintWriter print = response.getWriter();

        String usuario_id = request.getParameter("usuario_id");
        String pedido_id = request.getParameter("pedido_id");

        try{
            StringBuilder consulta = new StringBuilder("SELECT * FROM pedidos ");
            Statement query = pool.createStatement();

            boolean condicion = true;
            while (condicion){
                if (!(usuario_id==null) && !usuario_id.isEmpty() && !usuario_id.isBlank()){
                    consulta.append("WHERE usuario_id=" + usuario_id);
                    condicion=false;
                } else if (!(pedido_id==null) && !pedido_id.isEmpty() && !pedido_id.isBlank()) {
                    consulta.append("WHERE id_pedido=" + pedido_id);
                    condicion=false;
                }else {
                    consulta.append("ORDER BY id_pedido");
                    condicion=false;
                }
            }

            ResultSet resultado = query.executeQuery(consulta.toString());
            ArrayList<Pedido> resultObjArr = PedidosOrdenados(resultado);
            response.setStatus(200);
            print.print(gson.toJson(resultObjArr));
        } catch (Exception e) {
            e.printStackTrace();
            Map<String, String> errorObj = new HashMap<>();
            errorObj.put("error", e.getMessage());

            print.print(gson.toJson(errorObj));
        }finally{
            print.flush();
            conexion.closeConnection();
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        pool = conexion.connect();
        response.setContentType("application/json");
        response.setCharacterEncoding("utf-8");

        PrintWriter print = response.getWriter();

        String usuario_id = request.getParameter("usuario_id");

        java.util.Date date = new java.util.Date();
        java.sql.Date fecha_pedido = new java.sql.Date(date.getTime());

        String productos_compradosParam = request.getParameter("productos_comprados");


        try{
            if(usuario_id == null || usuario_id.isBlank() || usuario_id.isEmpty()) throw new Exception("no parameter usuario_id");


            //desencripta el array de DetallePedidos. su forma es [{id_producto : int, cantidad_producto : int}]
            JsonArray jsonArray = JsonParser.parseString(productos_compradosParam).getAsJsonArray();
            ArrayList<DetallePedido> detallesArr = new ArrayList<DetallePedido>();
            for (JsonElement jsonElement : jsonArray) {
                DetallePedido pojo = gson.fromJson(jsonElement, DetallePedido.class);
                detallesArr.add(pojo);
            }

            if (detallesArr.isEmpty()) throw new Exception("no products bought");
            for (DetallePedido detalle : detallesArr) {
                if(detalle.getCantidad_producto() == 0 || detalle.getId_producto() == 0) throw new Exception("ERROR: pedido invalido");
            }


            //crea un nuevo Pedido con los parametros verificados
            Pedido pedido = new Pedido(Integer.parseInt(usuario_id), fecha_pedido, detallesArr);
            String query_pedidos_string = "INSERT INTO public.pedidos(usuario_id, fecha_pedido) VALUES (?, ?) RETURNING id_pedido;";

            PreparedStatement query_pedidos = pool.prepareStatement(query_pedidos_string, Statement.RETURN_GENERATED_KEYS);
            query_pedidos.setInt(1, pedido.getUsuario_id());
            query_pedidos.setDate(2, pedido.getFecha_pedido());
            query_pedidos.execute();
            ResultSet resultado = query_pedidos.getGeneratedKeys();

            //añade al objeto el id del pedido
            while (resultado.next()) pedido.setId_pedido(resultado.getInt("id_pedido"));

            //itera sobre el array original de DetallePedidos, e introduce en detalles_pedido sus datos...
            for (DetallePedido detallePedido : pedido.getProductos_comprados()) {
                String query_detalles_string = "INSERT INTO public.detalles_pedido(pedido_id, producto_id, cantidad_producto) VALUES (?, ?, ?) RETURNING id_detalle;";

                PreparedStatement query_detalles = pool.prepareStatement(query_detalles_string, Statement.RETURN_GENERATED_KEYS);
                //...aca se usa el id del pedido creado
                query_detalles.setInt(1, pedido.getId_pedido());
                query_detalles.setInt(2, detallePedido.getId_producto());
                query_detalles.setInt(3, detallePedido.getCantidad_producto());
                query_detalles.execute();

                ResultSet resultadoQueryDetalles = query_detalles.getGeneratedKeys();

                //guardo el id del detalle generado...
                String id_detalle = null;
                if (resultadoQueryDetalles.next()) id_detalle = resultadoQueryDetalles.getString("id_detalle");

                //actualizo el precio del detalle generado a cantidad_producto * precio_producto
                String precio_update_string =
                        "UPDATE detalles_pedido AS dp\n" +
                            "\tSET precio_detalle = dp.cantidad_producto * pr.precio\n" +
                            "\tFROM productos AS pr\n" +
                        "WHERE dp.producto_id = pr.id\n" +
                        "AND dp.id_detalle = (?);";

                PreparedStatement precio_update = pool.prepareStatement(precio_update_string);
                //...aca se usa el id del detalle generado
                precio_update.setInt(1, Integer.parseInt(id_detalle));

                precio_update.execute();
            }

            //actualizo el viejo array de detalles con los precios nuevos y calculados...
            String queryDetalles = "SELECT precio_detalle FROM public.detalles_pedido WHERE pedido_id=(?);";
            PreparedStatement query = pool.prepareStatement(queryDetalles, Statement.RETURN_GENERATED_KEYS);
            query.setInt(1, pedido.getId_pedido());
            ResultSet detalles = query.executeQuery();

            ArrayList nuevosDetallesArr = new ArrayList<DetallePedido>();
            while(detalles.next()) {
                DetallePedido detalle = new DetallePedido();
                detalle.setPrecio_detalle(detalles.getDouble("precio_detalle"));
                nuevosDetallesArr.add(detalle);
            }
            pedido.setProductos_comprados(nuevosDetallesArr);

            //saco el precio total del pedido con getPrecio_total_pedido, y actualizo pedidos.precio_total_pedido con ese precio
            String preciototal_update_string = "UPDATE pedidos SET precio_total_pedido = (?) WHERE pedidos.id_pedido = (?);";

            PreparedStatement preciototal_update = pool.prepareStatement(preciototal_update_string);
            preciototal_update.setDouble(1, pedido.getPrecio_total_pedido());
            preciototal_update.setInt(2, pedido.getId_pedido());

            preciototal_update.execute();

            response.setStatus(200);
            response.sendRedirect("/ControladorPedido?pedido_id=" +pedido.getId_pedido());
        }catch (Exception e) {
            e.printStackTrace();
            Map<String, String> errorObj = new HashMap<>();
            errorObj.put("error", e.getMessage());

            print.print(gson.toJson(errorObj));
        }finally{
            print.flush();
            conexion.closeConnection();
        }
    }

    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        pool = conexion.connect();
        response.setContentType("application/json");
        response.setCharacterEncoding("utf-8");

        PrintWriter print = response.getWriter();

        try {
            String pedido_id = request.getParameter("pedido_id");
            String pedido_pagado = request.getParameter("pedido_pagado");
            if (pedido_id == null || pedido_id.isEmpty() || pedido_id.isBlank()) throw new Exception("no pedido_id");
            if (pedido_pagado == null || pedido_pagado.isEmpty() || pedido_pagado.isBlank() || !Boolean.parseBoolean(pedido_pagado)) throw new Exception("no se pudo realizar el pago");

            String orden = "UPDATE public.pedidos SET pedido_pagado=COALESCE((?), pedido_pagado) WHERE id_pedido = (?) RETURNING id_pedido;";
            PreparedStatement query = pool.prepareStatement(orden, Statement.RETURN_GENERATED_KEYS);
            query.setBoolean(1, Boolean.parseBoolean(pedido_pagado));
            query.setInt(2, Integer.parseInt(pedido_id));

            query.execute();
            ResultSet resultado = query.getGeneratedKeys();

            if (resultado.next()) {
                HashMap<String, String> mensaje = new HashMap<>();
                mensaje.put("mensaje", "pedido " + String.valueOf(resultado.getInt("id_pedido")) + " pagado correctamente");

                response.setStatus(200);
                print.print(gson.toJson(mensaje));
            }else{
                throw new Exception("no results");
            }
        } catch (Exception e) {
            e.printStackTrace();
            Map<String, String> errorObj = new HashMap<>();
            errorObj.put("error", e.getMessage());

            print.print(gson.toJson(errorObj));
        }finally {
            print.flush();
            conexion.closeConnection();
        }
    }

    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("utf-8");
        pool = conexion.connect();
        PrintWriter print = response.getWriter();

        String pedido_id = request.getParameter("pedido_id");

        try {
            if (pedido_id == null || pedido_id.isEmpty() || pedido_id.isBlank()) throw new Exception("no parameter");
            String queryDetalles = "DELETE FROM public.detalles_pedido WHERE pedido_id=(?);";

            PreparedStatement queryDetallesEliminados = pool.prepareStatement(queryDetalles);
            queryDetallesEliminados.setInt(1, Integer.parseInt(pedido_id));
            queryDetallesEliminados.execute();

            String insertaQ = "DELETE FROM public.pedidos WHERE id_pedido = (?)";

            PreparedStatement query = pool.prepareStatement(insertaQ);
            query.setInt(1, Integer.parseInt(pedido_id));
            query.execute();

            response.setStatus(200);

            Map<String, String> resObj = new HashMap<>();
            resObj.put("exito", "pedido eliminado");

            print.print(gson.toJson(resObj));
        } catch (Exception e) {
//                e.printStackTrace();
            Map<String, String> errorObj = new HashMap<>();
            errorObj.put("error", e.getMessage());

            print.print(gson.toJson(errorObj));
        }finally{
            print.flush();
            conexion.closeConnection();
        }

    }

    private static ArrayList<Pedido> PedidosOrdenados(ResultSet resultado) throws SQLException {
        ArrayList<Pedido> resultObjArr = new ArrayList<>();
        if(resultado.next()) {
            do {
                Pedido resultObj = new Pedido();
                resultObj.setId_pedido(Integer.parseInt(resultado.getString("id_pedido")));
                resultObj.setUsuario_id(resultado.getInt("usuario_id"));
                resultObj.setFecha_pedido(resultado.getDate("fecha_pedido"));
                resultObj.setPagado(resultado.getBoolean("pedido_pagado"));

                ArrayList detallesArr = new ArrayList<DetallePedido>();
                String queryDetalles = "SELECT producto_id, cantidad_producto, precio_detalle FROM public.detalles_pedido WHERE pedido_id=(?);";
                PreparedStatement query = pool.prepareStatement(queryDetalles, Statement.RETURN_GENERATED_KEYS);
                query.setInt(1, resultObj.getId_pedido());
                ResultSet detalles = query.executeQuery();
                while(detalles.next()) {
                    DetallePedido detalle = new DetallePedido();

                    String buscaProd = "SELECT p.nombre, c.nombre AS categoria \n" +
                            "\tFROM public.productos AS p \n" +
                            "\tJOIN categorias AS c \t\n" +
                            "\t\tON p.categoria_id = c.id AND p.id = (?);";
                    PreparedStatement queryProd = pool.prepareStatement(buscaProd, Statement.RETURN_GENERATED_KEYS);
                    queryProd.setInt(1, detalles.getInt("producto_id"));
                    ResultSet resultProd = queryProd.executeQuery();
                    resultProd.next();

                    detalle.setNombre_producto(resultProd.getString("nombre"));
                    detalle.setCategoria_producto(resultProd.getString("categoria"));
                    detalle.setId_producto(detalles.getInt("producto_id"));
                    detalle.setCantidad_producto(detalles.getInt("cantidad_producto"));
                    detalle.setPrecio_detalle(detalles.getDouble("precio_detalle"));

                    detallesArr.add(detalle);
                }

                resultObj.setProductos_comprados(detallesArr);
                resultObj.getPrecio_total_pedido();

                resultObjArr.add(resultObj);
            }while(resultado.next());
        }

        return resultObjArr;
    }
}