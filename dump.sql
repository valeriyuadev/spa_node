
SET search_path = public, pg_catalog;
DROP TABLE IF EXISTS public.users;
DROP SEQUENCE IF EXISTS public.users_id_seq;
DROP TABLE IF EXISTS public.tutorials;
SET check_function_bodies = false;
--
-- Structure for table tutorials (OID = 16449) : 
--
CREATE TABLE public.tutorials (
    id serial NOT NULL,
    title varchar(255),
    description varchar(255),
    published boolean,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    author varchar(30),
    cathegory smallint DEFAULT 0,
    image varchar(200)
)
WITH (oids = false);
--
-- Definition for sequence users_id_seq (OID = 24576) : 
--
CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MAXVALUE
    NO MINVALUE
    CACHE 1;
--
-- Structure for table users (OID = 24578) : 
--
CREATE TABLE public.users (
    id integer DEFAULT nextval('users_id_seq'::regclass) NOT NULL,
    name varchar(30) NOT NULL,
    passw varchar(30) NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL
)
WITH (oids = false);
--
-- Data for table public.tutorials (OID = 16449) (LIMIT 0,4)
--
INSERT INTO tutorials (id, title, description, published, "createdAt", "updatedAt", author, cathegory, image)
VALUES (38, 'Are you ready?', 'Very easy and fany system', true, '2022-03-16 17:45:57.469+00', '2022-03-17 19:33:04.479+00', 'Alexander', 1, 'https://codingfinder.com/wp-content/uploads/2019/12/nodejslogo.png');

INSERT INTO tutorials (id, title, description, published, "createdAt", "updatedAt", author, cathegory, image)
VALUES (34, 'Hi every body', 'go to the read official documentation', false, '2022-03-16 10:03:45.119+00', '2022-03-17 19:35:13.355+00', 'sadzeburo', 5, 'https://jf-staeulalia.pt/img/other/93/collection-small-ball-cliparts-2.png');

INSERT INTO tutorials (id, title, description, published, "createdAt", "updatedAt", author, cathegory, image)
VALUES (36, 'soccer in our lifes', 'for the soccer champions', false, '2022-03-16 10:03:51.769+00', '2022-03-17 16:25:32.147+00', 'Alexander', 3, 'https://jf-staeulalia.pt/img/other/93/collection-small-ball-cliparts.jpg');

INSERT INTO tutorials (id, title, description, published, "createdAt", "updatedAt", author, cathegory, image)
VALUES (48, '55555', '55555555', false, '2022-03-17 16:38:23.426+00', '2022-03-17 16:38:23.426+00', '55555', 0, 'https://upload.wikimedia.org/wikipedia/commons/c/cf/Angular_full_color_logo.svg');

--
-- Data for table public.users (OID = 24578) (LIMIT 0,2)
--
INSERT INTO users (id, name, passw, "createdAt", "updatedAt")
VALUES (1, '1', '1', '2022-03-18 03:41:30.041311+00', '2022-03-18 03:41:30.041311+00');

INSERT INTO users (id, name, passw, "createdAt", "updatedAt")
VALUES (2, '2', '2', '2022-03-18 03:41:30.041311+00', '2022-03-18 03:41:30.041311+00');

--
-- Definition for index tutorials_pkey (OID = 16456) : 
--
ALTER TABLE ONLY tutorials
    ADD CONSTRAINT tutorials_pkey
    PRIMARY KEY (id);
--
-- Data for sequence public.tutorials_id_seq (OID = 16447)
--
SELECT pg_catalog.setval('tutorials_id_seq', 52, true);
--
-- Data for sequence public.users_id_seq (OID = 24576)
--
SELECT pg_catalog.setval('users_id_seq', 2, true);
--
-- Comments
--
COMMENT ON SCHEMA public IS 'standard public schema';
