package com.example.api.modelos;

public class DetallePedido {
    private int cantidad_producto;
    private Double precio_detalle;
    private int id_producto;
    private String nombre_producto;

    private String categoria_producto;

    public String getCategoria_producto() {
        return categoria_producto;
    }

    public void setCategoria_producto(String categoria_producto) {
        this.categoria_producto = categoria_producto;
    }

    public String getNombre_producto() {
        return nombre_producto;
    }

    public void setNombre_producto(String nombre_producto) {
        this.nombre_producto = nombre_producto;
    }

    public DetallePedido() {
    }

    public DetallePedido(int cantidad_producto, Double precio_detalle) {
        this.cantidad_producto = cantidad_producto;
        this.precio_detalle = precio_detalle;
    }

    public void setId_producto(int id_producto) {
        this.id_producto = id_producto;
    }

    public int getId_producto() {
        return id_producto;
    }

    public int getCantidad_producto() {
        return cantidad_producto;
    }

    public void setCantidad_producto(int cantidad_producto) {
        this.cantidad_producto = cantidad_producto;
    }

    public Double getPrecio_detalle() {
        return precio_detalle;
    }

    public void setPrecio_detalle(Double precio_detalle) {
        this.precio_detalle = precio_detalle;
    }
}
