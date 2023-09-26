PGDMP     4                    {            javaCommerce    15.2    15.2 '    -           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            .           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            /           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            0           1262    16510    javaCommerce    DATABASE     �   CREATE DATABASE "javaCommerce" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Venezuela.1252';
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
            public          postgres    false    216            �            1259    16714    imagenes_producto    TABLE     �   CREATE TABLE public.imagenes_producto (
    id_imagen integer NOT NULL,
    id_producto integer,
    direccion_imagen character varying(256)
);
 %   DROP TABLE public.imagenes_producto;
       public         heap    postgres    false            �            1259    16713    imagenes_producto_id_imagen_seq    SEQUENCE     �   ALTER TABLE public.imagenes_producto ALTER COLUMN id_imagen ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.imagenes_producto_id_imagen_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    225            �            1259    16523    pedidos    TABLE     �   CREATE TABLE public.pedidos (
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
            public          postgres    false    218            �            1259    16528 	   productos    TABLE     �   CREATE TABLE public.productos (
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
            public          postgres    false    220            �            1259    16535    usuarios    TABLE     �   CREATE TABLE public.usuarios (
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
            public          postgres    false    222                      0    16511 
   categorias 
   TABLE DATA           0   COPY public.categorias (id, nombre) FROM stdin;
    public          postgres    false    214   H-       !          0    16515    detalles_pedido 
   TABLE DATA           p   COPY public.detalles_pedido (id_detalle, pedido_id, producto_id, cantidad_producto, precio_detalle) FROM stdin;
    public          postgres    false    216   �-       *          0    16714    imagenes_producto 
   TABLE DATA           U   COPY public.imagenes_producto (id_imagen, id_producto, direccion_imagen) FROM stdin;
    public          postgres    false    225   �-       #          0    16523    pedidos 
   TABLE DATA           j   COPY public.pedidos (id_pedido, usuario_id, fecha_pedido, precio_total_pedido, pedido_pagado) FROM stdin;
    public          postgres    false    218   B.       %          0    16528 	   productos 
   TABLE DATA           ^   COPY public.productos (id, nombre, descripcion, precio, categoria_id, disponible) FROM stdin;
    public          postgres    false    220   ~.       '          0    16535    usuarios 
   TABLE DATA           J   COPY public.usuarios (id, nombre, email, password, direccion) FROM stdin;
    public          postgres    false    222   ^2       1           0    0    categorias_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.categorias_id_seq', 3, true);
          public          postgres    false    215            2           0    0    detallesPedido_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public."detallesPedido_id_seq"', 12, true);
          public          postgres    false    217            3           0    0    imagenes_producto_id_imagen_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public.imagenes_producto_id_imagen_seq', 8, true);
          public          postgres    false    224            4           0    0    pedidos_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.pedidos_id_seq', 12, true);
          public          postgres    false    219            5           0    0    productos_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.productos_id_seq', 30, true);
          public          postgres    false    221            6           0    0    usuarios_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.usuarios_id_seq', 1, true);
          public          postgres    false    223            �           2606    16540    categorias categorias_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.categorias
    ADD CONSTRAINT categorias_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.categorias DROP CONSTRAINT categorias_pkey;
       public            postgres    false    214            �           2606    16542 #   detalles_pedido detallesPedido_pkey 
   CONSTRAINT     k   ALTER TABLE ONLY public.detalles_pedido
    ADD CONSTRAINT "detallesPedido_pkey" PRIMARY KEY (id_detalle);
 O   ALTER TABLE ONLY public.detalles_pedido DROP CONSTRAINT "detallesPedido_pkey";
       public            postgres    false    216            �           2606    16718 (   imagenes_producto imagenes_producto_pkey 
   CONSTRAINT     m   ALTER TABLE ONLY public.imagenes_producto
    ADD CONSTRAINT imagenes_producto_pkey PRIMARY KEY (id_imagen);
 R   ALTER TABLE ONLY public.imagenes_producto DROP CONSTRAINT imagenes_producto_pkey;
       public            postgres    false    225            �           2606    16546    pedidos pedidos_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.pedidos
    ADD CONSTRAINT pedidos_pkey PRIMARY KEY (id_pedido);
 >   ALTER TABLE ONLY public.pedidos DROP CONSTRAINT pedidos_pkey;
       public            postgres    false    218            �           2606    16548    productos productos_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.productos
    ADD CONSTRAINT productos_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.productos DROP CONSTRAINT productos_pkey;
       public            postgres    false    220            �           2606    16550    usuarios usuarios_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.usuarios DROP CONSTRAINT usuarios_pkey;
       public            postgres    false    222            �           2606    16551    productos categoria_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.productos
    ADD CONSTRAINT categoria_id FOREIGN KEY (categoria_id) REFERENCES public.categorias(id) NOT VALID;
 @   ALTER TABLE ONLY public.productos DROP CONSTRAINT categoria_id;
       public          postgres    false    220    3201    214            �           2606    16719    imagenes_producto id_producto    FK CONSTRAINT     �   ALTER TABLE ONLY public.imagenes_producto
    ADD CONSTRAINT id_producto FOREIGN KEY (id_producto) REFERENCES public.productos(id);
 G   ALTER TABLE ONLY public.imagenes_producto DROP CONSTRAINT id_producto;
       public          postgres    false    3207    225    220            �           2606    16556    detalles_pedido pedido_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.detalles_pedido
    ADD CONSTRAINT pedido_id FOREIGN KEY (pedido_id) REFERENCES public.pedidos(id_pedido);
 C   ALTER TABLE ONLY public.detalles_pedido DROP CONSTRAINT pedido_id;
       public          postgres    false    218    3205    216            �           2606    16561    detalles_pedido producto_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.detalles_pedido
    ADD CONSTRAINT producto_id FOREIGN KEY (producto_id) REFERENCES public.productos(id);
 E   ALTER TABLE ONLY public.detalles_pedido DROP CONSTRAINT producto_id;
       public          postgres    false    220    3207    216            �           2606    16566    pedidos usuario_id    FK CONSTRAINT     w   ALTER TABLE ONLY public.pedidos
    ADD CONSTRAINT usuario_id FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id);
 <   ALTER TABLE ONLY public.pedidos DROP CONSTRAINT usuario_id;
       public          postgres    false    222    3209    218               -   x�3��*M/M-I-�2�t���LI,�2�tN�)�I,���qqq �$      !   '   x�34�44�42�4�4�3�24�"#c �ȍ���� Z�      *   v   x�M�K�0Eѱ����~��
V4qD���3H�;>��'��Ro^={ݸ{	����,M�`�x��d$��]?��D�̲��	3a6(Rjl��ʩ~sh���G�ٽs�� �F}      #   ,   x�34�4�4202�5��52�4�3�,�24B5��q��qqq ̼      %   �  x�]U�r7��� ��y�,3d��rB�e�3'���#l,�����\x�2��sv������tO��F}�~��o�__��g�I;��Ŧ�t�r��Yc[j�	^_]���)G�7�֑��ɐϬ?�Ħ����I#}��D٦�G��N��9�F��r���*%;~�k}��Xr�(�5!��?oM�����!4�Bl�Z��~�6*_m6�>�������t�/�3J�}ؑ�z'��r7�k<�Kx#Cdck�+=���XIcB/'S(�����WÃ���[��G����\��re6>���֚�|���8J����7��?�Ĥ�q�t7�u��}�e4�s�s�ku{{���hީry|��	�F�Xr�9M�8LX/"V2���"�#�=B�X�Ԫ��s܎o�W��fJk���h�݂�y\����ܣ	;K�@(^p�EM��L�]��(�Dd�݉J��J���YT�z9Dف�.D���?�a�Q�:}��|n<t��� ��4_���t�t[�O/��j%$�����2�M�sGS���UM�gC������LU�A\5*x[�6�Ж	'nr��>�2cn�߫���%���D
�R�gp;{<���d=o�%p��n���m���\uٷ���Ź��8�y�� (� N"�ߛ<j�ڄ��;��Y°Q���k�Y����xHV�o0�y�w��b�"k�Z��� /�d���=C<��jz"t4��I�Ձ0�*�����;/���plWZ(B\�$�t�"T�1e�u�������T�V=�~<�-O���u�.�U����&�S��1�[�i�,H�\���f?I+,�,�Y����B�.\c��t��>�2�������z��zUwe"�犪@��G�M�sȓev�a�d݋Ag���]�Su�~(.M�],{)'�0|�ޜ<X}$U��C����Ҡ��U5܇��
���� �J�_뫫��{���      '   /   x�3�H,(���/*ILI�ItH�M���K��E�q:''r��qqq ��?     