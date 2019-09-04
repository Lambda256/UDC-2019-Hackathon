DROP TABLE IF EXISTS system_info;

CREATE TABLE system_info (
	mwc_address VARCHAR(250) NOT NULL
);

INSERT INTO system_info (mwc_address) VALUES
 ('0x88efddaf6053c06cfe9c254d4952e319ddae3cba');

 
DROP TABLE IF EXISTS company;

CREATE TABLE company (
	comp_address VARCHAR(250) PRIMARY KEY,
	mwc_address VARCHAR(250) NOT NULL,
	comp_name VARCHAR(250),
	location VARCHAR(1000),
	use_yn boolean
);

INSERT INTO company (comp_address, mwc_address, comp_name, location, use_yn) VALUES
 ('0x68d6d94a83d8348f15db84b00e4fb02521872c5d','0x88efddaf6053c06cfe9c254d4952e319ddae3cba', 'BWG', '서울특별시 중구 소공동 통일로 86', true);
 
 
DROP TABLE IF EXISTS work_place;

CREATE TABLE work_place (
	work_code VARCHAR(50) PRIMARY KEY,
	comp_address VARCHAR(250) NOT NULL,
	work_name VARCHAR(250),
	work_address VARCHAR(1000),
	longitude DECIMAL,
	latitude DECIMAL,
	work_use_yn boolean
);

INSERT INTO work_place (work_code, comp_address, work_name, work_address, longitude, latitude, work_use_yn) VALUES
 ('01', '0x68d6d94a83d8348f15db84b00e4fb02521872c5d', '서울본사', '서울특별시 중구 소공동 통일로 86', '126.969542', '37.563264', true),
 ('02', '0x68d6d94a83d8348f15db84b00e4fb02521872c5d', '송도지사', '인천광역시 중구 영종해안남로321번길 208', '126.456209', '37.440220', true);

DROP TABLE IF EXISTS employee;

CREATE TABLE employee (
	user_id VARCHAR(250) NOT NULL,
	empl_address VARCHAR(250) PRIMARY KEY,
	comp_address VARCHAR(250) NOT NULL,
	name VARCHAR(250),
	current_workplace_code VARCHAR(50),
	department VARCHAR(250),
	position VARCHAR(250),
	join_date VARCHAR(250),
	email VARCHAR(250),
	phone_number VARCHAR(250)
);

INSERT INTO employee (user_id, empl_address, comp_address, name, current_workplace_code, department, position, join_date, email, phone_number) VALUES
 ('Gabriel', '0xf99c71b2cd6e4edeb115cefb409375735a5ff118', '0x68d6d94a83d8348f15db84b00e4fb02521872c5d', 'Gabriel', '02', '개발팀', '매니저', '2019-02-18', 'dongshik.lee@gmail.com', '010-1111-1111'),
 ('Kevin', '0xfbb28cf625ea359c52ffc8464bd21f4878751aec', '0x68d6d94a83d8348f15db84b00e4fb02521872c5d', 'Kevin', '01', '개발팀', '매니저', '2013-07-01', 'kylee1112@hotmail.com', '010-1111-1111'),
 ('Mickey', '0xaf5d1424e08522cb86cffc9212379ff328d63673', '0x68d6d94a83d8348f15db84b00e4fb02521872c5d', 'Mickey', '01', '개발팀', '매니저', '2015-03-01', 'Sjh8341@gmail.com', '010-1111-1111'),

/* WORK HISTORY */
DROP TABLE IF EXISTS work_history;

CREATE TABLE work_history (
	id INT AUTO_INCREMENT  PRIMARY KEY,
	user_id VARCHAR(250) NOT NULL,
	time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	work_code VARCHAR(50),
	latitude DECIMAL NOT NULL,
	longitude DECIMAL NOT NULL,
	work_place_code VARCHAR(50) NOT NULL,
	reward INT NOT NULL,
	tx_id VARCHAR(50)
);