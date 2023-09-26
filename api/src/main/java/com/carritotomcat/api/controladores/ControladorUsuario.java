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
            String insertaQ = "SELECT id, nombre, email, password, direccion\n" +
                    "\tFROM public.usuarios WHERE email = (?) AND password = (?)";
            PreparedStatement query = pool.prepareStatement(insertaQ, Statement.RETURN_GENERATED_KEYS);
            query.setString(1, email);
            query.setString(2, password);
            ResultSet categoria = query.executeQuery();

            ArrayList<Usuario> resp = usuariosOrganizados(categoria);

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
        String email = request.getParameter("email");
        String password = request.getParameter("password");

        System.out.println(email + " " + password);
    }

    private static ArrayList<Usuario> usuariosOrganizados(ResultSet resultado) throws SQLException {
        ArrayList<Usuario> resultObjArr = new ArrayList<>();
        if(resultado.next()) {
            do {
                Usuario resultObj = new Usuario();
                resultObj.setId(Integer.parseInt(resultado.getString("id")));
                resultObj.setEmail(resultado.getString("email"));

                resultObjArr.add(resultObj);
            }while(resultado.next());
        }

        return resultObjArr;
    }

}