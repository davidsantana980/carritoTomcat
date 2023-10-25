
package com.carritotomcat.api.utilidades;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Collections;
import java.util.Objects;

import com.google.gson.Gson;
import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.FilterConfig;
import jakarta.servlet.ServletContext;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

public class FiltroAuth implements Filter {

    private ServletContext context;

    public void init(FilterConfig fConfig) throws ServletException {
        this.context = fConfig.getServletContext();
    }

    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        PrintWriter print = response.getWriter();
        Gson gson = new Gson();

        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse res = (HttpServletResponse) response;

        HttpSession session = req.getSession(false);

        res.addHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        res.addHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
        res.addHeader("Access-Control-Allow-Headers", "Origin, Content-Type, X-Auth-Token");
        res.addHeader("Access-Control-Allow-Credentials", "true");
        try{
            boolean esPedidoGetAProductos = (req.getServletPath().equalsIgnoreCase("/api/productos") && req.getMethod().equalsIgnoreCase("GET"));

            if(!esPedidoGetAProductos) {
                if (session == null || !req.isRequestedSessionIdValid()) {   //evalua la sesion solo si no es un pedido get a productos
                    throw new Exception("credenciales invalidos");
                }
            }

            res.setStatus(200);
            chain.doFilter(request, response);
        }catch (Exception e){
            res.setStatus(401);
            print.print(gson.toJson(Collections.singletonMap("error", e.getMessage())));
        }
    }

    public void destroy() {
        //close any resources here
    }
}