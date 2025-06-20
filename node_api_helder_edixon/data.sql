#root

create user 'dom_EdixonDCT'@'localhost' identified by "ADSO";
create database dom_EdixonDCT;
grant all on dom_EdixonDCT.* to dom_EdixonDCT@localhost;

#user

show databases;

use dom_EdixonDCT;

drop table if exists lenguaje_usuario;
drop table if exists usuarios;
drop table if exists generos;
drop table if exists lenguajes;
drop table if exists ciudades;

create table ciudades (
    id int auto_increment,
    nombre varchar(30),
    primary key(id)
);
create table lenguajes (
    id int auto_increment,
    nombre varchar(30),
    primary key(id)
);
create table generos (
    id int auto_increment,
    nombre varchar(30),
    primary key(id)
);

create table usuarios (
    id int auto_increment,
    nombre varchar(30),
    apellido varchar(30),
    documento varchar(30),
    telefono varchar(30),
    usuario varchar(30),
    contrasena varchar(30),
    id_ciudad int,
    id_genero int,
    primary key(id),
    foreign key (id_ciudad) references ciudades(id),
	foreign key (id_genero) references generos(id)
);

create table lenguaje_usuario (
    id_usuario int,
    id_lenguaje int,
    foreign key (id_usuario) references usuarios(id),
    foreign key (id_lenguaje) references lenguajes(id)
);

insert into ciudades(nombre)
values ('Giron'), ('Bucaramanga'), ('Floridablanca'),('Piedecuesta');
insert into lenguajes(nombre) 
values ('HTML'), ('CSS'), ('JavaScript'), ('PHP'), ('Java'), ('C#'), ('SQL'), ('Phyton');
insert into generos(nombre)
values ('Hombre'),('Mujer');
insert into usuarios(nombre, apellido, documento, telefono, usuario, contrasena, id_ciudad,id_genero)
values ('Edixon', 'Castillo', 3001234567, 123456789, 'edixon_dct', 'mi_contrasena_segura', 3,1);
insert into lenguaje_usuario(id_usuario, id_lenguaje)
values (1, 1), (1, 3), (1, 5);

select * from ciudades;
select * from generos;
select * from lenguajes;
select * from usuarios;
select * from lenguaje_usuario;