use examtest;
--
-- Drop
--
drop table if exists satellit2fenomen;
drop table if exists satellit2problem;
drop table if exists fenomen;
drop table if exists problem;
drop table if exists satellit;
--
-- Create tabel: fenomen
--
create table fenomen
(
	id varchar(20) default null,
    namn varchar(20) default null,
    url_f varchar(100) default null,

    primary key (id)
);

--
-- Create table: problem
--

create table problem
(
	id varchar(10) default null,
    namn varchar(20) default null,
    
    primary key (id)
);

--
-- Create teble: satellit
--
create table satellit
(
	id varchar(20),
    namn varchar(20),
    massa int,
    uppskjutning varchar(20),
    plats varchar(20),
    eol varchar(20),
    url_s varchar(100),
    
    primary key (id)
);

--
-- Create table: satellit2fenomen
--
create table satellit2fenomen
(
	satellit_id varchar(20),
    fenomen_id varchar(10),
    
    primary key (satellit_id, fenomen_id),
    foreign key (satellit_id) references satellit(id),
    foreign key (fenomen_id) references fenomen(id)
);
--
-- create table: problemid2lager
--
create table satellit2problem
(
	satellit_id varchar(20),
    problem_id varchar(10),
    
    primary key (satellit_id, problem_id),
    foreign key (satellit_id) references satellit(id),
    foreign key (problem_id) references problem(id)
);


-- 
-- 


-- 
-- show all eg
--
drop procedure if exists showall;
delimiter ;;
create procedure showall()
begin
    select 
        s.id, 
        s.namn, 
        s.massa, 
        s.uppskjutning, 
        s.plats, 
        s.eol, 
        s.url_s, 
        f.namn as fenomenNamn, f.url_f, 
        p.namn as problem 
    from satellit as s
    left join satellit2fenomen as s2f 
    on s.id = s2f.satellit_id
    left join fenomen as f 
    on s2f.fenomen_id = f.id
    left join satellit2problem as s2p 
    on s.id = s2p.satellit_id
    left join problem as p 
    on s2p.problem_id = p.id
    group by s.id;
end
;;
delimiter ;


drop procedure if exists showallbuturls;
delimiter ;;
create procedure showallbuturls()
begin
    select 
        s.id, 
        s.namn, 
        s.massa, 
        s.uppskjutning, 
        s.plats, 
        s.eol,  
        f.namn as fenomenNamn, 
        p.namn as problem 
    from satellit as s
    left join satellit2fenomen as s2f 
    on s.id = s2f.satellit_id
    left join fenomen as f 
    on s2f.fenomen_id = f.id
    left join satellit2problem as s2p 
    on s.id = s2p.satellit_id
    left join problem as p 
    on s2p.problem_id = p.id
    group by s.id;
end
;;
delimiter ;


drop procedure if exists searchall;
delimiter ;;
create procedure searchall(what varchar(20))
begin
    select 
        s.id, 
        s.namn, 
        s.massa, 
        s.uppskjutning, 
        s.plats, 
        s.eol, 
        s.url_s, 
        f.namn as fenomenNamn, f.url_f, 
        p.namn as problem 
    from satellit as s
    left join satellit2fenomen as s2f 
    on s.id = s2f.satellit_id
    left join fenomen as f 
    on s2f.fenomen_id = f.id
    left join satellit2problem as s2p 
    on s.id = s2p.satellit_id
    left join problem as p 
    on s2p.problem_id = p.id
    where s.id like concat('%', what, '%')
    or s.namn like concat('%', what, '%')
    or s.massa like concat('%', what, '%')
    or s.uppskjutning like concat('%', what, '%')
    or s.plats like concat('%', what, '%')
    or s.eol like concat('%', what, '%')
    or s.url_s like concat('%', what, '%')
    or f.namn like concat('%', what, '%')
    or f.url_f like concat('%', what, '%')
    or p.namn like concat('%', what, '%')
    group by s.id;
end
;;
delimiter ;


drop procedure if exists searchallbuturls;
delimiter ;;
create procedure searchallbuturls(what varchar(20))
begin
    select 
        s.id, 
        s.namn, 
        s.massa, 
        s.uppskjutning, 
        s.plats, 
        s.eol, 
        f.namn as fenomenNamn,
        p.namn as problem 
    from satellit as s
    left join satellit2fenomen as s2f 
    on s.id = s2f.satellit_id
    left join fenomen as f 
    on s2f.fenomen_id = f.id
    left join satellit2problem as s2p 
    on s.id = s2p.satellit_id
    left join problem as p 
    on s2p.problem_id = p.id
    where s.id like concat('%', what, '%')
    or s.namn like concat('%', what, '%')
    or s.massa like concat('%', what, '%')
    or s.uppskjutning like concat('%', what, '%')
    or s.plats like concat('%', what, '%')
    or s.eol like concat('%', what, '%')
    or f.namn like concat('%', what, '%')
    or p.namn like concat('%', what, '%')
    group by s.id;
end
;;
delimiter ;