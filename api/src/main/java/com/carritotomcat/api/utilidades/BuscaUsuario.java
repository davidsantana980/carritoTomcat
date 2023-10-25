package com.carritotomcat.api.utilidades;

import com.carritotomcat.api.modelos.Usuario;

import java.sql.*;
import java.util.ArrayList;

public class BuscaUsuario {

    public static ArrayList<Usuario> buscaUsuario(String email, String password, Connection pool) throws SQLException {
        String buscaQ = "SELECT usuarios.id, usuarios.nombre, usuarios.email, tipos_usuario.nombre AS tipo\n" +
                "\tFROM usuarios \n" +
                "\tINNER JOIN tipos_usuario ON usuarios.tipo=tipos_usuario.id\n" +
                "WHERE usuarios.email = (?) AND usuarios.password = (?)";
        PreparedStatement query = pool.prepareStatement(buscaQ, Statement.RETURN_GENERATED_KEYS);
        query.setString(1, email);
        query.setString(2, password);
        ResultSet resultados = query.executeQuery();

        ArrayList<Usuario> resp = usuariosOrganizados(resultados);

        return resp;
    }

    public static ArrayList<Usuario> usuariosOrganizados(ResultSet resultado) throws SQLException {
        ArrayList<Usuario> resultObjArr = new ArrayList<>();
        if(resultado.next()) {
            do {
                Usuario resultObj = new Usuario();

                resultObj.setId(resultado.getInt("id"));
                resultObj.setNombre(resultado.getString("nombre"));
                resultObj.setEmail(resultado.getString("email"));
                resultObj.setTipo(resultado.getString("tipo"));

                resultObjArr.add(resultObj);
            }while(resultado.next());
        }

        return resultObjArr;
    }
}
