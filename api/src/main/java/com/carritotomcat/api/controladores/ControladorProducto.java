package com.carritotomcat.api.controladores;

import com.carritotomcat.api.DB.DBConfig;
import com.carritotomcat.api.modelos.Producto;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import com.google.gson.Gson;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@WebServlet(name = "ControladorProducto", value = {"/ControladorProducto", "/api/productos"})
public class ControladorProducto extends HttpServlet {
    private static DBConfig conexion = new DBConfig();
    private static Connection pool;
    Gson gson = new Gson();


    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        pool = conexion.connect();

        response.setContentType("application/json");
        response.setCharacterEncoding("utf-8");

        String nombre = request.getParameter("nombre");
        String categoria_id = request.getParameter("categoria_id");
        String buscaTodos = request.getParameter("buscaTodos");
        PrintWriter print = response.getWriter();


        try {
            String consulta = "SELECT * FROM productos ORDER BY id";
            PreparedStatement query = pool.prepareStatement(consulta, Statement.RETURN_GENERATED_KEYS);

            boolean condicion = true;
            while (condicion) {
                if (nombre != null && !nombre.isEmpty() && !nombre.isBlank()) {
                    consulta = "SELECT * FROM productos WHERE lower(nombre) = (?) ORDER BY id";

                    query = pool.prepareStatement(consulta, Statement.RETURN_GENERATED_KEYS);
                    query.setString(1, nombre.toLowerCase());

                    condicion = false;
                } else if (categoria_id != null && !categoria_id.isEmpty() && !categoria_id.isBlank()) {
                    consulta = "SELECT * FROM productos WHERE categoria_id = (?) ORDER BY id";

                    query = pool.prepareStatement(consulta, Statement.RETURN_GENERATED_KEYS);
                    query.setInt(1, Integer.parseInt(categoria_id));

                    condicion = false;
                }else if (Boolean.parseBoolean(buscaTodos)) {
                    condicion = false;
                } else {
                    throw new Exception("no params");
                }
            }

            ResultSet resultado = query.executeQuery();

            ArrayList<Producto> resultObjArr = variosProductos(resultado);

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


            String nombre = request.getParameter("nombre");
            String descripcion = request.getParameter("descripcion");
            String precio = request.getParameter("precio");
            String categoria = request.getParameter("categoria");

            try {
                String[] props = {nombre,descripcion, precio, categoria};
                for (String prop : props) {
                    if(prop == null || prop.isBlank() || prop.isEmpty()) throw new Exception("parametro faltante");
                }

                Producto prod = new Producto(nombre, descripcion, precio, categoria);
                String orden = "INSERT INTO public.productos(\n" +
                        "\tnombre, descripcion, precio, categoria_id)\n" +
                        "\tVALUES (?, ?, ?, ?) RETURNING id, nombre, descripcion, precio, categoria_id, disponible;";

                PreparedStatement query = pool.prepareStatement(orden, Statement.RETURN_GENERATED_KEYS);
                query.setString(1, prod.getNombre());
                query.setString(2, prod.getDescripcion());
                query.setDouble(3, prod.getPrecio());
                query.setInt(4, prod.getCategoria_id());

                query.execute();
                ResultSet resultado = query.getGeneratedKeys();

                ArrayList<Producto> resultObj = variosProductos(resultado);
                response.setStatus(200);
                print.print(gson.toJson(resultObj.get(0)));

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

    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        pool = conexion.connect();
        response.setContentType("application/json");
        response.setCharacterEncoding("utf-8");

        PrintWriter print = response.getWriter();

        try {
            String id = request.getParameter("id");
            if (id == null || id.isEmpty() || id.isBlank()) throw new Exception("no id");

            String orden = "UPDATE public.productos SET nombre=COALESCE((?), nombre), descripcion=COALESCE((?), descripcion), precio=COALESCE((?), precio), categoria_id=COALESCE((?), categoria_id) WHERE id = (?) RETURNING id, nombre, descripcion, precio, categoria_id;";
            PreparedStatement query = pool.prepareStatement(orden, Statement.RETURN_GENERATED_KEYS);
            query.setInt(5, Integer.parseInt(id));

            String nombre = request.getParameter("nombre");
            String descripcion = request.getParameter("descripcion");
            String precio = request.getParameter("precio");
            String categoria = request.getParameter("categoria");

            query.setString(1, nombre);
            query.setString(2, descripcion);

            if (precio == null || precio.isEmpty() || precio.isBlank()) {
                query.setNull(3, java.sql.Types.NULL);
            }else{
                query.setDouble(3, Double.parseDouble(precio));
            }

            if (categoria == null || categoria.isEmpty() || categoria.isBlank()) {
                query.setNull(4, java.sql.Types.NULL);
            }else{
                query.setInt(4, Integer.parseInt(categoria));
            }

            query.execute();
            ResultSet resultado = query.getGeneratedKeys();

            ArrayList<Producto> resultObj = variosProductos(resultado);

            response.setStatus(200);
            print.print(gson.toJson(resultObj.get(0)));
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

        String id = request.getParameter("id");

        try {
            if (id == null || id.isEmpty() || id.isBlank()) throw new Exception("no parameter");
            String insertaQ = "DELETE FROM public.productos WHERE productos.id = (?)";

            PreparedStatement query = pool.prepareStatement(insertaQ, Statement.RETURN_GENERATED_KEYS);
            query.setInt(1, Integer.parseInt(id));
            query.execute();

            Map<String, String> message = new HashMap<>();
            message.put("mensaje", "producto id " + id + " eliminado correctamente");

            response.setStatus(200);
            print.print(gson.toJson(message));
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

    private static ArrayList<Producto> variosProductos(ResultSet resultado) throws SQLException {
        ArrayList<Producto> resultObjArr = new ArrayList<>();
        if(resultado.next()) {
            do {
                Producto resultObj = new Producto();
                resultObj.setId(Integer.parseInt(resultado.getString("id")));
                resultObj.setNombre(resultado.getString("nombre"));
                resultObj.setDescripcion(resultado.getString("descripcion"));
                resultObj.setPrecio(resultado.getDouble("precio"));
                resultObj.setCategoria_id(resultado.getInt("categoria_id"));
                resultObj.setDisponible(resultado.getBoolean("disponible"));

                String insertaQ = "SELECT nombre FROM public.categorias WHERE id = (?)";
                PreparedStatement query = pool.prepareStatement(insertaQ, Statement.RETURN_GENERATED_KEYS);
                query.setInt(1, resultado.getInt("categoria_id"));
                ResultSet categoria = query.executeQuery();
                if(categoria.next()) {
                    resultObj.setCategoria_string(categoria.getString("nombre"));
                }

                insertaQ = "SELECT direccion_imagen\n FROM public.imagenes_producto WHERE id_producto = (?)";
                query = pool.prepareStatement(insertaQ, Statement.RETURN_GENERATED_KEYS);
                query.setInt(1, resultObj.getId());
                ResultSet imagen_path = query.executeQuery();
                if(imagen_path.next()) {
                    resultObj.setDireccion_imagen(imagen_path.getString("direccion_imagen"));
                }

                resultObjArr.add(resultObj);
            }while(resultado.next());
        }

        return resultObjArr;
    }
}