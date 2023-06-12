-- Adminer 4.8.1 PostgreSQL 14.5 (Debian 14.5-1.pgdg110+1) dump

\connect "accessControl";

CREATE TABLE "tfg"."access_records" (
    "username" character varying(50) NOT NULL,
    "door_location" character varying(255) NOT NULL,
    "access_date" timestamptz NOT NULL,
    "authorized" boolean NOT NULL,
    "access_record_id" uuid NOT NULL,
    CONSTRAINT "accessRecords_pk" PRIMARY KEY ("access_record_id")
) WITH (oids = false);

INSERT INTO "access_records" ("username", "door_location", "access_date", "authorized", "access_record_id") VALUES
('fixz',	'puerta2222',	'2023-06-09 15:49:11+00',	'1',	'28b8214d-b31c-47a3-88c8-44b76dbe2057'),
('fixz',	'puerta2222',	'2023-06-09 16:11:56+00',	'1',	'8363cd8b-9a0f-45e3-9990-793a0b0d9ab6'),
('fixz',	'puerta2222',	'2023-06-09 16:11:57+00',	'1',	'ef5775c2-9816-47ff-8a64-ad710d3ebbb2'),
('fixz',	'puerta2222',	'2023-06-09 16:11:58+00',	'1',	'b493d15f-f671-402f-8129-693daee63d42'),
('fixz',	'puerta2222',	'2023-06-09 16:11:59+00',	'1',	'9b140b4b-98c1-426f-84a0-b732e6a61f35'),
('fixz',	'puerta2222',	'2023-06-09 16:12:02+00',	'0',	'b93b1844-e466-4f65-a9ec-423b84f75a6f'),
('fixz',	'puerta2222',	'2023-06-09 16:12:02+00',	'0',	'98c19efc-46f5-4440-b264-c19687ceeb85'),
('fixz',	'puerta2222',	'2023-06-09 16:12:03+00',	'0',	'267caa6c-13bc-4248-9d71-b8a536d64287'),
('fixz',	'puerta2222',	'2023-06-09 16:12:04+00',	'0',	'd2ad6574-0f4f-44e2-aff1-5b39a14d2814'),
('fixz',	'puerta2222',	'2023-06-09 18:52:29+00',	'0',	'24c9c5c7-c20f-4b6e-a54b-e1848dc8709a'),
('fixz',	'puerta2222',	'2023-06-09 18:53:20+00',	'0',	'aace0aae-30f8-4a3a-a4da-30d886994fd8'),
('fixz',	'puerta2222',	'2023-06-09 18:53:54+00',	'0',	'8246bc3d-fb65-40cb-ac05-a49ecc2e796a');

CREATE TABLE "tfg"."doors" (
    "door_id" uuid NOT NULL,
    "door_location" character varying(255) NOT NULL,
    "access_level" smallint NOT NULL,
    "last_opened" timestamptz,
    CONSTRAINT "doors_pk" PRIMARY KEY ("door_id")
) WITH (oids = false);

INSERT INTO "doors" ("door_id", "door_location", "access_level", "last_opened") VALUES
('16822db5-8bfa-4060-a72b-45ab55fab1fb',	'M5Stack',	3,	'2023-06-10 00:11:29+00'),
('90d6e77d-79f6-400a-bd81-dd52e63d710c',	'puerta',	1,	NULL);

CREATE TABLE "tfg"."roles" (
    "role_id" uuid NOT NULL,
    "role_name" character varying(100) NOT NULL,
    "access_level" smallint NOT NULL,
    CONSTRAINT "roles_pk" PRIMARY KEY ("role_id")
) WITH (oids = false);

INSERT INTO "roles" ("role_id", "role_name", "access_level") VALUES
('6181a509-719c-4f8b-ad3c-bf450b0f3a3d',	'Administrator',	5),
('670f316c-482d-4ab0-aeec-042bc2c5f165',	'Visitor',	1),
('96177871-f5fb-40be-9a46-8c16edad6e9a',	'Worker',	3);

CREATE TABLE "tfg"."users" (
    "user_id" uuid NOT NULL,
    "register_date" timestamptz NOT NULL,
    "expiration_date" timestamptz,
    "card_number" character varying(10) NOT NULL,
    "role_id" uuid NOT NULL,
    "hashed_password" character varying(300) NOT NULL,
    "pin_code" character varying(5) NOT NULL,
    "username" character varying(50) NOT NULL,
    CONSTRAINT "public.users_cardNumber_key" UNIQUE ("card_number"),
    CONSTRAINT "users_pk" PRIMARY KEY ("user_id"),
    CONSTRAINT "users_username" UNIQUE ("username")
) WITH (oids = false);

INSERT INTO "users" ("user_id", "register_date", "expiration_date", "card_number", "role_id", "hashed_password", "pin_code", "username") VALUES
('01cfb677-06f0-4d3b-aad2-f7be4d30fa5e',	'2023-06-08 11:40:21+00',	NULL,	'10103464',	'6181a509-719c-4f8b-ad3c-bf450b0f3a3d',	'$2b$10$/dSal3Xr8fqog3eGn4y2K.pPiI2GXaZVPmPm7pwlsydyLICePwMeW',	'66484',	'fixz'),
('b34b4acb-8ced-4454-b608-5bc98bf141bc',	'2023-06-09 23:27:07+00',	NULL,	'10018629',	'6181a509-719c-4f8b-ad3c-bf450b0f3a3d',	'$2b$10$iN0HDUSbfTrR219vuL23TeKyJ3Y3eEbh14EnmRYXVnfRt3RdAAcaG',	'33985',	'Tatiana'),
('aba56843-a86d-4075-8709-15d2974c8b13',	'2023-06-11 12:57:25+00',	'2023-06-14 00:00:00+00',	'10018093',	'96177871-f5fb-40be-9a46-8c16edad6e9a',	'$2b$10$i8VMhkgY1NJ8JeuW90MVAe1rp1lLcQgJdQN68kT8aX.BQc9WnvNpi',	'74785',	'brai');

ALTER TABLE ONLY "tfg"."users" ADD CONSTRAINT "users_role_id_fkey" FOREIGN KEY (role_id) REFERENCES roles(role_id) ON DELETE CASCADE NOT DEFERRABLE;

-- 2023-06-11 16:00:50.42846+00
