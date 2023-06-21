-- Create database "accessControl"

-- Change schema from "public" to "tfg"

DROP TABLE IF EXISTS "access_records";
CREATE TABLE "tfg"."access_records" (
    "username" character varying(50),
    "door_location" character varying(255) NOT NULL,
    "access_date" timestamptz NOT NULL,
    "authorized" boolean NOT NULL,
    "access_record_id" uuid NOT NULL,
    CONSTRAINT "accessRecords_pk" PRIMARY KEY ("access_record_id")
) WITH (oids = false);

DROP TABLE IF EXISTS "doors";
CREATE TABLE "tfg"."doors" (
    "door_id" uuid NOT NULL,
    "door_location" character varying(255) NOT NULL,
    "access_level" smallint NOT NULL,
    "last_opened" timestamptz,
    CONSTRAINT "doors_pk" PRIMARY KEY ("door_id")
) WITH (oids = false);


DROP TABLE IF EXISTS "roles";
CREATE TABLE "tfg"."roles" (
    "role_id" uuid NOT NULL,
    "role_name" character varying(100) NOT NULL,
    "access_level" smallint NOT NULL,
    CONSTRAINT "roles_pk" PRIMARY KEY ("role_id")
) WITH (oids = false);

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


ALTER TABLE ONLY "tfg"."users" ADD CONSTRAINT "users_role_id_fkey" FOREIGN KEY (role_id) REFERENCES roles(role_id) ON DELETE CASCADE NOT DEFERRABLE;
