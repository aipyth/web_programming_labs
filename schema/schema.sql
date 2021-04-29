CREATE TABLE IF NOT EXISTS users (
    id          BIGSERIAL       PRIMARY KEY,
    created_at  timestamp       NOT NULL DEFAULT NOW(),
    updated_at  timestamp       NOT NULL DEFAULT NOW(),
    email       varchar(255)    NOT NULL UNIQUE,
    password    text            NOT NULL,
    token       uuid            NOT NULL UNIQUE,
    firstname   varchar(255)    ,
    lastname    varchar(255)    
);

ALTER TABLE users ADD COLUMN IF NOT EXISTS phone bigint;