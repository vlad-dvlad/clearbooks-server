CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS users (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email       VARCHAR(255) UNIQUE NOT NULL,
    password    VARCHAR(255) NOT NULL,
    full_name   VARCHAR(255),
    company     VARCHAR(255),
    logo_url    VARCHAR(255),
    currency    VARCHAR(3) DEFAULT 'UAH',
    plan        VARCHAR(20) DEFAULT 'free',
    created_at  TIMESTAMP DEFAULT NOW()
)