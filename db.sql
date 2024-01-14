PGDMP      4                 |            perpustakaan    16.0    16.0 0               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    28366    perpustakaan    DATABASE     �   CREATE DATABASE perpustakaan WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_Indonesia.1252';
    DROP DATABASE perpustakaan;
                postgres    false                       0    0    perpustakaan    DATABASE PROPERTIES     >   ALTER DATABASE perpustakaan SET "TimeZone" TO 'Asia/Jakarta';
                     postgres    false            �            1259    28375    books    TABLE     n  CREATE TABLE public.books (
    id integer NOT NULL,
    title character varying(100),
    author character varying(50),
    publication smallint,
    synopsis character varying(1000),
    status smallint,
    category_id smallint,
    date_created timestamp without time zone,
    date_changed timestamp without time zone,
    delete smallint,
    file_url text
);
    DROP TABLE public.books;
       public         heap    postgres    false            �            1259    28374    books_id_seq    SEQUENCE     �   CREATE SEQUENCE public.books_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.books_id_seq;
       public          postgres    false    218                       0    0    books_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.books_id_seq OWNED BY public.books.id;
          public          postgres    false    217            �            1259    28422    books_status    TABLE     Z   CREATE TABLE public.books_status (
    id integer NOT NULL,
    name character varying
);
     DROP TABLE public.books_status;
       public         heap    postgres    false            �            1259    28421    books_status_id_seq    SEQUENCE     �   CREATE SEQUENCE public.books_status_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.books_status_id_seq;
       public          postgres    false    226                       0    0    books_status_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.books_status_id_seq OWNED BY public.books_status.id;
          public          postgres    false    225            �            1259    28384    category    TABLE     �   CREATE TABLE public.category (
    id integer NOT NULL,
    name character varying,
    date_created timestamp without time zone,
    date_changed timestamp without time zone,
    delete smallint
);
    DROP TABLE public.category;
       public         heap    postgres    false            �            1259    28383    category_id_seq    SEQUENCE     �   CREATE SEQUENCE public.category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.category_id_seq;
       public          postgres    false    220                        0    0    category_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.category_id_seq OWNED BY public.category.id;
          public          postgres    false    219            �            1259    28398    loans    TABLE       CREATE TABLE public.loans (
    id integer NOT NULL,
    book_id integer,
    user_id integer,
    status smallint,
    date_start date,
    date_return date,
    date_created timestamp without time zone,
    date_changed timestamp without time zone,
    delete smallint
);
    DROP TABLE public.loans;
       public         heap    postgres    false            �            1259    28397    loans_id_seq    SEQUENCE     �   CREATE SEQUENCE public.loans_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.loans_id_seq;
       public          postgres    false    222            !           0    0    loans_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.loans_id_seq OWNED BY public.loans.id;
          public          postgres    false    221            �            1259    28413    loans_status    TABLE     Z   CREATE TABLE public.loans_status (
    id integer NOT NULL,
    name character varying
);
     DROP TABLE public.loans_status;
       public         heap    postgres    false            �            1259    28412    loans_status_id_seq    SEQUENCE     �   CREATE SEQUENCE public.loans_status_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.loans_status_id_seq;
       public          postgres    false    224            "           0    0    loans_status_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.loans_status_id_seq OWNED BY public.loans_status.id;
          public          postgres    false    223            �            1259    28368    users    TABLE     �  CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(100),
    username character varying(50),
    password character varying(255),
    phone character varying(16),
    address character varying(500),
    role_id smallint,
    last_login timestamp without time zone,
    date_created timestamp without time zone,
    date_changed timestamp without time zone,
    delete smallint
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    28367    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    216            #           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    215            j           2604    28378    books id    DEFAULT     d   ALTER TABLE ONLY public.books ALTER COLUMN id SET DEFAULT nextval('public.books_id_seq'::regclass);
 7   ALTER TABLE public.books ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    218    218            n           2604    28425    books_status id    DEFAULT     r   ALTER TABLE ONLY public.books_status ALTER COLUMN id SET DEFAULT nextval('public.books_status_id_seq'::regclass);
 >   ALTER TABLE public.books_status ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    226    225    226            k           2604    28387    category id    DEFAULT     j   ALTER TABLE ONLY public.category ALTER COLUMN id SET DEFAULT nextval('public.category_id_seq'::regclass);
 :   ALTER TABLE public.category ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    219    220            l           2604    28401    loans id    DEFAULT     d   ALTER TABLE ONLY public.loans ALTER COLUMN id SET DEFAULT nextval('public.loans_id_seq'::regclass);
 7   ALTER TABLE public.loans ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    221    222    222            m           2604    28416    loans_status id    DEFAULT     r   ALTER TABLE ONLY public.loans_status ALTER COLUMN id SET DEFAULT nextval('public.loans_status_id_seq'::regclass);
 >   ALTER TABLE public.loans_status ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    223    224    224            i           2604    28371    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215    216                      0    28375    books 
   TABLE DATA           �   COPY public.books (id, title, author, publication, synopsis, status, category_id, date_created, date_changed, delete, file_url) FROM stdin;
    public          postgres    false    218   }4                 0    28422    books_status 
   TABLE DATA           0   COPY public.books_status (id, name) FROM stdin;
    public          postgres    false    226   �8                 0    28384    category 
   TABLE DATA           P   COPY public.category (id, name, date_created, date_changed, delete) FROM stdin;
    public          postgres    false    220   	9                 0    28398    loans 
   TABLE DATA           z   COPY public.loans (id, book_id, user_id, status, date_start, date_return, date_created, date_changed, delete) FROM stdin;
    public          postgres    false    222   �9                 0    28413    loans_status 
   TABLE DATA           0   COPY public.loans_status (id, name) FROM stdin;
    public          postgres    false    224   h:                 0    28368    users 
   TABLE DATA           �   COPY public.users (id, name, username, password, phone, address, role_id, last_login, date_created, date_changed, delete) FROM stdin;
    public          postgres    false    216   �:       $           0    0    books_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.books_id_seq', 8, false);
          public          postgres    false    217            %           0    0    books_status_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.books_status_id_seq', 1, false);
          public          postgres    false    225            &           0    0    category_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.category_id_seq', 1, false);
          public          postgres    false    219            '           0    0    loans_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.loans_id_seq', 7, true);
          public          postgres    false    221            (           0    0    loans_status_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.loans_status_id_seq', 1, false);
          public          postgres    false    223            )           0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 6, true);
          public          postgres    false    215            r           2606    28382    books books_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.books DROP CONSTRAINT books_pkey;
       public            postgres    false    218            z           2606    28429    books_status books_status_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.books_status
    ADD CONSTRAINT books_status_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.books_status DROP CONSTRAINT books_status_pkey;
       public            postgres    false    226            t           2606    28391    category category_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.category DROP CONSTRAINT category_pkey;
       public            postgres    false    220            v           2606    28403    loans loans_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.loans
    ADD CONSTRAINT loans_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.loans DROP CONSTRAINT loans_pkey;
       public            postgres    false    222            x           2606    28420    loans_status loans_status_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.loans_status
    ADD CONSTRAINT loans_status_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.loans_status DROP CONSTRAINT loans_status_pkey;
       public            postgres    false    224            p           2606    28373    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    216            {           2606    28392    books category_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.books
    ADD CONSTRAINT category_fkey FOREIGN KEY (category_id) REFERENCES public.category(id) NOT VALID;
 =   ALTER TABLE ONLY public.books DROP CONSTRAINT category_fkey;
       public          postgres    false    220    4724    218               J  x��U�n7}^?��]�E��&Nڴi�*�Q@�1Kήh�H���(_��:qҢH����2�3��,�k��3�]�����7��]cBW�NV��3�h5s�g���Ml�x���0?�c�1�0��\����1�ٵ�fZ�*DQ�(���	�W]_�Oc�b��+�+Ek_���C����ho{���;���ڙ��*FLq�Uc�����j|=ʁ��Mת����������x�C���a� ������+����b(亖�~O1�#�	YL����K����?����={aӹ����Ǟ�ee����F�\��N��hj�"��zupӅ*�{���g������h���C8��	n#�� ��ݑ:H*�u��`58��Ǵ[���V�}��u�|�Q�rPk�l���P6�J)`h��tz[��EM`:�n|��������K8�<ӬZTs&�KP�n�`u�R'r}"$y:�d����3�_C��R������zA*�h�R5�A�k9Ե����Y��T�h�u@H�5�8���xE*�>%�ʦ��P�a.3��
3�5t����A㣗+xX��Dn�W�*h)�l{��x6pS֕�Apb�\5qlF�5��j�N����ۺ�MU��vA���(��;_l ���Y�+g0D�L!��zZ$q"�#CZ���<�d�u�Jrwrx��.i���"����O6&fl�$�i~O*"G�##�D��폔���m�d������b3*1�H3�*� ��$yfs%�N���e��=9���^tL�;ۏ޻��=��9x�$̀q�RJ�u�:<%z@;/��XX��4,H�_l-��W���qleg�G�U۴tI�G��&֕��(o7�|7���㞄������v2�O�����~�]��[H4z��\Ql����=�b{�覚�D���u,��_���/ϔ;�㴣qF� ���k��R�"����S�������bpڒS������3r�'8_2��ltn���[j�ٲG�}I�J=��!O~��R��}"���O��3:�ĝ=d�~�жLt}��]�_-:�@/��J�j�y�-r���nԺ�r���ŝ����ş$���         "   x�3�t���NM�2�t,K��IL�I����� eN         �   x���M
�0�����@e�k��Eх.�K7!�v MJ��^�f�~���W��6s�Pa�X�iġ����ಥLq�&��-iy��[X��
L'N9D������>Gv�� ��|!��p���f�%�`4>�$1%�D���Û�Y�;����y�         �   x�����0�Ni�Ӯ�p-�g>`N<��&�hwU(*��.Xϓ��vx�b�o��0���MYe�<��v���mȼ�)!�ځ B����\J݋�34�cb�}�:�����U�LSz]��,���?f9���VV�Q�EgC`e�!��>�Ok�K�W�            x�3���Sp���K�2�t��K����� H��         �  x���OO�@���O��֝ݶ��F#�E�h�)���JC�ӻK"b2�����{3������`E�z��bM[2
Hg��>ӹΑ�T��+��&�g4�b1)��[.��c\!��#�xp���E�A̢��m���YCH��s����Ԏ/�J��J�&��NI+�1�Xh'¿�5�����-�Ԉ\̲��s�o�Z+��\X�M��~wj�2���)�8��'x,�%y��Toy��6���.�O�d��(7FMw��<A:�K���%�i�����R��@�$8���`��H����g�$�jh�Q������jx_��˶\ߴ����r��`��ݚ��ɨNE�3��Ch�'t'�B;Qp�����Q��ho�А�|��> P��     