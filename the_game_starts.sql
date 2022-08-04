create database ecomerce

use ecomerce

create table productos(
id bigint unsigned not null auto_increment primary key,
nombre varchar(255) not null,
descripcion varchar(1024) not null,
precio decimal(9,2) not null
);


create table fotos_productos(
id_producto bigint unsigned not null,
foto varchar(255) not null,
foreign key(id_producto) references productos(id) on delete cascade on update cascade
);


create table usuarios(
id_usuario bigint unsigned not null auto_increment primary key,
nombre varchar(255) not null,
apellido_paterno varchar(150) NOT NULL,
apellido_materno varchar(150) NOT NULL,
password varchar(10000) NOT NULL,
correo varchar(200) NOT NULL,
id_rol int(11) NOT NULL,
id_Estatus int(11) NOT NULL,
resetToken mediumtext NOT NULL,
direccion varchar(255) null,

FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id_rol`) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (`id_Estatus`) REFERENCES `estatus` (`id_Estatus`) ON DELETE CASCADE ON UPDATE CASCADE
);


INSERT INTO `usuarios` (`nombre`, `apellido_paterno`, `apellido_materno`, `password`, `correo`, `id_rol`, `id_Estatus`, `resetToken`) VALUES
('Diego', 'Hern', 'Salazar', '12345', 'diego@gmail.com', 1, 1, 'gfbfg');

CREATE TABLE `rol` (
  `id_rol` int(11) NOT NULL AUTO_INCREMENT primary key,
  `nombre_rol` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `estatus` (
  `id_Estatus` int(11) NOT NULL AUTO_INCREMENT primary key,
  `nomEstatus` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


INSERT INTO `rol` (`id_rol`, `nombre_rol`) VALUES
(1, 'Cliente'),
(2, 'Admin');

create table ventas(
id bigint unsigned not null auto_increment primary key,
id_usuario bigint unsigned not null,
total decimal(9,2) not null,

foreign key(id_usuario) references usuarios(id_usuario) on delete cascade on update cascade
);

create table productos_vendidos(
id_venta bigint unsigned not null,
id_producto bigint unsigned not null,
foreign key(id_venta) references ventas(id) on delete cascade on update cascade,
foreign key(id_producto) references productos(id) on delete cascade on update cascade
);