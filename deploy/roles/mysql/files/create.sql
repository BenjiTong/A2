CREATE TABLE `main` (
	`id` INT(10) unsigned NOT NULL AUTO_INCREMENT,
	`datetime` datetime NOT NULL,
	`radiance` VARCHAR(50) NOT NULL DEFAULT '0',
	`pixels` INT(10) unsigned NOT NULL DEFAULT '10',
	`city_id` TINYINT(4) unsigned NOT NULL DEFAULT '0',
	`window` VARCHAR(150) NOT NULL DEFAULT '',
	`file` VARCHAR(250) NOT NULL DEFAULT '',
	UNIQUE KEY `sfile` (`file`,`city_id`) USING BTREE,
	KEY `city_by_time` (`datetime`,`city_id`) USING BTREE,
	PRIMARY KEY (`id`)
);

CREATE TABLE `git_user` (
	`id` INT(10) unsigned,
	`email` VARCHAR(150) DEFAULT '',
	`name` VARCHAR(50) DEFAULT '0',
	`location` VARCHAR(250) DEFAULT '',
	`company` VARCHAR(250) DEFAULT '',
	`create_at` datetime,
	PRIMARY KEY (`id`)
);