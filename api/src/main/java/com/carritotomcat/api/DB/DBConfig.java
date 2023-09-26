package com.carritotomcat.api.DB;

import java.sql.Connection;
import java.sql.DriverManager;

public class DBConfig {
    private String driver;
    private String url;
    private String user;
    private String pass;
    private Connection conn;

    public DBConfig() {
        driver = "org.postgresql.Driver";
        url = "jdbc:postgresql://localhost:5432/javaCommerce";
        user = "postgres";
        pass = "123456789";
        conn = null;
    }

    public Connection connect() {
        try {
            Class.forName(driver);
            conn = DriverManager.getConnection(url, user, pass);
            System.out.println("Connected to the PostgreSQL server successfully.");
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

        return conn;
    }

    public void closeConnection(){
        if(conn != null){
            try {
                conn.close();
                System.out.println("closed db connection");
            }catch (Exception e){
                System.out.println(e.getMessage());
            }
        }
    }

}
