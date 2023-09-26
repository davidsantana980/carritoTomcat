package com.carritotomcat.api.controladores;

import com.carritotomcat.api.DB.DBConfig;
import com.carritotomcat.api.modelos.Categoria;
import com.google.gson.Gson;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@WebServlet(name = "ControladorCategoria", value = {"/ControladorCategoria", "/api/categorias"})
public class ControladorCategoria extends HttpServlet {
    private static DBConfig conexion = new DBConfig();
    private static Connection pool;
    Gson gson = new Gson();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        pool = conexion.connect();
        PrintWriter print = response.getWriter();

//        String id = request.getParameter("id");

        try {
            String insertaQ = "SELECT * FROM public.categorias"; // WHERE id = (?)";
            PreparedStatement query = pool.prepareStatement(insertaQ, Statement.RETURN_GENERATED_KEYS);
//            query.setInt(1, Integer.parseInt(id));
            ResultSet categoria = query.executeQuery();
//            categoria.next();

            ArrayList<Categoria> resp = variasCategorias(categoria);

            print.print(gson.toJson(resp));
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
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    private static ArrayList<Categoria> variasCategorias(ResultSet resultado) throws SQLException {
        ArrayList<Categoria> resultObjArr = new ArrayList<>();
        if(resultado.next()) {
            do {
                Categoria resultObj = new Categoria();
                resultObj.setId(Integer.parseInt(resultado.getString("id")));
                resultObj.setNombre(resultado.getString("nombre"));

                resultObjArr.add(resultObj);
            }while(resultado.next());
        }

        return resultObjArr;
    }

}