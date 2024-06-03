use eshop;
--
-- Drop
--
drop table if exists kund;
drop table if exists produkt;
drop table if exists kategori;
drop table if exists produkt2kategori;
drop table if exists lager;
drop table if exists produkt2lager;
drop table if exists logg;

drop procedure if exists get_kategori;
drop procedure if exists all_produkt;
drop procedure if exists insert_produkt;
drop procedure if exists update_produkt;

drop view if exists v_produkt;

drop trigger if exists log_produkt_update;
drop trigger if exists log_produkt_insert;

--
-- Create tabel: kund
--
create table kund
(
	fornamn varchar(20),
    efternamn varchar(20),
    adress varchar(20),
    postnummer char(6),
    ort varchar(20),
    land varchar(20),
    telefon char(13),
    
    primary key (telefon)
);

--
-- Create table: produkt
--

create table produkt
(
	produktid varchar(20),
    pris int,
    namn varchar(50),
    bildlank varchar(50),
    beskrivning varchar(100),
    
    primary key (produktid)
);

--
-- Create teble: kategori
--
create table kategori
(
	kategori varchar(20) primary key
);

--
-- Create table: produkt2kategori
--
create table produkt2kategori
(
	produktid varchar(20),
    kategori varchar(20),
    
    primary key (produktid, kategori)
);

--
-- Create table: lager
--
create table lager
(
	hylla char(5) primary key
);

--
-- create table: produktid2lager
--
create table produkt2lager
(
	produktid varchar(20),
    antal int,
    hylla char(5),
    
    primary key (produktid)
);

--
-- Create table: logg
--
create table logg
(
	timestamp datetime,
    action varchar(100),
    
    primary key (timestamp, action)
);

--
-- Procedure get_kategoris
--
delimiter ;;
create procedure get_kategori()
begin
	select * from kategori;
end;;
delimiter ;

--
-- Create view v_produkt
--
create view v_produkt as
	select 
		p.produktid, 
        p.namn, 
        p.pris,
        p2l.antal,
        p2l.hylla,
        p2k.kategori
		from produkt as p
	left outer join produkt2lager as p2l
		on p.produktid = p2l.produktid
	left outer join produkt2kategori as p2k
		on p.produktid = p2k.produktid
	group by p.produktid
;

--
-- procedure all_produkt
--
delimiter ;;
create procedure all_produkt()
begin
	select produktid, namn, pris, antal, group_concat(kategori) as kategori from v_produkt group by produktid;
end;;
delimiter ;

--
-- procedure insert_produkt
--
delimiter ;;
create procedure insert_produkt(
	produktid varchar(20),
    pris int,
    namn varchar(50),
    bildlank varchar(50),
    beskrivning varchar(100)
)
begin
	insert into produkt (produktid, pris, namn, bildlank, beskrivning) values (produktid, pris, namn, bildlank, beskrivning); 
end;;
delimiter ;

--
-- procedure update_produkt
--
delimiter ;;
create procedure update_produkt(
	produktid varchar(20),
	pris int,
    namn varchar(50),
    bildlank varchar(50),
    beskrivning varchar(100)
)
begin
	update produkt set pris = pris, namn = namn, bildlank = bildlank, beskrivning = beskrivning where produktid = produktid;
end;;
delimiter ;

--
-- trigger log_produkt_update
--
create trigger log_produkt_update
after update 
on produkt for each row
	insert into logg (timestamp, action)
    values (now(), concat("Detaljer om pruduktid '", new.produktid, "' uppdaterades."));
    
--
-- trigger log_produkt_insert
--
create trigger log_produkt_insert
after insert 
on produkt for each row
	insert into logg (timestamp, action)
    values (now(), concat("Ny produkt lades till med produktid '", new.produktid, "'."));
-- 
-- show
--
show tables;
call insert_produkt("te2", 23, "10-pack te", "idk", "Underbart gott te!");
call update_produkt("te2", 24, "10-pack te", "idk", "Underbart gott te!");
insert into produkt2lager (produktid, hylla, antal) values ("te3", "C:101", 3);
update produkt2lager set antal = 9 where produktid = "te3" and hylla = "C:101";
select * from produkt;
select * from logg;
select * from produkt2lager where produktid = "te3" and hylla = "C:101";
select count(*) as nr_of_produkts from produkt2lager where produktid = "te3" and hylla = "C:101";

#invadd te3 C:101 8