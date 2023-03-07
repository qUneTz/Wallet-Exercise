CREATE SCHEMA IF NOT EXISTS wallet_api;

CREATE TABLE wallet_api.wallet_events (
    id                  BIGSERIAL NOT NULL PRIMARY KEY,
    wallet_id           TEXT NOT NULL,
    amount              INTEGER NOT NULL,
    transaction_id      TEXT NOT NULL,
    transaction_type    TEXT NOT NULL,
    balance             INTEGER NOT NULL,
    version             INTEGER NOT NULL,
    CONSTRAINT unique_transaction_id UNIQUE (transaction_id)
);