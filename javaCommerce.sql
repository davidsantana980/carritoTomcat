PGDMP         2                {            javaCommerce    15.2    15.2 &    ,           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            -           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            .           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            /           1262    16510    javaCommerce    DATABASE     �   CREATE DATABASE "javaCommerce" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Venezuela.1252';
    DROP DATABASE "javaCommerce";
                postgres    false            �            1259    16511 
   categorias    TABLE     ^   CREATE TABLE public.categorias (
    id integer NOT NULL,
    nombre character varying(50)
);
    DROP TABLE public.categorias;
       public         heap    postgres    false            �            1259    16514    categorias_id_seq    SEQUENCE     �   ALTER TABLE public.categorias ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.categorias_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    214            �            1259    16515    detalles_pedido    TABLE     �   CREATE TABLE public.detalles_pedido (
    id_detalle integer NOT NULL,
    pedido_id integer,
    producto_id integer,
    cantidad_producto integer,
    precio_detalle double precision
);
 #   DROP TABLE public.detalles_pedido;
       public         heap    postgres    false            �            1259    16518    detallesPedido_id_seq    SEQUENCE     �   ALTER TABLE public.detalles_pedido ALTER COLUMN id_detalle ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."detallesPedido_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    216            �            1259    16519    metodosPago    TABLE     a   CREATE TABLE public."metodosPago" (
    id integer NOT NULL,
    nombre character varying(50)
);
 !   DROP TABLE public."metodosPago";
       public         heap    postgres    false            �            1259    16522    metodosPago_id_seq    SEQUENCE     �   ALTER TABLE public."metodosPago" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."metodosPago_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    218            �            1259    16523    pedidos    TABLE     �   CREATE TABLE public.pedidos (
    id_pedido integer NOT NULL,
    usuario_id integer,
    fecha_pedido date,
    precio_total_pedido double precision,
    pedido_pagado boolean DEFAULT false
);
    DROP TABLE public.pedidos;
       public         heap    postgres    false            �            1259    16527    pedidos_id_seq    SEQUENCE     �   ALTER TABLE public.pedidos ALTER COLUMN id_pedido ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.pedidos_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    220            �            1259    16528 	   productos    TABLE     �   CREATE TABLE public.productos (
    id integer NOT NULL,
    nombre character varying(100),
    descripcion text,
    precio double precision,
    categoria_id integer,
    disponible boolean DEFAULT true
);
    DROP TABLE public.productos;
       public         heap    postgres    false            �            1259    16534    productos_id_seq    SEQUENCE     �   ALTER TABLE public.productos ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.productos_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    222            �            1259    16535    usuarios    TABLE     �   CREATE TABLE public.usuarios (
    id integer NOT NULL,
    nombre character varying(100),
    email character varying(100),
    password character varying(50),
    direccion character varying(200)
);
    DROP TABLE public.usuarios;
       public         heap    postgres    false            �            1259    16538    usuarios_id_seq    SEQUENCE     �   ALTER TABLE public.usuarios ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.usuarios_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    224                      0    16511 
   categorias 
   TABLE DATA           0   COPY public.categorias (id, nombre) FROM stdin;
    public          postgres    false    214   +                  0    16515    detalles_pedido 
   TABLE DATA           p   COPY public.detalles_pedido (id_detalle, pedido_id, producto_id, cantidad_producto, precio_detalle) FROM stdin;
    public          postgres    false    216   D+       "          0    16519    metodosPago 
   TABLE DATA           3   COPY public."metodosPago" (id, nombre) FROM stdin;
    public          postgres    false    218   a+       $          0    16523    pedidos 
   TABLE DATA           j   COPY public.pedidos (id_pedido, usuario_id, fecha_pedido, precio_total_pedido, pedido_pagado) FROM stdin;
    public          postgres    false    220   ~+       &          0    16528 	   productos 
   TABLE DATA           ^   COPY public.productos (id, nombre, descripcion, precio, categoria_id, disponible) FROM stdin;
    public          postgres    false    222   �+       (          0    16535    usuarios 
   TABLE DATA           J   COPY public.usuarios (id, nombre, email, password, direccion) FROM stdin;
    public          postgres    false    224   W,       0           0    0    categorias_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.categorias_id_seq', 3, true);
          public          postgres    false    215            1           0    0    detallesPedido_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public."detallesPedido_id_seq"', 1, false);
          public          postgres    false    217            2           0    0    metodosPago_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public."metodosPago_id_seq"', 1, false);
          public          postgres    false    219            3           0    0    pedidos_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.pedidos_id_seq', 1, false);
          public          postgres    false    221            4           0    0    productos_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.productos_id_seq', 20, true);
          public          postgres    false    223            5           0    0    usuarios_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.usuarios_id_seq', 1, true);
          public          postgres    false    225            �           2606    16540    categorias categorias_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.categorias
    ADD CONSTRAINT categorias_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.categorias DROP CONSTRAINT categorias_pkey;
       public            postgres    false    214            �           2606    16542 #   detalles_pedido detallesPedido_pkey 
   CONSTRAINT     k   ALTER TABLE ONLY public.detalles_pedido
    ADD CONSTRAINT "detallesPedido_pkey" PRIMARY KEY (id_detalle);
 O   ALTER TABLE ONLY public.detalles_pedido DROP CONSTRAINT "detallesPedido_pkey";
       public            postgres    false    216            �           2606    16544    metodosPago metodosPago_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public."metodosPago"
    ADD CONSTRAINT "metodosPago_pkey" PRIMARY KEY (id);
 J   ALTER TABLE ONLY public."metodosPago" DROP CONSTRAINT "metodosPago_pkey";
       public            postgres    false    218            �           2606    16546    pedidos pedidos_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.pedidos
    ADD CONSTRAINT pedidos_pkey PRIMARY KEY (id_pedido);
 >   ALTER TABLE ONLY public.pedidos DROP CONSTRAINT pedidos_pkey;
       public            postgres    false    220            �           2606    16548    productos productos_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.productos
    ADD CONSTRAINT productos_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.productos DROP CONSTRAINT productos_pkey;
       public            postgres    false    222            �           2606    16550    usuarios usuarios_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.usuarios DROP CONSTRAINT usuarios_pkey;
       public            postgres    false    224            �           2606    16551    productos categoria_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.productos
    ADD CONSTRAINT categoria_id FOREIGN KEY (categoria_id) REFERENCES public.categorias(id) NOT VALID;
 @   ALTER TABLE ONLY public.productos DROP CONSTRAINT categoria_id;
       public          postgres    false    214    222    3201            �           2606    16556    detalles_pedido pedido_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.detalles_pedido
    ADD CONSTRAINT pedido_id FOREIGN KEY (pedido_id) REFERENCES public.pedidos(id_pedido);
 C   ALTER TABLE ONLY public.detalles_pedido DROP CONSTRAINT pedido_id;
       public          postgres    false    216    3207    220            �           2606    16561    detalles_pedido producto_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.detalles_pedido
    ADD CONSTRAINT producto_id FOREIGN KEY (producto_id) REFERENCES public.productos(id);
 E   ALTER TABLE ONLY public.detalles_pedido DROP CONSTRAINT producto_id;
       public          postgres    false    222    216    3209            �           2606    16566    pedidos usuario_id    FK CONSTRAINT     w   ALTER TABLE ONLY public.pedidos
    ADD CONSTRAINT usuario_id FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id);
 <   ALTER TABLE ONLY public.pedidos DROP CONSTRAINT usuario_id;
       public          postgres    false    220    224    3211               -   x�3��*M/M-I-�2�t���LI,�2�tN�)�I,���qqq �$             x������ � �      "      x������ � �      $      x������ � �      &   �   x�}�M�0�ׯ���H\{�n
k#�`rzQ4J���o�{�{�t�:�"��kHDQ���D��r�5��F�nl����>�|�"��~h;��m�׉�
P���"Y�:1^A��e"y�#����n�wU�����,fTO�AP6$�Q�6�ʢ)&�1B��riv      (   /   x�3�H,(���/*ILI�ItH�M���K��E�q:''r��qqq ��?     