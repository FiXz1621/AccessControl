-- Adminer 4.8.1 PostgreSQL 15.3 (Debian 15.3-1.pgdg110+1) dump

\connect "accessControl";

DROP TABLE IF EXISTS "access_records";
CREATE TABLE "tfg"."access_records" (
    "username" character varying(50),
    "door_location" character varying(255) NOT NULL,
    "access_date" timestamptz NOT NULL,
    "authorized" boolean NOT NULL,
    "access_record_id" uuid NOT NULL,
    CONSTRAINT "accessRecords_pk" PRIMARY KEY ("access_record_id")
) WITH (oids = false);

INSERT INTO "access_records" ("username", "door_location", "access_date", "authorized", "access_record_id") VALUES
('fixz',	'puerta2222',	'2023-06-09 15:49:11+00',	't',	'28b8214d-b31c-47a3-88c8-44b76dbe2057'),
('fixz',	'puerta2222',	'2023-06-09 16:11:56+00',	't',	'8363cd8b-9a0f-45e3-9990-793a0b0d9ab6'),
('fixz',	'puerta2222',	'2023-06-09 16:11:57+00',	't',	'ef5775c2-9816-47ff-8a64-ad710d3ebbb2'),
('fixz',	'puerta2222',	'2023-06-09 16:11:58+00',	't',	'b493d15f-f671-402f-8129-693daee63d42'),
('fixz',	'puerta2222',	'2023-06-09 16:11:59+00',	't',	'9b140b4b-98c1-426f-84a0-b732e6a61f35'),
('fixz',	'puerta2222',	'2023-06-09 16:12:02+00',	'f',	'b93b1844-e466-4f65-a9ec-423b84f75a6f'),
('fixz',	'puerta2222',	'2023-06-09 16:12:02+00',	'f',	'98c19efc-46f5-4440-b264-c19687ceeb85'),
('fixz',	'puerta2222',	'2023-06-09 16:12:03+00',	'f',	'267caa6c-13bc-4248-9d71-b8a536d64287'),
('fixz',	'puerta2222',	'2023-06-09 16:12:04+00',	'f',	'd2ad6574-0f4f-44e2-aff1-5b39a14d2814'),
('fixz',	'puerta2222',	'2023-06-09 18:52:29+00',	'f',	'24c9c5c7-c20f-4b6e-a54b-e1848dc8709a'),
('fixz',	'puerta2222',	'2023-06-09 18:53:20+00',	'f',	'aace0aae-30f8-4a3a-a4da-30d886994fd8'),
('fixz',	'puerta2222',	'2023-06-09 18:53:54+00',	'f',	'8246bc3d-fb65-40cb-ac05-a49ecc2e796a'),
('fixz',	'M5Stack',	'2023-06-12 10:30:26+00',	't',	'b923ebb0-df70-49a4-8b17-38ab24849205'),
('fixz',	'M5Stack',	'2023-06-12 10:30:41+00',	't',	'cb8af264-a8ab-46f9-af2f-17cd0bd19aae'),
('Tatiana',	'M5Stack',	'2023-06-12 10:30:48+00',	't',	'ff374453-015d-4fd7-8dbb-e647897085b4'),
('brai',	'M5Stack',	'2023-06-12 10:31:09+00',	't',	'e78ee701-b71a-4f1f-9e33-854cba7e2028'),
('brai',	'M5Stack',	'2023-06-12 10:33:08+00',	't',	'e69eb548-33d0-4d1c-aaaa-0c45033e3575'),
(NULL,	'M5Stack',	'2023-06-12 10:39:27+00',	'f',	'e2c10a08-fb69-4d45-ae27-3b5f50425d5b'),
(NULL,	'M5Stack',	'2023-06-12 10:40:33+00',	'f',	'e27f8c8c-682b-4e5a-a774-1548db4d37b6'),
(NULL,	'M5Stack',	'2023-06-12 10:40:43+00',	'f',	'1f57e63b-78c9-4abf-9584-feedb32411ae'),
('brai',	'M5Stack',	'2023-06-12 10:40:45+00',	't',	'8d8d6ffa-69aa-4e9f-a8b8-545c3553e449'),
('Tatiana',	'M5Stack',	'2023-06-12 10:40:48+00',	't',	'ce78ff12-65c7-4fb7-935b-5353cc9d4fdc'),
('fixz',	'M5Stack',	'2023-06-12 10:40:51+00',	't',	'56b9e683-7cd2-4831-b73c-a148863ad78e'),
('brai',	'M5Stack',	'2023-06-12 10:55:42+00',	'f',	'2486b090-a41a-448b-87de-46957b000017'),
(NULL,	'M5Stack',	'2023-06-12 10:55:45+00',	'f',	'8ccb9154-b2b8-4116-a343-f36236dd9f69'),
('fixz',	'M5Stack',	'2023-06-12 10:55:49+00',	't',	'ea2560cf-f4da-455d-8826-c0c3e61ecb2b');

DROP TABLE IF EXISTS "doors";
CREATE TABLE "tfg"."doors" (
    "door_id" uuid NOT NULL,
    "door_location" character varying(255) NOT NULL,
    "access_level" smallint NOT NULL,
    "last_opened" timestamptz,
    CONSTRAINT "doors_pk" PRIMARY KEY ("door_id")
) WITH (oids = false);

INSERT INTO "doors" ("door_id", "door_location", "access_level", "last_opened") VALUES
('16822db5-8bfa-4060-a72b-45ab55fab1fb',	'M5Stack',	3,	'2023-06-12 10:55:49+00'),
('b2020f18-6316-4f94-ab87-931f550a7940',	'Puerta 2',	4,	NULL),
('90d6e77d-79f6-400a-bd81-dd52e63d710c',	'',	1,	NULL);

DROP TABLE IF EXISTS "roles";
CREATE TABLE "tfg"."roles" (
    "role_id" uuid NOT NULL,
    "role_name" character varying(100) NOT NULL,
    "access_level" smallint NOT NULL,
    CONSTRAINT "roles_pk" PRIMARY KEY ("role_id")
) WITH (oids = false);

INSERT INTO "roles" ("role_id", "role_name", "access_level") VALUES
('6181a509-719c-4f8b-ad3c-bf450b0f3a3d',	'Administrator',	5),
('670f316c-482d-4ab0-aeec-042bc2c5f165',	'Visitor',	1),
('96177871-f5fb-40be-9a46-8c16edad6e9a',	'Worker',	2);

DROP TABLE IF EXISTS "users";
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

-- 2023-06-12 11:12:58.96588+00