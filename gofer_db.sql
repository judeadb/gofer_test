drop database gofer_db;
create database gofer_db;
use gofer_db;

create table user(
	user_id int not null unique primary key auto_increment, 
	last_name varchar(255) not null,
	first_name varchar(255) not null,
	phone_number bigint not null unique
);

create table credentials(
	user_id int not null unique primary key auto_increment,
	user_name varchar(255) not null unique,
	email varchar(255) not null unique,
	password varchar(255) not null,

	foreign key(user_id) references user(user_id)
);

create table favor(
	favor_id int not null unique primary key auto_increment,
	favor_title varchar(500) not null,
	issued_by varchar(500) not null,
	description varchar(500) not null default '',
	favor_location varchar(500) not null,
	datetime_issued varchar(255) not null, 
	initial_payment int not null default 0
);

create table accepted_favor(
	favor_id int not null unique primary key,
	accepted_by int not null,
	datetime_accepted varchar(255) not null,
	
	foreign key(favor_id) references favor(favor_id),
	foreign key(accepted_by) references user(user_id)
);