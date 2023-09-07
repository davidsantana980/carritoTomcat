package com.example.api.controladores;

import com.example.api.DB.DBConfig;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.HashMap;
import java.util.Map;

@WebServlet(name = "ControladorCategoria", value = {"/ControladorCategoria"})
public class ControladorCategoria extends HttpServlet {
    private static DBConfig conexion = new DBConfig();
    private static Connection pool;
    Gson gson = new Gson();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        pool = conexion.connect();
        PrintWriter print = response.getWriter();
        String id = request.getParameter("id");

        try {
            String insertaQ = "SELECT nombre FROM public.categorias WHERE id = (?)";
            PreparedStatement query = pool.prepareStatement(insertaQ, Statement.RETURN_GENERATED_KEYS);
            query.setInt(1, Integer.parseInt(id));
            ResultSet categoria = query.executeQuery();
            categoria.next();


            Map<String, String> resp = new HashMap<String, String>();
            resp.put("categoria", categoria.getString("nombre"));

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
}