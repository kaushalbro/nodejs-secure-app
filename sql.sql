select * from users;
select * from user_account_details;
select * from user_device_info;
select * from user_social_media;

drop table users;
drop table user_account_details;
drop table user_device_info;
drop table user_social_media;

CREATE TABLE users (
    user_id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL UNIQUE,
    user_level int(1) DEFAULT 3,
	password VARCHAR(255) NOT NULL,
    date_of_birth DATE,
    profile_picture VARCHAR(255),
    user_gender ENUM('male', 'female', 'other'),
    account_status ENUM('active', 'inactive', 'banned') DEFAULT 'active',
    user_phone_number VARCHAR(255),
    address VARCHAR(255),
    about_me TEXT,
    verified BOOLEAN DEFAULT FALSE
);

CREATE TABLE user_social_media (
    id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id INT(11) NOT NULL,
    social_media_name VARCHAR(255),
    social_media_link VARCHAR(255)
    );

create table user_account_details(
    id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id INT(11) NOT NULL,
    last_login DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    login_attempts INT(11) DEFAULT '0'
);

 create table user_device_info(
    id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    ip_address VARCHAR(255) DEFAULT '0.0.0.0',
    user_agent VARCHAR(255)
 );

CREATE TABLE posts (
    post_id INT(11) PRIMARY KEY AUTO_INCREMENT,
    post_title VARCHAR(255) NOT NULL,
    post_body TEXT NOT NULL,
    post_featured_image TEXT NOT NULL,
    author_id INT(11) NOT NULL,
    author_name VARCHAR(255) NOT NULL,
    category_id INT(11) NOT NULL,
    post_status ENUM('draft', 'published', 'archived', 'deleted') DEFAULT 'published',
    post_language ENUM('english', 'nepali') DEFAULT 'nepali',
    post_source VARCHAR(255) DEFAULT "By editor",
    is_commantable BOOLEAN,
    send_to_subscriber_mail BOOLEAN,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

 create table post_comments(
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    post_id INT(11) NOT NULL,
    comment_body varchar(255),
    commented_user varchar(255) default "Anonymous",
    commented_user_ip_address varchar(255) default "0.0.0.0",
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
 );
 CREATE TABLE comments (
  id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  parent_id INT(11),
  content TEXT,
  commented_user varchar(255) default "Anonymous",
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  depth int(11) default 0
);

create table post_responses(
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    post_id INT(11) NOT NULL,
    views INT(11) DEFAULT 0,
    likes INT(11) DEFAULT 0,
    dislikes INT(11) DEFAULT 0,
    shares INT(11) DEFAULT 0
);

 create table category(
    category_id INT(11) PRIMARY KEY AUTO_INCREMENT,
    category_name varchar(255) NOT NULL,
    about_category varchar(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
 );

  create table sub_category(
    sub_category_id INT(11) PRIMARY KEY AUTO_INCREMENT,
    sub_category_name varchar(255) NOT NULL,
    category_id INT(11), 
    about_sub_category varchar(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
 );

CREATE TABLE advertisements (
    advertisement_id INT(11) PRIMARY KEY AUTO_INCREMENT,
    advertisement_title VARCHAR(255),
    advertisement_description varchar(255),
    advertisement_image VARCHAR(255),
    image_url VARCHAR(255),
    video_url VARCHAR(255),
    advetiser_name VARCHAR(255),
    start_date DATE,
    end_date DATE,
    advertisement_position ENUM('top', 'button', 'left','right') DEFAULT 'top',
    advertisement_status ENUM('active', 'paused', 'archived') DEFAULT 'active'
);

CREATE TABLE subscribers (
  subscriber_id INT(11) PRIMARY KEY AUTO_INCREMENT,
  subscriber_email VARCHAR(255) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  interested_category VARCHAR(255),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);



