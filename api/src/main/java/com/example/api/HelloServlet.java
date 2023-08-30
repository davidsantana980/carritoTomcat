package com.example.api;

import com.example.api.DB.DBConfig;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.*;

import static com.example.api.DB.DBAdmin.*;

@WebServlet(name = "helloServlet", value = "/hello-servlet")
public class HelloServlet extends HttpServlet {
    private String message;

    public void init() {
        message = "Hello World!";
    }
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();

        String consulta = "SELECT * FROM productos ORDER BY id";
        out.println("<html><body>");

        try {
            ResultSet resultados = consultaMuchos(consulta);

            if(resultados.next()){
                do {
                    int id = resultados.getInt("id");  // retrieve a 'double'-cell in the row
                    String nombre = resultados.getString("nombre");  // retrieve a 'String'-cell in the row
                    String row = new String(id + ", " + nombre);
                    out.println("<h1>" + row + "</h1>");
                } while(resultados.next());
            }else{
                throw new Exception("No results available");
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        out.println("</body></html>");

    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        try {
            String nombre = request.getParameter("nombre");
            agregaElemento(nombre);
        } catch (SQLException e) {
            e.printStackTrace();
        } catch (Exception e){
            System.out.println(e.getMessage());
        }finally {
            response.sendRedirect(request.getContextPath() + "/hello-servlet");
        }
    }
    public void doDelete(HttpServletRequest request, HttpServletResponse response) throws IOException {
        try {

            String id = request.getParameter("id");
            borraPorID(id);
        } catch (SQLException e) {
            e.printStackTrace();
        } catch (Exception e){
            System.out.println(e.getMessage());
        }finally {
            response.sendRedirect(request.getContextPath() + "/hello-servlet");
        }
    }

    public void doPut(HttpServletRequest request, HttpServletResponse response) throws IOException {
        try {

            String id = request.getParameter("id");
            String nuevoNombre = request.getParameter("nombre");

            modificaPorId(id, nuevoNombre);

        } catch (SQLException e) {
            e.printStackTrace();
        } catch (Exception e){
            System.out.println(e.getMessage());
        }finally {
            response.sendRedirect(request.getContextPath() + "/hello-servlet");
        }
    }


    public void destroy() {
    }
}