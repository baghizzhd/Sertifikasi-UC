PGDMP      #                 |            perpustakaan    16.0    16.0 0               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
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
    public          postgres    false    226   m<                 0    28384    category 
   TABLE DATA           P   COPY public.category (id, name, date_created, date_changed, delete) FROM stdin;
    public          postgres    false    220   �<                 0    28398    loans 
   TABLE DATA           z   COPY public.loans (id, book_id, user_id, status, date_start, date_return, date_created, date_changed, delete) FROM stdin;
    public          postgres    false    222   H=                 0    28413    loans_status 
   TABLE DATA           0   COPY public.loans_status (id, name) FROM stdin;
    public          postgres    false    224   �=                 0    28368    users 
   TABLE DATA           �   COPY public.users (id, name, username, password, phone, address, role_id, last_login, date_created, date_changed, delete) FROM stdin;
    public          postgres    false    216   >       $           0    0    books_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.books_id_seq', 11, true);
          public          postgres    false    217            %           0    0    books_status_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.books_status_id_seq', 1, false);
          public          postgres    false    225            &           0    0    category_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.category_id_seq', 1, false);
          public          postgres    false    219            '           0    0    loans_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.loans_id_seq', 6, true);
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
       public          postgres    false    220    4724    218               �  x��XMs�8=ӿ��\,�[�M�8��&���w\��*4ID$�@)ʯ�� %ٞ�T��T�`�@�?^�~P�%m0[�m��v�6�$M��uT����ja��n���]]�E�/A�\��D�LLS�h�-y
��4�����ⱩRz�&j��Ò�`?`�t��	�%��Equ6OS.v%v�Ftͦ���w ��!E!����;8����z]�&`�����%ejX\c�X��C߹��bCch��s<
EM�!x���ѳ�d�``�*R��ƨǹ8H�4����/�A��)Hǃw8��mWIg<;�')��H�ؙP�G�#�'����%Q�B�&�<Ny+��;�ɨ�F8x�j�`[�v�����{������ W�
u�`�#R����:��P!������q�&Y
 Mf�4eS�M���2���4y����!Ln6қ���~�<��H�]7��~�O�<��z��y:�]^\���|Ds5��l6U���%����٪�ɏۦ8�J�J��;��u,E@��"��d)~���֭Gsp!��}QJ������d�#ȸ��.��)rH]#k|�F����+�Ĳ�6Ũ�> �E4&9z���R���>����4�o�`-+{� �U=+ϰT��� L�@���(�g۹�����F���~��P��� �=h�X�g�-�, �[7"�<���i��d��-{����A(�ى�s�����;�;��Y�c2w�UZp���?Q���A$X���Gu��]��4ZjS��EA�:5��4l�G���F��8ګ[j"̵�H�o��3�dN�����X =����ד���v4���VQ	�6;�H�F3�}����.V<���#V�٦����,]�����ٻ�d9]|w���|��JG�4�����#�se�:[�i>��ˇ����"��N&��mq6G�,f�.��N:���X��R����d%4�Ƕ(�vK�è~��2AV& 2�� W��,�cK/D�����]���t9I�����w�|rF�C瓣��HE�/���YdSD�*p2fDo����s?��2܆���`��P��!��
t���O�>�i��r��ٸ8��гw艄���z,>ʀ�;Ϟ��;��7~)VGD�#htg��F����`�ٮ(Y�X#�-yjm�ߚ�Bw��-�#���ye2	GGw��mj���h�	Á������Է��~V�K�.���u*_&��%���E�7E�H��A�q��0~���7cq���rq��yƈ���bd�'�GӾ/\��ëh�_��[���&��������|����[�M�ȁ^kzY�?�T8ӶQ))3�͉�y��c����/��XP
ԀY��χ��]s�A���mAq�#�{���)x4��M�CN �xޯ�#���<�U��ꚗ`��]��=��#�=`��$�<���͗a2�k|]c��\�E�N����	���9�e����Wj�4\�Ғ*�+�=ͩ|'Q��Ae�v�]��#X���ᆣ����r��������$��~��Ǝ���?t�S98J�r�`@�u1�׍5�ݡ���TT>G�8Yu�B~P��q�S�G�W����ys���[��+�y��S�11h"^!r���|�+�6��@�Cfpn����Ǫ�]�������
�[�-<�6��C��I�����P�(Y�X�Cϛ&^����t]u�)=������������x'�_���-��l�	_N���:�RMJj��)}Q���W+���1kA����p���_a�9]�V�F�e?�n�x:����_4�㛛td+[�Ɵ����|�yzW�f���j?`���Yb�7��-5U�xB��'Þ8@��~�5�#���r����#fcg�5���QOR[2�A����}�L4����^�Yrk�?���G�	@�6N'?K�y�@���W'���Ŋ�4�;����+f�wcc�٣��_�&��Z�EC������u�         "   x�3�t���NM�2�t,K��IL�I����� eN         �   x���M
�0�����@e�k��Eх.�K7!�v MJ��^�f�~���W��6s�Pa�X�iġ����ಥLq�&��-iy��[X��
L'N9D������>Gv�� ��|!��p���f�%�`4>�$1%�D���Û�Y�;����y�         �   x�����0߸
7��.;���_Ǒ��S�x��-���B}7r�G�"�Z���:�?)���G�p��0=&������,#�gȑi�_�óО��ꏙ�����j�Rʾ��`(�,=d��G�nj?�u?֙a~{�Ok�6WK-            x�3���Sp���K�2�t��K����� H��         �  x����N�0E��Wx�-�c'��]#ʣ��(Qu3UJc�$`U���(�BHҬF�{g.'kh<�X��*�Xە�B �[��
���dH�ebl�9~D�r�sc���3�/���\#��G������(�"�ض@Ajh	�Brj�֘�S����V	RI�fn�R�I3L�#榒 �_Ԛ���h��
5"g�t����q��o,�Pc:ud�I��DE��\��@Fe��-�r�v���3��a1��͋��n��c#1�R�!�d&�����	�񡺳�C��������ϻrs�=]*����Y���;��7���Z���!�ґ.pU�"���/(���|��碱&Ϋ,|��I�[Q@:ɦ !j���v�A�E�}�����%     