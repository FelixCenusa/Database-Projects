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
drop table if exists order_;
drop table if exists order2produkt;

drop procedure if exists get_kategori;
drop procedure if exists all_produkt;
drop procedure if exists insert_produkt;
drop procedure if exists update_produkt;

drop view if exists v_produkt;
drop view if exists v_order;
drop view if exists v_order2produkt;
drop view if exists v_plocklist;

drop trigger if exists log_produkt_update;
drop trigger if exists log_produkt_insert;

drop function if exists order_status;
drop function if exists lager_status;

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
    kundid int not null auto_increment,
    
    primary key (kundid),
    unique key `telefon_unique` (`telefon`),
    key `index_forname` (`fornamn`),
    key `index_eftername` (`efternamn`)
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
    
    primary key (produktid),
    key `index_name` (`namn`),
    key `index_pris` (`pris`)
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
    
    primary key (produktid),
    key `index_antal` (`antal`)
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
-- Create table: order
--

create table order_
(
    orderid int not null auto_increment,
    orderdatum timestamp DEFAULT CURRENT_TIMESTAMP,
    kundid int,
    produkter int not null default 0,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    deleted TIMESTAMP NULL,
    ordered TIMESTAMP NULL,
    skickad TIMESTAMP NULL,

    primary key (orderid),
    key `index_antal` (`produkter`)
);


--
-- Create table: order2produkt
--

create table order2produkt(
    orderid int,
    produktid varchar(20),
    antal int,

    primary key (orderid, produktid),
    key `index_antal` (`antal`)
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
-- Create function: order_status()
--
delimiter ;;

create function order_status(
    created TIMESTAMP,
    updated TIMESTAMP,
    deleted TIMESTAMP,
    ordered TIMESTAMP,
    skickad TIMESTAMP
)
returns varchar(20)
DETERMINISTIC
begin

	if deleted is not null then 
		return 'Raderad';
	elseif skickad is not null then
		return 'Skickad';
	elseif ordered is not null then
		return 'Beställd';
	elseif updated is not null then
		return 'Updaterad';
	else
		return 'Skapad';
	end if;
    return 'Skapad';
end;;

delimiter ;
--
-- Create view v_order
--

create view v_order as
    select
        orderid,
        orderdatum,
        kundid,
        produkter,
        order_status(created, updated, deleted, ordered, skickad) as status_
    from order_
;

-- 
-- create view v_order2produkt
--

create view v_order2produkt as
	select 
		p.produktid as produktid, 
        p.namn as namn, 
        p.pris as pris,
        o2p.antal as antal,
        o2p.orderid as orderid
		from produkt as p
    right outer join order2produkt as o2p
		on o2p.produktid = p.produktid
;

--
-- create function lager_status
--
delimiter ;;
create function lager_status(
    antal int
)
returns varchar(20)
DETERMINISTIC
begin
	if antal = 0 then
		return 'Finns INTE på lager!';
	else
		return 'Finns på lager!';
	end if;
end;;

delimiter ;
-- 
-- create view v_plocklista
--

create view v_plocklist as
	select
		o2p.orderid as orderid,
        p.namn as produktnamn,
        o2p.antal as order_antal,
        p2l.produktid as produktid,
        p2l.hylla as hylla,
        p2l.antal as lager_antal,
        lager_status(p2l.antal) as lager_status
		from order2produkt as o2p
    join produkt2lager as p2l
		on o2p.produktid = p2l.produktid
	join produkt as p
		on o2p.produktid = p.produktid
	group by o2p.produktid
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
#insert into order_ (kundid) values (3);
select * from v_order;
select * from v_order2produkt where orderid = 1;

explain kund;
explain select * from kund where telefon = "070 556 556";


#invadd te3 C:101 8