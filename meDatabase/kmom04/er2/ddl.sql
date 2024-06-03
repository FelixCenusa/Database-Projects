create database if not exists buckstar;
use buckstar;


drop table if exists Kund2Order;
drop table if exists produkt2Kategori;
drop table if exists Produkt2Order;
drop table if exists Produkt2Lager;
drop table if exists Order2Faktura;
drop table if exists Order2Plocklista;

drop table if exists kundregister;
create table kundregister(
	id int,
    namn varchar(20),
    telefon varchar(10),
    mail varchar(50),
    primary key (id)
);

drop table if exists order_;
create table order_(
	id int,
    primary key (id)
);


create table Kund2Order(
	kundid int,
	orderid int,
    primary key (kundid, orderid),
    foreign key (kundid) references kundregister(id),
    foreign key (orderid) references order_(id)
);
-- ------------------------------------------------------
drop table if exists kategori;
create table kategori(
	kategori varchar(20),
	primary key (kategori)
);

drop table if exists produktregister;
create table produktregister(
	id int,
    namn varchar(20),
    bekrivning varchar(100),
    pris int,
	primary key (id)
);


create table produkt2kategori(
	produktid int,
	kategori varchar(20),
    primary key (produktid, kategori),
    foreign key (produktid) references produktregister(id),
    foreign key (kategori) references kategori(kategori)
);
-- ------------------------------------------------------

create table Produkt2Order(
	produktid int,
	orderid int,
    primary key (produktid, orderid),
    foreign key (produktid) references produktregister(id),
    foreign key (orderid) references order_(id)
);

drop table if exists lager;
create table lager(
	id int,
    antal int,
    hylla varchar(20),
	primary key (id)
);


create table Produkt2Lager(
	produktid int,
	lagerid int,
    primary key (produktid, lagerid),
    foreign key (produktid) references produktregister(id),
    foreign key (lagerid) references lager(id)
);

drop table if exists faktura;
create table faktura(
	id int,
    summa int,
	primary key (id)
);



create table Order2Faktura(
	orderid int,
	fakturaid int,
    primary key (orderid, fakturaid),
    foreign key (orderid) references order_(id),
    foreign key (fakturaid) references faktura(id)
);

drop table if exists plocklista;
create table plocklista(
	id int,
	primary key (id)
);


create table Order2Plocklista(
	orderid int,
	plocklistaid int,
    primary key (orderid, plocklistaid),
    foreign key (orderid) references order_(id),
    foreign key (plocklistaid) references plocklista(id)
);

drop table if exists log_;
create table log_(
	what varchar(100),
    when_ timestamp,
	primary key (what,when_)
);

show tables;




