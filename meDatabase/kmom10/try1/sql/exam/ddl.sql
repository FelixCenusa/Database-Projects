use exam;
--
-- Drop
--
drop table if exists product2type;
drop table if exists product;
drop table if exists type;
drop table if exists developer;
--
-- Create teble: developer
--
create table developer
(
	id varchar(20),
    developer varchar(50),
    country varchar(20),
    
    primary key (id)
);

--
-- Create tabel: product
--
create table product
(
	id varchar(20) default null,
    name_p varchar(20) default null,
    nick varchar(50) default null,
    debate varchar(100) default null,
    year int default null,
    developer_id varchar(10) default null,
    url_p varchar(100) default null,
    image varchar(100) default null,

    primary key (id),
    foreign key (developer_id) references developer(id)
);

--
-- Create table: type
--

create table type
(
	id varchar(10) default null,
    name_t varchar(50) default null,
    url_t varchar(100) default null,
    
    primary key (id)
);


--
-- Create table: product2type
--
create table product2type
(
	product_id varchar(20),
    type_id varchar(10),
    
    primary key (product_id, type_id),
    foreign key (product_id) references product(id),
    foreign key (type_id) references type(id)
);


drop procedure if exists showall;
delimiter ;;
create procedure showall()
begin
    select 
	    p.id,
        p.name_p,
        p.nick,
        p.debate,
        p.year,
        p.developer_id,
        p.url_p,
        d.developer,
        d.country,
        group_concat(t.name_t) as type,
        t.url_t

    from product as p
    left join product2type as p2t 
    on p.id = p2t.product_id
    left join type as t
    on p2t.type_id = t.id
    left join developer as d 
    on p.developer_id = d.id
    group by p.id;
end
;;
delimiter ;

drop procedure if exists showallbuturls;
delimiter ;;
create procedure showallbuturls()
begin
    select 
	    p.id,
        p.name_p,
        p.nick,
        SUBSTRING(p.debate, 1, 20) as debate,
        p.year,
        p.developer_id,
        d.developer,
        d.country,
        group_concat(t.name_t) as type

    from product as p
    left join product2type as p2t 
    on p.id = p2t.product_id
    left join type as t
    on p2t.type_id = t.id
    left join developer as d 
    on p.developer_id = d.id
    group by p.id;
end
;;
delimiter ;

drop procedure if exists searchallnourlsnopicnodevsinfo;
delimiter ;;
create procedure searchallnourlsnopicnodevsinfo(what varchar(20))
begin
    select 
	    p.id,
        p.name_p,
        p.nick,
        SUBSTRING(p.debate, 1, 20) as debate,
        p.year,
        p.developer_id,
        d.developer,
        d.country,
        group_concat(t.name_t) as type

    from product as p
    left join product2type as p2t 
    on p.id = p2t.product_id
    left join type as t
    on p2t.type_id = t.id
    left join developer as d 
    on p.developer_id = d.id
    where p.id like concat('%', what, '%')
    or p.name_p like concat('%', what, '%')
    or p.nick like concat('%', what, '%')
    or debate like concat('%', what, '%')
    or p.year like concat('%', what, '%')
    or p.developer_id like concat('%', what, '%')
    or t.name_t like concat('%', what, '%')
    or t.id like concat('%', what, '%')


    group by p.id;
end
;;
delimiter ;


drop procedure if exists searchallnopicnodevsinfo;
delimiter ;;
create procedure searchallnopicnodevsinfo(what varchar(20))
begin
    select 
	    p.id,
        p.name_p,
        p.nick,
        SUBSTRING(p.debate, 1, 20) as debate,
        p.year,
        p.developer_id,
        p.url_p,
        d.developer,
        d.country,
        group_concat(t.name_t) as type,
        t.url_t

    from product as p
    left join product2type as p2t 
    on p.id = p2t.product_id
    left join type as t
    on p2t.type_id = t.id
    left join developer as d 
    on p.developer_id = d.id
    where p.id like concat('%', what, '%')
    or p.name_p like concat('%', what, '%')
    or p.nick like concat('%', what, '%')
    or debate like concat('%', what, '%')
    or p.year like concat('%', what, '%')
    or p.developer_id like concat('%', what, '%')
    or t.name_t like concat('%', what, '%')
    or t.id like concat('%', what, '%')

    group by p.id;
end
;;
delimiter ;
