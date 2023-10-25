package com.carritotomcat.api.DB;

import com.carritotomcat.api.modelos.Usuario;
import com.carritotomcat.api.utilidades.BuscaUsuario;
import com.google.gson.Gson;

import java.sql.*;
import java.util.ArrayList;

public class DBAdmin {
    public static DBConfig conexion = new DBConfig();
    private static Connection pool;

    public static ResultSet consultaMuchos(String consultaString) throws  Exception{
        pool = conexion.connect();

        try {
            Statement query = pool.createStatement();
            ResultSet resultados = query.executeQuery(consultaString);

            return resultados;

        } catch (Exception e) {
            throw e;
        }finally {
            conexion.closeConnection();
        }

    }

    public static void agregaElemento(String contenido) throws  Exception{
        pool = conexion.connect();

        try {
            if (contenido == null || contenido.isEmpty() || contenido.isBlank()) throw new Exception("no parameter");

            String insertaQ = "INSERT INTO public.usuarios (nombre) VALUES (?);";

            PreparedStatement query = pool.prepareStatement(insertaQ, Statement.RETURN_GENERATED_KEYS);
            query.setString(1, contenido);

            query.execute();
        } catch (Exception e) {
            throw e;
        }finally {
            conexion.closeConnection();
        }

    }
    public static void borraPorID(String id) throws  Exception{
        pool = conexion.connect();

        try {
            if (id == null || id.isEmpty() || id.isBlank()) throw new Exception("no parameter");
            String insertaQ = "DELETE FROM public.usuarios WHERE usuarios.id = (?);";

            PreparedStatement query = pool.prepareStatement(insertaQ, Statement.RETURN_GENERATED_KEYS);
            query.setInt(1, Integer.parseInt(id));

            query.execute();
        } catch (Exception e) {
            throw e;
        }finally {
            conexion.closeConnection();
        }

    }    
    
    public static void modificaPorId(String id, String nuevoCampo) throws  Exception{
        pool = conexion.connect();

        try {
            if (id == null || id.isEmpty() || id.isBlank()) throw new Exception("no parameter");
            String queryString = "UPDATE public.usuarios SET nombre=(?) WHERE id = (?);";

            PreparedStatement query = pool.prepareStatement(queryString, Statement.RETURN_GENERATED_KEYS);
            query.setString(1, nuevoCampo);
            query.setInt(2, Integer.parseInt(id));

            query.execute();
        } catch (Exception e) {
            throw e;
        }finally {
            conexion.closeConnection();
        }

    }

}
