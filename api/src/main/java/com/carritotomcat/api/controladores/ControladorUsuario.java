package com.carritotomcat.api.controladores;

import com.carritotomcat.api.DB.DBAdmin;
import com.carritotomcat.api.modelos.Usuario;
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

import static com.carritotomcat.api.utilidades.BuscaUsuario.buscaUsuario;

@WebServlet(name = "ControladorUsuario", value = {"/ControladorUsuario", "/api/usuarios"})
public class ControladorUsuario extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Connection pool = DBAdmin.conexion.connect();
        response.setContentType("application/json");
        response.setCharacterEncoding("utf-8");

        PrintWriter print = response.getWriter();

        Gson gson = new Gson();

        String email = request.getParameter("email");
        String password = request.getParameter("password");

        try {
            ArrayList<Usuario> resp = buscaUsuario(email, password, pool);

            print.print(gson.toJson(resp));
        } catch (Exception e) {
//                e.printStackTrace();
            Map<String, String> errorObj = new HashMap<>();
            errorObj.put("error", e.getMessage());

            print.print(gson.toJson(errorObj));
        }finally{
            print.flush();
            DBAdmin.conexion.closeConnection();
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String nombre = request.getParameter("nombre");
        String email = request.getParameter("email");
        String password = request.getParameter("password");
        String direccion = request.getParameter("direccion").isBlank() ? "" : request.getParameter("direccion");
        String tipo = request.getParameter("tipo");

        Connection pool = DBAdmin.conexion.connect();
        response.setContentType("application/json");
        response.setCharacterEncoding("utf-8");

        PrintWriter print = response.getWriter();

        Gson gson = new Gson();

        try{
            Map<String, String> resp = new HashMap<>();

            if(nombre.isBlank() || email.isBlank() || password.isBlank() || tipo.isBlank()) throw new Exception("Argumentos insuficentes");

            String insertaQ = "INSERT INTO public.usuarios(\n" +
                    "\tnombre, email, password, direccion, tipo)\n" +
                    "\tVALUES (?, ?, ?, ?, ?)" +
                    "RETURNING id, nombre, email, tipo" +
                    ";";
            PreparedStatement query = pool.prepareStatement(insertaQ, Statement.RETURN_GENERATED_KEYS);
            query.setString(1, nombre);
            query.setString(2, email);
            query.setString(3, password);
            query.setString(4, direccion);
            query.setInt(5, Integer.parseInt(tipo));

            int exito = query.executeUpdate();
            if (exito > 0) {
                resp.put("exito", "Exito insertando el usuario");
            } else {
                throw new Exception("Error insertando el usuario");
            }

            print.print(gson.toJson(resp));
        } catch (Exception e) {
//                e.printStackTrace();
            response.setStatus(400);
            Map<String, String> errorObj = new HashMap<>();
            errorObj.put("error", e.getMessage());

            print.print(gson.toJson(errorObj));
        }finally{
            print.flush();
            DBAdmin.conexion.closeConnection();
        }

//        System.out.println(email + " " + password);
    }
}