create table jogadores(
	id serial primary key,
	nome varchar(50) not null,
	pais varchar(30) not null,
	notaGeral varchar(10) not null,
	time varchar(20) not null,
	salario varchar(10) not null
);

insert into jogadores (nome, pais, notaGeral, time, salario) values ('Ribeiro', 'Brasil', '80', 'Flamengo', '30,000');
drop table jogadores;
select * from jogadores;


create table times(
	id serial primary key,
	nome varchar(50) unique,
	pais varchar(30),
	liga varchar(50)
);

insert into times (nome, pais, liga) values ('Barcelona', 'Spain', 'La Liga');
drop table times;
select * from times;
SELECT jogadores.nome, jogadores.id times.nome, times.pais FROM jogadores INNER JOIN times ON jogadores.time = times.nome;