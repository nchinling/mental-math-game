-- create database
create database mentalmath;
use mentalmath;


create table accounts(
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(10) NOT NULL,
score INT NOT NULL,
date VARCHAR(50) NOT NULL
);