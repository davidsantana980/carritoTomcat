PGDMP         !            
    {            javaCommerce    15.2    15.2 .    9           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            :           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            ;           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            <           1262    16510    javaCommerce    DATABASE     �   CREATE DATABASE "javaCommerce" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Venezuela.1252';
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
    disponible boolean DEFAULT true,
    cantidad integer
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
            public          postgres    false    220            �            1259    25086    tipos_usuario    TABLE     ]   CREATE TABLE public.tipos_usuario (
    id integer NOT NULL,
    nombre character varying
);
 !   DROP TABLE public.tipos_usuario;
       public         heap    postgres    false            �            1259    25085    tipos_usuario_id_seq    SEQUENCE     �   ALTER TABLE public.tipos_usuario ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.tipos_usuario_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    227            �            1259    16535    usuarios    TABLE     �   CREATE TABLE public.usuarios (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(50) NOT NULL,
    direccion character varying(200),
    tipo integer NOT NULL
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
            public          postgres    false    222            )          0    16511 
   categorias 
   TABLE DATA           0   COPY public.categorias (id, nombre) FROM stdin;
    public          postgres    false    214   �5       +          0    16515    detalles_pedido 
   TABLE DATA           p   COPY public.detalles_pedido (id_detalle, pedido_id, producto_id, cantidad_producto, precio_detalle) FROM stdin;
    public          postgres    false    216   �5       4          0    16714    imagenes_producto 
   TABLE DATA           U   COPY public.imagenes_producto (id_imagen, id_producto, direccion_imagen) FROM stdin;
    public          postgres    false    225   w6       -          0    16523    pedidos 
   TABLE DATA           j   COPY public.pedidos (id_pedido, usuario_id, fecha_pedido, precio_total_pedido, pedido_pagado) FROM stdin;
    public          postgres    false    218   �6       /          0    16528 	   productos 
   TABLE DATA           h   COPY public.productos (id, nombre, descripcion, precio, categoria_id, disponible, cantidad) FROM stdin;
    public          postgres    false    220   ~7       6          0    25086    tipos_usuario 
   TABLE DATA           3   COPY public.tipos_usuario (id, nombre) FROM stdin;
    public          postgres    false    227   x;       1          0    16535    usuarios 
   TABLE DATA           P   COPY public.usuarios (id, nombre, email, password, direccion, tipo) FROM stdin;
    public          postgres    false    222   �;       =           0    0    categorias_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.categorias_id_seq', 3, true);
          public          postgres    false    215            >           0    0    detallesPedido_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public."detallesPedido_id_seq"', 29, true);
          public          postgres    false    217            ?           0    0    imagenes_producto_id_imagen_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public.imagenes_producto_id_imagen_seq', 8, true);
          public          postgres    false    224            @           0    0    pedidos_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.pedidos_id_seq', 119, true);
          public          postgres    false    219            A           0    0    productos_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.productos_id_seq', 51, true);
          public          postgres    false    221            B           0    0    tipos_usuario_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.tipos_usuario_id_seq', 2, true);
          public          postgres    false    226            C           0    0    usuarios_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.usuarios_id_seq', 29, true);
          public          postgres    false    223            �           2606    16540    categorias categorias_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.categorias
    ADD CONSTRAINT categorias_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.categorias DROP CONSTRAINT categorias_pkey;
       public            postgres    false    214            �           2606    16542 #   detalles_pedido detallesPedido_pkey 
   CONSTRAINT     k   ALTER TABLE ONLY public.detalles_pedido
    ADD CONSTRAINT "detallesPedido_pkey" PRIMARY KEY (id_detalle);
 O   ALTER TABLE ONLY public.detalles_pedido DROP CONSTRAINT "detallesPedido_pkey";
       public            postgres    false    216            �           2606    25099    usuarios email 
   CONSTRAINT     J   ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT email UNIQUE (email);
 8   ALTER TABLE ONLY public.usuarios DROP CONSTRAINT email;
       public            postgres    false    222            �           2606    16718 (   imagenes_producto imagenes_producto_pkey 
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
       public            postgres    false    220            �           2606    25092     tipos_usuario tipos_usuario_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.tipos_usuario
    ADD CONSTRAINT tipos_usuario_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.tipos_usuario DROP CONSTRAINT tipos_usuario_pkey;
       public            postgres    false    227            �           2606    16550    usuarios usuarios_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.usuarios DROP CONSTRAINT usuarios_pkey;
       public            postgres    false    222            �           2606    16551    productos categoria_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.productos
    ADD CONSTRAINT categoria_id FOREIGN KEY (categoria_id) REFERENCES public.categorias(id) NOT VALID;
 @   ALTER TABLE ONLY public.productos DROP CONSTRAINT categoria_id;
       public          postgres    false    220    214    3206            �           2606    16719    imagenes_producto id_producto    FK CONSTRAINT     �   ALTER TABLE ONLY public.imagenes_producto
    ADD CONSTRAINT id_producto FOREIGN KEY (id_producto) REFERENCES public.productos(id);
 G   ALTER TABLE ONLY public.imagenes_producto DROP CONSTRAINT id_producto;
       public          postgres    false    225    220    3212            �           2606    25105    detalles_pedido pedido_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.detalles_pedido
    ADD CONSTRAINT pedido_id FOREIGN KEY (pedido_id) REFERENCES public.pedidos(id_pedido) ON DELETE CASCADE NOT VALID;
 C   ALTER TABLE ONLY public.detalles_pedido DROP CONSTRAINT pedido_id;
       public          postgres    false    3210    218    216            �           2606    25110    detalles_pedido producto_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.detalles_pedido
    ADD CONSTRAINT producto_id FOREIGN KEY (producto_id) REFERENCES public.productos(id) ON DELETE CASCADE NOT VALID;
 E   ALTER TABLE ONLY public.detalles_pedido DROP CONSTRAINT producto_id;
       public          postgres    false    216    3212    220            �           2606    25093    usuarios tipo    FK CONSTRAINT     {   ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT tipo FOREIGN KEY (tipo) REFERENCES public.tipos_usuario(id) NOT VALID;
 7   ALTER TABLE ONLY public.usuarios DROP CONSTRAINT tipo;
       public          postgres    false    222    3220    227            �           2606    16566    pedidos usuario_id    FK CONSTRAINT     w   ALTER TABLE ONLY public.pedidos
    ADD CONSTRAINT usuario_id FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id);
 <   ALTER TABLE ONLY public.pedidos DROP CONSTRAINT usuario_id;
       public          postgres    false    218    3216    222            )   -   x�3��*M/M-I-�2�t���LI,�2�tN�)�I,���qqq �$      +   y   x�M��1ߢ�#۲�K��#0y䞬 �
���`t7x�����>���t_�:���\��aR'�ı��ʖ��FN���s�ˆ��R�?�9���_\�|�K��D�M�5NE3>�/
�!�      4   v   x�M�K�0Eѱ����~��
V4qD���3H�;>��'��Ro^={ݸ{	����,M�`�x��d$��]?��D�̲��	3a6(Rjl��ʩ~sh���G�ٽs�� �F}      -   q   x�e�A� Dѵ���$��K�=A����n��?2�
��J��!)���F�|/o�A�~��~D��m�ގ�£\D�:{c�^y�ե1��o��I��3͈���-�t�.6�      /   �  x�eU=s�6��_��Ɩ��]zΙIc�O�4Kp)�x����7.U��\�����-H�T2*D��{o�.���g���E��]"���j�Y,�6�����nIW\ٚ4;�a��!]sc�MvK+}g#�N�Hw^�����߷�ڱ�hE���]���5��X�]��ĺ����L)�I������"��M��[� )R3�����v�;�
�Zn���5~I�.����4�;��[
�!��r�d�(�щ�Fͭ��]:���~�igȏ��S֑*4�� ;U-�]̚��@L��g2��c%|�����=��MڋO.Ij"��x�Mm�%�J��.��SпP�>���ꎣ��#���j\�b�!R�� ��&n�]��`��6�mE�u1^=SL�JD� \��(>�sKJ��Ҳ���G1�,�(+�`QH���Z��/u�b'y��,�77�|υ�z�_-���5R�'ʙUvF���5��++��9�pLނdk7\�޺:x[kcJ���yO��~��+6���æ���J]c��(&��JîD* �ʝ�ig���HE�̽g|	Ɵ�#�Ѫ?�	�.��bjn'���,�V�O ��88�ޞy}L��
��xE�R�FӃ;|Fӣ��02�U��[�B�8��g�m��D�!Ai)����ǟ��Wꉺ��F=�n؅ N�Ml�o}i�#��#a��7o�(��Y��Ё�:��b�ւ�1��'��/Ѵ�=&3�io��v��zئ�#�ص9�2I|-ү��T�3��Z�GA�ѥ�ˮ.���u�oi�v�ٿ�{t�aH�S荍ra�{?V��dR3�ue�~�w9�G��s�(��}3~,��E �!����20'�������Xi.���QҞ���<W����/�e��x��?-�aB�NMq�C�n�L�}聋�K�W]�P�/\VR��y+�16�A�D�:�Ûp�iB�"v)Cr*���S0�묑Q6O|�7�tr������b��	+�ӗ      6   '   x�3�LL����,.)JL�/�2�,-.M,������� �P	�      1   �   x�u��n�0E��aӤ���]V��Ĵ�*Ƒ��;I�j���Μ�Z�S@?�]��~�l��i�W�'zB�=�e�/��t��s�<���"�tk�_�fT��~�N]g������©u�1:��~K9������g�7o�!��o���G�k���fD��l�FƇ��~DG�^?;�*[%RA��%Z	��KRQ2�5W��%������ {f�[��bs1���z��r[Yx�)��-.�      