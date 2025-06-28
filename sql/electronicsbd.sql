create schema if not exists bd_electronics;

use bd_electronics;

create table tbl_empleados(
	id_empleado int not null auto_increment primary key,
    nombre_emp varchar(45) not null,
    app_emp varchar(45) not null,
    apm_emp varchar(45) not null,
    rfc_emp varchar(10) not null,
    tel_emp varchar(10) not null unique,
    edad date not null,
    puesto varchar(45),
    usuario_emp varchar(45) unique,
    pass_emp varchar(8)
);

create table tbl_clientes(
	id_cliente int not null auto_increment primary key,
    nombre_cli varchar(45),
    app_cli varchar(45),
    apm_cli varchar(45),
    correo_cli varchar(45) unique,
    direccion_cli varchar(45),
    usuario_cli varchar(45),
    pass_cli varchar(8)
);

create table tbl_proveedores(
	id_proveedor int not null auto_increment primary key,
    nombre_pro varchar(45),
    tel_pro varchar(10) unique,
    correo_pro varchar(45) unique
);

create table tbl_productos(
	id_producto int not null auto_increment primary key,
    nombre_prod varchar(45),
    color varchar(45),
    precio_venta double,
    precio_compra double,
    id_proveedor int,
    constraint fk_id_proveedor_tbl_proveedores foreign key(id_proveedor) references tbl_proveedores(id_proveedor)
);

create table tbl_ventas(
	id_venta int not null auto_increment primary key,
    id_empleado int,
    id_producto int,
    id_cliente int,
    constraint fk_id_empleado_tbl_empleados foreign key(id_empleado) references tbl_empleados(id_empleado),
    constraint fk_id_producto_tbl_productos foreign key(id_producto) references tbl_productos(id_producto),
    constraint fk_id_cliente_tbl_clientes foreign key(id_cliente) references  tbl_clientes(id_cliente)
);

-- Registros --

INSERT INTO tbl_empleados(nombre_emp, app_emp, apm_emp, rfc_emp, tel_emp, edad, puesto, usuario_emp, pass_emp)
VALUES
	('Luis', 'Martínez', 'Gómez', 'MAGL900101', '4771234560', '1990-01-01', 'Gerente', 'lmartinez', 'pass1234'),
	('Ana', 'López', 'Hernández', 'LOHA850212', '4791234561', '1985-02-12', 'Vendedora', 'alopez', 'pass1234'),
	('Carlos', 'Ramírez', 'Vega', 'RAVC920305', '4771234562', '1992-03-05', 'Vendedor', 'cramirez', 'pass1234'),
	('Laura', 'Morales', 'Díaz', 'MODL880420', '4791234563', '1988-04-20', 'Vendedora', 'lmorales', 'pass1234'),
	('Jorge', 'García', 'Ruiz', 'GARJ910507', '4771234564', '1991-05-07', 'Almacén', 'jgarcia', 'pass1234'),
	('Marta', 'Pérez', 'Castro', 'PECM870618', '4791234565', '1987-06-18', 'Recursos Humanos', 'mperez', 'pass1234'),
	('Raúl', 'Hernández', 'Santos', 'HESR930729', '4771234566', '1993-07-29', 'Técnico', 'rhernandez', 'pass1234'),
	('Sofía', 'Jiménez', 'Navarro', 'JINS890813', '4791234567', '1989-08-13', 'Vendedora', 'sjimenez', 'pass1234'),
	('Diego', 'Reyes', 'Torres', 'RETD940924', '4771234568', '1994-09-24', 'Técnico', 'dreyes', 'pass1234'),
	('Lucía', 'Campos', 'Flores', 'CAFL950305', '4791234569', '1995-03-05', 'Asistente', 'lcampos', 'pass1234');

INSERT INTO tbl_clientes(nombre_cli, app_cli, apm_cli, correo_cli, direccion_cli, usuario_cli, pass_cli) VALUES
	('Andrés', 'Lozano', 'Mora', 'andres.lozano@gmail.com', 'Calle Río Lerma 101, León', 'andreslm', 'cli12345'),
	('Beatriz', 'Mendoza', 'Salas', 'beatriz.mendoza@gmail.com', 'Av. Insurgentes 220, CDMX', 'beatrizms', 'cli12345'),
	('Cristina', 'Ortega', 'Ríos', 'cristina.ortega@gmail.com', 'Calle Reforma 12, GDL', 'cristinaor', 'cli12345'),
	('Daniel', 'Figueroa', 'López', 'daniel.figueroa@gmail.com', 'Av. Universidad 45, MTY', 'danielfl', 'cli12345'),
	('Elena', 'Bravo', 'Suárez', 'elena.bravo@gmail.com', 'Blvd. B. Quintana 300, QRO', 'elenabs', 'cli12345'),
	('Felipe', 'Núñez', 'Herrera', 'felipe.nunez@gmail.com', 'Calle 5 de Mayo 87, PUE', 'felipen', 'cli12345'),
	('Gabriela', 'Vargas', 'Pérez', 'gabriela.vargas@gmail.com', 'Av. Vallarta 303, GDL', 'gabrielavp', 'cli12345'),
	('Héctor', 'Silva', 'Cano', 'hector.silva@gmail.com', 'Calle Independencia 78, CDMX', 'hectorsc', 'cli12345'),
	('Isabel', 'Luna', 'Delgado', 'isabel.luna@gmail.com', 'Av. Miguel Alemán 66, MEX', 'isabell', 'cli12345'),
	('Javier', 'Castillo', 'Reyes', 'javier.castillo@gmail.com', 'Callejón Libertad 55, MTY', 'javiercr', 'cli12345');

INSERT INTO tbl_proveedores(nombre_pro, tel_pro, correo_pro) VALUES
	('ElectroSistemas SA', '5551234001', 'contacto@electrosistemassa.com'),
	('TecnoDistribuciones', '3312345002', 'ventas@tecnodistribuciones.com'),
	('Global Electro', '8187654321', 'info@globalelectro.com'),
	('HogarConectado', '4421122334', 'soporte@hogarconectado.com'),
	('Linea Blanca MX', '7445566778', 'ventas@lineablancamx.com'),
	('SmartTechPro', '2223344556', 'contacto@smarttechpro.com');

INSERT INTO tbl_productos(nombre_prod, color, precio_venta, precio_compra, id_proveedor) VALUES
	('Refrigerador LG 14p', 'Plata', 12000, 9500, 1),
	('Lavadora Samsung 20kg', 'Blanco', 8500, 7000, 2),
	('Microondas Daewoo 1.1', 'Negro', 1800, 1300, 3),
	('Estufa Mabe 6 quemadores', 'Gris', 7500, 6000, 4),
	('Aspiradora Koblenz 2hp', 'Rojo', 2300, 1800, 5),
	('Cafetera Oster 12 tazas', 'Negro', 950, 700, 6),
	('Horno eléctrico Taurus', 'Acero', 2100, 1600, 1),
	('Ventilador T-fal Turbo', 'Blanco', 1250, 900, 2),
	('Licuadora Philips 600W', 'Gris', 1350, 1000, 3),
	('Plancha Black+Decker', 'Azul', 800, 600, 4);

INSERT INTO tbl_ventas(id_empleado, id_producto, id_cliente) VALUES
	(1, 2, 5),
	(2, 4, 1),
	(3, 1, 2),
	(4, 3, 4),
	(5, 5, 3),
	(6, 6, 6),
	(7, 7, 9),
	(8, 8, 7),
	(9, 9, 8),
	(10, 10, 10);

