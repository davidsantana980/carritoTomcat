package com.example.api.modelos;

import java.sql.Date;
import java.util.ArrayList;

public class Pedido {
    private int id_pedido;
    private int usuario_id;
    private Date fecha_pedido;
    private String estado_pedido;
    private ArrayList<DetallePedido> productos_comprados;
    private Double precio_total_pedido = null;

    public Double getPrecio_total_pedido() {
        if(precio_total_pedido == null && !(productos_comprados.isEmpty())) {
            Double sumaTotal = 0.0;
            for(DetallePedido producto : productos_comprados) sumaTotal += producto.getPrecio_detalle();
            setPrecio_total_pedido(sumaTotal);
        }

        return precio_total_pedido;

    }

    private void setPrecio_total_pedido(Double precio_total_pedido) {
        this.precio_total_pedido = precio_total_pedido;
    }
    public Pedido() {
    }
    public Pedido(int id_pedido, int usuario_id, Date fecha_pedido, String estado_pedido, ArrayList<DetallePedido> productos_comprados) {
        this.id_pedido = id_pedido;
        this.usuario_id = usuario_id;
        this.fecha_pedido = fecha_pedido;
        this.estado_pedido = estado_pedido;
        this.productos_comprados = productos_comprados;
    }
    public Pedido(int usuario_id, Date fecha_pedido, String estado_pedido, ArrayList<DetallePedido> productos_comprados) {
        this.usuario_id = usuario_id;
        this.fecha_pedido = fecha_pedido;
        this.estado_pedido = estado_pedido;
        this.productos_comprados = productos_comprados;
    }

    public int getId_pedido() {
        return id_pedido;
    }

    public void setId_pedido(int id_pedido) {
        this.id_pedido = id_pedido;
    }

    public int getUsuario_id() {
        return usuario_id;
    }

    public void setUsuario_id(int usuario_id) {
        this.usuario_id = usuario_id;
    }

    public Date getFecha_pedido() {
        return fecha_pedido;
    }

    public void setFecha_pedido(Date fecha_pedido) {
        this.fecha_pedido = fecha_pedido;
    }

    public String getEstado_pedido() {
        return estado_pedido;
    }

    public void setEstado_pedido(String estado_pedido) {
        this.estado_pedido = estado_pedido;
    }

    public ArrayList<DetallePedido> getProductos_comprados() {
        return productos_comprados;
    }

    public void setProductos_comprados(ArrayList<DetallePedido> productos_comprados) {
        this.productos_comprados = productos_comprados;
    }
}