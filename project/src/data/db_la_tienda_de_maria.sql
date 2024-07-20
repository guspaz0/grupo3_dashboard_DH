drop database if exists db_la_tienda_de_maria;
create database db_la_tienda_de_maria;
use db_la_tienda_de_maria;

create table colors(
	id int primary key auto_increment,
    name varchar(20),
    hex varchar(7),
    name_es varchar(30),
    created_at datetime not null default current_timestamp,
    updated_at datetime default current_timestamp
);

create table categories(
	id int primary key auto_increment,
    name varchar(30),
    created_at datetime not null default current_timestamp,
    updated_at datetime default current_timestamp
);

create table users(
	id int primary key auto_increment,
    nombre varchar(30) not null,
    apellido varchar(30) not null,
    provincia varchar(128),
    localidad varchar(128),
    codigopostal int,
    calle varchar(50),
    callenumero int default null,
    imagen varchar(255) default null,
    piso varchar(10) default null,
    departamento varchar(10) default null,
    username varchar(20) unique not null,
    email varchar(60) not null unique,
    password varchar(128) not null,
    fechanacimiento date default null,
    admin boolean default false,
    carrito json default null,
	created_at datetime default current_timestamp,
    updated_at datetime default current_timestamp,
    deleted_at datetime default null
);

create table payments(
	id int primary key auto_increment,
    user_id int not null,
    total decimal(10,2) not null,
    status enum('cancelado', 'completado','enproceso', 'rechazado') not null default('enproceso'),
    created_at datetime not null default current_timestamp,
    updated_at datetime default current_timestamp,
    deliver boolean default(false),
    foreign key(user_id) references users(id)
);

create table products(
	id int primary key auto_increment,
    name varchar(50) not null,
    description varchar(255) default null,
    category_id int not null,
    line enum('artesanal', 'sublimada') not null default('artesanal'),
    price numeric(10,2) not null,
    created_at datetime not null default current_timestamp,
    updated_at datetime default current_timestamp,
    deleted_at datetime default null,
    foreign key(category_id) references categories(id)
);

create table favorites(
	product_id int not null,
    user_id int not null,
    foreign key(product_id) references products(id),
    foreign key(user_id) references users(id)
);

create table payment_products(
	id int primary key auto_increment,
    product_id int,
    payment_id int,
	color_id int,
    cantidad decimal(10,2) not null,
    precio decimal(10,2) not null,
    foreign key(product_id) references products(id),
    foreign key(payment_id) references payments(id),
    foreign key(color_id) references colors(id)
);

create table product_colors(
	id int primary key auto_increment,
	product_id int,
    color_id int,
    stock decimal(10,2),
    created_at datetime not null default current_timestamp,
    updated_at datetime default current_timestamp,
    deleted_at datetime default null,
    foreign key(product_id) references products(id),
    foreign key(color_id) references colors(id)
);

create table images(
	id int primary key auto_increment,
    pathName varchar(255),
    created_at datetime not null default current_timestamp,
    updated_at datetime default current_timestamp
);

create table prod_images (
	id int primary key auto_increment,
	product_id int,
    image_id int,
    foreign key (product_id) references products(id),
    foreign key (image_id) references images(id)
);


LOCK TABLES categories WRITE;
insert into categories (name) values ('Mates'),
('Estatuillas'),
('Cuadros'),
('Tazas'),
('Botellas'),
('Jarrón'),
('Cuaderno'),
('Libreta'),
('Agenda');
UNLOCK TABLES;

lock tables colors write;
insert into colors (name, name_es, hex) values ('Black', 'Negro', '#000000'),
('Dark Blue','Azul oscuro', '#0000C8'),
('Blue', 'Azul', '#0000FF'),
('Midnight Blue','Azul Medianoche', '#003366'),
('Teal', 'Verde Azulado', '#008080'),
('Green', 'Verde','#00FF00'),
('Spring Green', 'Verde Primavera', '#00FF7F'),
('Aqua', 'Aguamarina', '#00FFFE'),
('Cyan', 'Cian','#00FFFF'),
('Dodger Blue', 'Azul evasor','#1E90FF'),
('Forest Green', 'Verde Bosque','#228B22'),
('Violet', 'Violeta', '#240A40'),
('Sea Green', 'Verde Oceano','#2E8B57'),
('Turquoise', 'Turquesa', '#30D5C8'),
('Azure', 'Azur', '#315BA1'),
('Chocolate', 'Chocolate', '#370202'),
('Royal Blue','Azul Real', '#4169E1'),
('Steel Blue','Azul Hierro', '#4682B4'),
('Indigo', 'Indigo', '#4F69C6'),
('Saddle Brown', 'Marron Sillín','#583401'),
('Blue Violet', 'Azul Violeta','#6456B7'),
('Cornflower Blue', 'Azul aciano', '#6495ED'),
('Purple', 'Morada', '#660099'),
('Olive Drab', 'Verde Oliva', '#6B8E23'),
('Slate Gray', 'Gris Pizarra','#708090'),
('Sky Blue', 'Azul Cielo','#76D7EA'),
('Chartreuse', 'Chartreuse',  '#7FFF00'),
('Aquamarine', 'Aguamarina',  '#7FFFD4'),
('Maroon', 'Granate',  '#800000'),
('Olive', 'Oliva',  '#808000'),
('Gray', 'Gris',  '#808080'),
('Plum', 'Ciruela',  '#843179'),
('Medium Purple', 'Púrpura medio',  '#9370DB'),
('Brown', 'Marrón',  '#964B00'),
('Cadet Blue', 'Azul Cadete',  '#A9B2C3'),
('Green Yellow', 'Verde Amarillo',  '#ADFF2F'),
('Powder Blue', 'Azul polvo',  '#B0E0E6'),
('Lavender', 'Lavanda',  '#B57EDC'),
('Lime', 'Lima',  '#BFFF00'),
('Silver', 'Plata',  '#C0C0C0'),
('Yellow Green', 'Amarillo Verde',  '#C5E17A'),
('Tan', 'Bronceado',  '#D2B48C'),
('Thistle', 'Cardo',  '#D8BFD8'),
('Orchid', 'Orquídea',  '#DA70D6'),
('Crimson', 'Carmesí',  '#DC143C'),
('Khaki', 'Caqui',  '#F0E68C'),
('Alice Blue', 'Alice Blue',  '#F0F8FF'),
('Seashell', 'Concha',  '#F1F1F1'),
('Sandy brown', 'Marrón arenoso',  '#F4A460'),
('Wheat', 'Trigo',  '#F5DEB3'),
('Beige', 'Beige',  '#F5F5DC'),
('Linen', 'Lino',  '#FAF0E6'),
('Goldenrod', 'Vara de oro',  '#FCD667'),
('Old Lace', 'Encaje viejo',  '#FDF5E6'),
('Red', 'Rojo',  '#FF0000'),
('Magenta', 'Magenta',  '#FF00FE'),
('Fuchsia', 'Fucsia',  '#FF00FF'),
('Orange', 'Naranja',  '#FF681F'),
('Hot Pink', 'Rosa fuerte',  '#FF69B4'),
('Coral', 'Coral',  '#FF7F50'),
('Salmon', 'Salmón',  '#FF8C69'),
('Pink', 'Rosa',  '#FFC0CB'),
('Gold', 'Oro',  '#FFD700'),
('Navajo White', 'Blanco Navajo',  '#FFDEAD'),
('Papaya Whip', 'Látigo de papaya',  '#FFEFD5'),
('Lavender blush', 'Rubor lavanda',  '#FFF0F5'),
('Lemon Chiffon', 'Chifón de limón',  '#FFFACD'),
('Yellow', 'Amarillo',  '#FFFF00'),
('Ivory', 'Marfil',  '#FFFFF0'),
('White', 'Blanco',  '#FFFFFF'),
('AntiqueWhite', 'Blanco Antiguo',  '#FAEBD7'),
('Bisque', 'Bisque',  '#FFE4C4'),
('BlanchedAlmond', 'Almendra Blanqueada',  '#FFEBCD'),
('BurlyWood', 'BurlyWood',  '#DEB887'),
('Cornsilk', 'Seda de maíz',  '#FFF8DC'),
('DarkCyan', 'Cian oscuro',  '#008B8B'),
('DarkGoldenRod', 'Dorado Oscuro Vara',  '#B8860B'),
('DarkGray', 'Gris oscuro',  '#A9A9A9'),
('DarkGrey', 'Gris oscuro',  '#A9A9A9'),
('DarkGreen', 'Verde oscuro',  '#006400'),
('DarkKhaki', 'Caqui Oscuro',  '#BDB76B'),
('DarkMagenta', 'Magenta Oscuro',  '#8B008B'),
('DarkOliveGreen', 'Verde Oliva Oscuro',  '#556B2F'),
('DarkOrange', 'Naranja oscuro',  '#FF8C00'),
('DarkOrchid', 'Orquídea Oscura',  '#9932CC'),
('DarkRed', 'Rojo oscuro',  '#8B0000'),
('DarkSalmon', 'Salmón Oscuro',  '#E9967A'),
('DarkSeaGreen', 'Verde Oceano Oscuro',  '#8FBC8F'),
('DarkSlateBlue', 'Azul Pizarra Oscuro',  '#483D8B'),
('DarkSlateGray', 'Gris Pizarra Oscuro',  '#2F4F4F'),
('DarkTurquoise', 'Turquesa Oscura',  '#00CED1'),
('DarkViolet', 'Violeta Oscuro',  '#9400D3'),
('DeepPink', 'Rosa Profundo',  '#FF1493'),
('DeepSkyBlue', 'Azul Cielo Profundo',  '#00BFFF'),
('DimGray', 'Gris Oscuro',  '#696969'),
('FireBrick', 'Ladrillo refractario',  '#B22222'),
('FloralWhite', 'Floral Blanco',  '#FFFAF0'),
('Gainsboro', 'Gainsboro',  '#DCDCDC'),
('GhostWhite', 'Blanco Fantasma',  '#F8F8FF'),
('Grey', 'Gris',  '#808080'),
('HoneyDew', 'Rocío de miel',  '#F0FFF0'),
('IndianRed', 'Rojo India',  '#CD5C5C'),
('LawnGreen', 'Verde Cesped',  '#7CFC00'),
('LightBlue', 'Azul claro',  '#ADD8E6'),
('LightCoral', 'Coral Claro',  '#F08080'),
('LightCyan', 'Cian claro',  '#E0FFFF'),
('LightGoldenRodYellow', 'Amarillo Dorado Vara Claro',  '#FAFAD2'),
('LightGray', 'Gris claro',  '#D3D3D3'),
('LightGrey', 'Gris claro',  '#D3D3D3'),
('LightGreen', 'Verde claro',  '#90EE90'),
('LightPink', 'Rosa claro',  '#FFB6C1'),
('LightSalmon', 'Salmón claro',  '#FFA07A'),
('LightSeaGreen', 'Verde Oseano claro',  '#20B2AA'),
('LightSkyBlue', 'Azul Cielo Claro',  '#87CEFA'),
('LightSlateGrey', 'Gris pizarra claro',  '#778899'),
('LightSteelBlue', 'Azul Acero Claro',  '#B0C4DE'),
('LightYellow', 'Amarillo claro',  '#FFFFE0'),
('LimeGreen', 'Verde lima',  '#32CD32'),
('MediumAquaMarine', 'Aguamarina Medio',  '#66CDAA'),
('MediumBlue', 'Azul Medio',  '#0000CD'),
('MediumOrchid', 'Orquídea mediana',  '#BA55D3'),
('MediumSeaGreen', 'Verde Mar Medio',  '#3CB371'),
('MediumSlateBlue', 'Azul Pizarra Mediana',  '#7B68EE'),
('MediumSpringGreen', 'Verde Primavera Medio',  '#00FA9A'),
('MediumTurquoise', 'Turquesa media',  '#48D1CC'),
('MediumVioletRed', 'Rojo Violeta Medio',  '#C71585'),
('MintCream', 'Crema de menta',  '#F5FFFA'),
('MistyRose', 'Rosa Brumosa',  '#FFE4E1'),
('Moccasin', 'Mocasín',  '#FFE4B5'),
('Navy', 'Marina',  '#000080'),
('OrangeRed', 'Naranja Rojo',  '#FF4500'),
('PaleGoldenRod', 'Vara Dorada Pálido',  '#EEE8AA'),
('PaleGreen', 'Verde Pálido',  '#98FB98'),
('PaleTurquoise', 'Turquesa Pálido',  '#AFEEEE'),
('PaleVioletRed', 'Rojo Violeta Pálido',  '#DB7093'),
('PeachPuff', 'Durazno hojaldre',  '#FFDAB9'),
('Peru', 'Perú',  '#CD853F'),
('RebeccaPurple', 'Rebecca Púrpura',  '#663399'),
('RosyBrown', 'Marron rosado',  '#BC8F8F'),
('Sienna', 'Siena',  '#A0522D'),
('SlateBlue', 'Pizarra Azul',  '#6A5ACD'),
('SlateGrey', 'Gris pizarra',  '#708090'),
('Snow', 'Nieve',  '#FFFAFA'),
('Tomato', 'Tomate',  '#FF6347'),
('WhiteSmoke', 'Humo Blanco',  '#F5F5F5');
unlock tables;

lock tables users write;
insert into users values (default,'Gustavo Rodolfo','Paz','Santiago del Estero','Santiago del Estero','4200','tomas edison','520','\images\users\imagen-1704600266186.jpg','','','gpaz','gpaz@latiendademaria.com','$2a$10$BSB4xD7pqxg.XEPuaIqYHeum4Rgwxm2hFEp46vHp.a.JtRw.jJpHC','1990-06-12',false,default,default,default,default),
(default,'pepe','argento','Catamarca','Alijilán','4200','tomas edison','520','','','','pepearg','pepe@latiendademaria.com','$2a$10$IBS5IRK8aczv26KmeiANIO1i/eZXTPnUY7gw7ArxZZ48s2HAGScPW','1990-06-11',false,default,default,default,default),
(default,'Jhon','Doe','Buenos Aires','12 de Octubre','1001','lomas de zamora','5100','','','','jaimeterrible','jiamito@latiendademaria.com','$2a$10$BSB4xD7pqxg.XEPuaIqYHeum4Rgwxm2hFEp46vHp.a.JtRw.jJpHC','1990-06-11',true,default,default,default,default);
unlock tables;

lock tables payments write;
insert into payments (user_id, total, status, created_at) values ('3','205066.88','cancelado','2023-11-30 03:00:00'),
('3','109784.41','cancelado','2023-11-11 03:00:00'),
('1','138443.87','completado','2023-12-29 03:00:00'),
('3','34313.89','cancelado','2023-12-25 03:00:00'),
('2','39179.89','completado','2023-12-30 03:00:00'),
('1','72149.58','enproceso','2023-12-14 03:00:00'),
('2','141478.36','cancelado','2023-11-17 03:00:00'),
('2','74456.35','completado','2023-11-23 03:00:00'),
('1','50389.21','completado','2023-12-28 03:00:00'),
('2','18194.89','cancelado','2023-12-29 03:00:00'),
('2','79285.27','completado','2024-01-29 03:00:00'),
('1','125836.49','cancelado','2023-12-28 03:00:00'),
('1','85000','completado','2023-11-03 03:00:00'),
('2','76641.39','cancelado','2023-12-06 03:00:00'),
('3','16755.66','completado','2023-12-02 03:00:00'),
('2','49352.48','enproceso','2023-12-12 03:00:00'),
('1','126171.34','enproceso','2023-11-11 03:00:00'),
('3','46265.31','cancelado','2023-11-10 03:00:00'),
('3','32900.03','completado','2023-12-11 03:00:00'),
('1','63865.53','cancelado','2023-12-01 03:00:00');
unlock tables;

lock tables products write;
insert into products(id,name,description, category_id, line, price, created_at, updated_at) values ('1','Mates de madera',' descripcion Lorem ipsum dolor, sit amet consectetur adipisicing elit.
Cupiditate suscipit reiciendis perspiciatis ab, deleniti 
aliquam incidunt iste et sed libero a, nihil voluptate 
temporibus delectus vitae magni molestiae! Doloremque, hic?','1','artesanal',6609.33,default,default),
('2','Mates de calabaza y cuero','Lorem ipsum dolor, sit amet consectetur adipisicing elit.
Cupiditate suscipit reiciendis perspiciatis ab, deleniti 
aliquam incidunt iste et sed libero a, nihil voluptate 
temporibus delectus vitae magni molestiae! Doloremque, hic?','1','artesanal',4127.83,default,default),
('3','Estatuillas','Lorem ipsum dolor, sit amet consectetur adipisicing elit.
Cupiditate suscipit reiciendis perspiciatis ab, deleniti 
aliquam incidunt iste et sed libero a, nihil voluptate 
temporibus delectus vitae magni molestiae! Doloremque, hic?','2','artesanal',825.48,default,default),
('4','Cuadros','Lorem ipsum dolor, sit amet consectetur adipisicing elit.
Cupiditate suscipit reiciendis perspiciatis ab, deleniti 
aliquam incidunt iste et sed libero a, nihil voluptate 
temporibus delectus vitae magni molestiae! Doloremque, hic?','3','artesanal',3002.72,default,default),
('5','Tazas de cerámica','Lorem ipsum dolor, sit amet consectetur adipisicing elit.
Cupiditate suscipit reiciendis perspiciatis ab, deleniti 
aliquam incidunt iste et sed libero a, nihil voluptate 
temporibus delectus vitae magni molestiae! Doloremque, hic?','4','sublimada',7096.17,default,default),
('6','Tazas de polimero','Lorem ipsum dolor, sit amet consectetur adipisicing elit.
Cupiditate suscipit reiciendis perspiciatis ab, deleniti 
aliquam incidunt iste et sed libero a, nihil voluptate 
temporibus delectus vitae magni molestiae! Doloremque, hic?','4','sublimada',3463.07,default,default),
('7','Botellas hoppy','Lorem ipsum dolor, sit amet consectetur adipisicing elit.
Cupiditate suscipit reiciendis perspiciatis ab, deleniti 
aliquam incidunt iste et sed libero a, nihil voluptate 
temporibus delectus vitae magni molestiae! Doloremque, hic?','5','sublimada',8016.62,default,default),
('8','Botellas de aluminio','Lorem ipsum dolor, sit amet consectetur adipisicing elit.
Cupiditate suscipit reiciendis perspiciatis ab, deleniti 
aliquam incidunt iste et sed libero a, nihil voluptate 
temporibus delectus vitae magni molestiae! Doloremque, hic?','5','sublimada',2790.11,default,default),
('9','Jarrón térmico','Lorem ipsum dolor, sit amet consectetur adipisicing elit.
Cupiditate suscipit reiciendis perspiciatis ab, deleniti 
aliquam incidunt iste et sed libero a, nihil voluptate 
temporibus delectus vitae magni molestiae! Doloremque, hic?','6','sublimada',3030.63,default,default),
('10','Sublimate','Lorem ipsum dolor, sit amet consectetur adipisicing elit.
Cupiditate suscipit reiciendis perspiciatis ab, deleniti 
aliquam incidunt iste et sed libero a, nihil voluptate 
temporibus delectus vitae magni molestiae! Doloremque, hic?','1','sublimada',2599.27,default,default),
('11','Cuaderno tapa dura a5','Lorem ipsum dolor, sit amet consectetur adipisicing elit.
Cupiditate suscipit reiciendis perspiciatis ab, deleniti 
aliquam incidunt iste et sed libero a, nihil voluptate 
temporibus delectus vitae magni molestiae! Doloremque, hic?','7','sublimada',7467.81,default,default),
('12','Cuaderno tapa blanda a5','Lorem ipsum dolor, sit amet consectetur adipisicing elit.
Cupiditate suscipit reiciendis perspiciatis ab, deleniti 
aliquam incidunt iste et sed libero a, nihil voluptate 
temporibus delectus vitae magni molestiae! Doloremque, hic?','7','sublimada',8515.71,default,default),
('13','Libreta tapa dura a6','Lorem ipsum dolor, sit amet consectetur adipisicing elit.
Cupiditate suscipit reiciendis perspiciatis ab, deleniti 
aliquam incidunt iste et sed libero a, nihil voluptate 
temporibus delectus vitae magni molestiae! Doloremque, hic?','8','sublimada',4737.37,default,default),
('14','Agenda perpetua','Lorem ipsum dolor, sit amet consectetur adipisicing elit.
Cupiditate suscipit reiciendis perspiciatis ab, deleniti 
aliquam incidunt iste et sed libero a, nihil voluptate 
temporibus delectus vitae magni molestiae! Doloremque, hic?','9','sublimada',6416.26,default,default),
('15','mate pokebola','mate impreso en 3D con motivo Pokemon, Pokebola','1','sublimada',10000,default,default),
('16','Mate 3D Pokemon charmander','Mate impreso en 3D con PLA/ABS con motivo de Pokemon nombre Charmander','1','artesanal',8500,default,default); 
unlock tables;

lock tables payment_products write;
insert into payment_products values(default,'6','1','23','7','3463.07'),
(default,'1','1','58','1','6609.33'),
(default,'15','1','34','7','10000'),
(default,'7','1','6','3','8016.62'),
(default,'7','1','62','10','8016.62'),
(default,'7','2','62','4','8016.62'),
(default,'6','2','56','7','3463.07'),
(default,'16','2','58','6','8500'),
(default,'3','2','6','3','825.48'),
(default,'12','3','55','2','8515.71'),
(default,'9','3','55','0','3030.63'),
(default,'5','3','55','4','7096.17'),
(default,'7','3','62','8','8016.62'),
(default,'2','3','9','7','4127.83'),
(default,'1','4','58','1','6609.33'),
(default,'6','4','23','8','3463.07'),
(default,'8','5','6','1','2790.11'),
(default,'10','5','68','6','2599.27'),
(default,'10','5','62','8','2599.27'),
(default,'7','6','1','6','8016.62'),
(default,'7','6','6','3','8016.62'),
(default,'16','7','58','10','8500'),
(default,'14','7','6','5','6416.26'),
(default,'8','7','31','6','2790.11'),
(default,'4','7','3','2','3002.72'),
(default,'3','7','6','2','825.48'),
(default,'8','8','31','4','2790.11'),
(default,'8','8','70','6','2790.11'),
(default,'4','8','31','9','3002.72'),
(default,'8','8','6','7','2790.11'),
(default,'15','9','34','4','10000'),
(default,'6','9','56','3','3463.07'),
(default,'10','10','62','7','2599.27'),
(default,'3','11','70','3','825.48'),
(default,'12','11','58','6','8515.71'),
(default,'14','11','6','3','6416.26'),
(default,'6','11','56','1','3463.07'),
(default,'4','11','70','1','3002.72'),
(default,'5','12','55','5','7096.17'),
(default,'12','12','58','10','8515.71'),
(default,'10','12','3','2','2599.27'),
(default,'11','13','55','0','7467.81'),
(default,'16','13','58','10','8500'),
(default,'12','14','14','9','8515.71'),
(default,'16','15','58','1','8500'),
(default,'2','15','3','2','4127.83'),
(default,'6','16','56','7','3463.07'),
(default,'8','16','31','9','2790.11'),
(default,'14','17','6','0','6416.26'),
(default,'7','17','6','9','8016.62'),
(default,'4','17','70','8','3002.72'),
(default,'15','17','34','3','10000'),
(default,'1','18','34','7','6609.33'),
(default,'8','19','70','5','2790.11'),
(default,'13','19','55','4','4737.37'),
(default,'5','20','68','9','7096.17');
unlock tables;

lock tables images write;
insert into images values ('1','https://res.cloudinary.com/dbowsjk6p/image/upload/v1710976968/image-1703994594449_s3bl2l.jpg',default,default),
('2','https://res.cloudinary.com/dbowsjk6p/image/upload/v1710976967/image-1703994594448_nqiqza.jpg',default,default),
('3','https://res.cloudinary.com/dbowsjk6p/image/upload/v1710976681/qf0f4kfkgftpwkgrpsls.webp',default,default),
('4','https://http2.mlstatic.com/D_NQ_NP_2X_611445-MLA49153801786_022022-F.webp',default,default),
('5','https://canvasbynumbers.es/cdn/shop/products/ezgif.com-gif-maker_40_9b05be40-d052-4411-871d-f3d9f2f378f7.jpg?crop=center&height=600&v=1668950492&width=600',default,default),
('6','https://d22fxaf9t8d39k.cloudfront.net/0e97fce301e0e550163ccdfb905f890410d5d4d7a0daa77d2f1c8879edf24c5281650.jpeg',default,default),
('7','https://sublitextil.com.ar/wp-content/uploads/2019/01/Taza-de-Polimero-Para-sublimar-Sublitex.jpg',default,default),
('8','https://http2.mlstatic.com/D_NQ_NP_2X_802274-MLA54782633883_032023-F.webp',default,default),
('9','https://cdn.elementi.com.ar/wp-content/uploads/2022/01/29191508/03-botella-aluminio-plata-sin-impresion.jpg',default,default),
('10','https://http2.mlstatic.com/D_NQ_NP_2X_890499-MLA72064176158_102023-F.webp',default,default),
('11','https://i.etsystatic.com/28158696/r/il/22661c/3980682768/il_794xN.3980682768_ko98.jpg',default,default),
('12','https://santeria.santuariodelujan.org.ar/wp-content/uploads/2023/07/Cuaderno-A5-1.jpg',default,default),
('13','https://http2.mlstatic.com/D_NQ_NP_2X_987102-MLA51617498795_092022-F.webp',default,default),
('14','https://i0.wp.com/papeleracontemporanea.com/wp-content/uploads/2019/12/Cuaderno-Kraft-A6.jpg?fit=800%2C800&ssl=1',default,default),
('15','https://http2.mlstatic.com/D_NQ_NP_2X_813248-MLA72092373311_102023-F.webp',default,default),
('16','https://res.cloudinary.com/dbowsjk6p/image/upload/v1710976966/image-1702699424547_mua4ox.jpg',default,default),
('17','https://res.cloudinary.com/dbowsjk6p/image/upload/v1710976968/image-1702744640465_zqghdc.jpg',default,default);
unlock tables;

lock tables prod_images write;
insert into prod_images (product_id, image_id) values ('1','1'),
('1','2'),
('2','3'),
('3','4'),
('4','5'),
('5','6'),
('6','7'),
('7','8'),
('8','9'),
('9','10'),
('10','11'),
('11','12'),
('12','13'),
('13','14'),
('14','15'),
('15','16'),
('16','17');
unlock tables;

lock tables product_colors write;
insert into product_colors (product_id, color_id, stock)values ('1','98','1'),
('1','141','10'),
('1','9','8'),
('2','67','3'),
('2','71','6'),
('2','7','4'),
('3','31','6'),
('3','9','3'),
('3','108','4'),
('4','98','6'),
('4','94','5'),
('4','9','2'),
('5','139','9'),
('5','64','7'),
('5','42','5'),
('6','140','4'),
('6','78','8'),
('6','145','6'),
('7','52','2'),
('7','135','7'),
('7','75','8'),
('8','37','5'),
('8','104','7'),
('8','121','5'),
('9','108','7'),
('9','139','5'),
('9','126','3'),
('10','121','5'),
('10','119','1'),
('10','134','5'),
('11','96','9'),
('11','140','1'),
('11','114','9'),
('12','99','6'),
('12','67','8'),
('12','109','8'),
('13','55','1'),
('13','105','3'),
('13','107','4'),
('14','84','5'),
('14','127','4'),
('14','55','1'),
('15','86','5'),
('15','64','4'),
('15','24','9'),
('16','101','9'),
('16','139','3'),
('16','78','3');
unlock tables;