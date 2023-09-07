package com.example.api.modelos;

import java.io.Serializable;

public class Producto implements Serializable {
    private int id;
    private String nombre;
    private String descripcion;

    private boolean disponible;

    public boolean isDisponible() {
        return disponible;
    }

    public void setDisponible(boolean disponible) {
        this.disponible = disponible;
    }

    private double precio;
    private int categoria_id;
    private String categoria_string;


    public Producto() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Producto(String nombre, String descripcion, double precio, int categoria_id) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.categoria_id = categoria_id;
    }

    public Producto(String nombre, String descripcion, String precio, String categoria) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = Double.parseDouble(precio);
        this.categoria_id = Integer.parseInt(categoria);
    }

    public Producto(int id, String nombre, String descripcion, String precio, String categoria) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = Double.parseDouble(precio);
        this.categoria_id = Integer.parseInt(categoria);
    }


    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String text) {
        this.descripcion = text;
    }

    public double getPrecio() {
        return precio;
    }

    public void setPrecio(double precio) {
        this.precio = precio;
    }

    public int getCategoria_id() {
        return categoria_id;
    }

    public void setCategoria_id(int categoria_id) {
        this.categoria_id = categoria_id;
    }

    public String getCategoria_string() {
        return categoria_string;
    }

    public void setCategoria_string(String categoria_string) {
        this.categoria_string = categoria_string;
    }
}
