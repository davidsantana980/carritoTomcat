package com.carritotomcat.api.controladores;

import com.carritotomcat.api.DB.DBAdmin;
import com.carritotomcat.api.modelos.Usuario;
import com.google.gson.Gson;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import static com.carritotomcat.api.utilidades.BuscaUsuario.buscaUsuario;

@WebServlet(name = "ControladorSesion", value = {"/ControladorSesion", "/api/login"})
public class ControladorSesion extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession sesion = request.getSession(false);
        PrintWriter print = response.getWriter();
        Gson gson = new Gson();

        response.setContentType("application/json");

        try {
            if (sesion != null && request.isRequestedSessionIdValid()) {
                response.setStatus(200);
                Map<String, String> tipo = new HashMap<>();

                if(sesion.getAttribute("administrador") != null){
                    tipo.put("tipo", "administrador");
                }else{
                    tipo.put("tipo", "usuario");
                }

                print.print(gson.toJson(tipo));
            }else{
                throw new Exception("credenciales invalidos");
            }
        }catch (Exception e) {
            e.printStackTrace();
            Map<String, String> errorObj = new HashMap<>();
            errorObj.put("error", e.getMessage());

            response.setStatus(401);
            print.print(gson.toJson(errorObj));
        }finally{
            print.flush();
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String email = request.getParameter("email");
        String password = request.getParameter("password");

        Connection pool = DBAdmin.conexion.connect();

        response.setContentType("application/json");
        response.setCharacterEncoding("utf-8");

        PrintWriter print = response.getWriter();
        Gson gson = new Gson();

        try {
            ArrayList<Usuario> resp = buscaUsuario(email, password, pool);

            if(!resp.isEmpty()){
                response.setStatus(200);
                HttpSession sesion = request.getSession();
                Map<String, String> mensaje = new HashMap<>();

                Usuario usuario = resp.get(0);
                System.out.println(String.valueOf(usuario.getId()));


                if(usuario.getTipo().equalsIgnoreCase("administrador")){
                    sesion.setAttribute("administrador", email);
                    mensaje.put("administrador", (String) sesion.getAttribute("administrador"));
                }else{
                    sesion.setAttribute("usuario", email);
                    mensaje.put("usuario", (String) sesion.getAttribute("usuario"));
                }

                Cookie usuario_id = new Cookie("usuario_id", String.valueOf(usuario.getId()));
                usuario_id.setPath("/");
                response.addCookie(usuario_id);

                print.print(gson.toJson(mensaje));
            }else{
                throw new Exception("email o password errados");
            }
        } catch (Exception e) {
            //                e.printStackTrace();
            Map<String, String> errorObj = new HashMap<>();
            errorObj.put("error", e.getMessage());

            response.setStatus(401);
            print.print(gson.toJson(errorObj));
        }finally{
            print.flush();
            DBAdmin.conexion.closeConnection();
        }

    }

    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            HttpSession sesion = request.getSession(false);

            if(request.isRequestedSessionIdValid() && sesion != null){
                sesion.invalidate();
                Cookie[] cookies = request.getCookies();
                if(cookies!=null){
                    for (int i = 0; i < cookies.length; i++) {
                        cookies[i].setMaxAge(0);
                    }
                }

                response.setStatus(200);
            }
        }catch (Exception e){
            response.setStatus(500);
            e.printStackTrace();
        }
    }

}

