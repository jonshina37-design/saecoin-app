-- SAECOIN ledger core (spec v1.2 sections 3, 4.4, 11.1). PostgreSQL.
-- STATUS: written but NOT yet run against a real PostgreSQL server (none was available when
-- this was written). Run it on a test database and fix any syntax error before relying on it.
-- All amounts are BIGINT in units of 10^-8 SAC. Total supply is 3,100,000,000,000,000 units.

BEGIN;

CREATE TABLE accounts (
  account_id    TEXT PRIMARY KEY,                      -- 'FOUNDER', 'REGULAR_POOL', 'REFERRAL_POOL', 'TASK_POOL', 'USER:<id>'
  account_type  TEXT NOT NULL CHECK (account_type IN ('USER','FOUNDER','REGULAR_POOL','REFERRAL_POOL','TASK_POOL')),
  user_id       BIGINT NULL,                           -- later: REFERENCES users(id)
  balance_units BIGINT NOT NULL DEFAULT 0 CHECK (balance_units >= 0)
);

CREATE TABLE ledger_transactions (
  transaction_id BIGSERIAL PRIMARY KEY,
  tx_type        TEXT NOT NULL CHECK (tx_type IN
                   ('GENESIS','REGULAR_REWARD','REFERRAL_REWARD','SESSION_LEFTOVER','FORFEITURE','TASK_REWARD','AD_REWARD','FOUNDER_RELEASE')),
  session_id     BIGINT NULL,                          -- later: REFERENCES mining_sessions(id)
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE ledger_entries (
  entry_id          BIGSERIAL PRIMARY KEY,
  transaction_id    BIGINT NOT NULL REFERENCES ledger_transactions(transaction_id),
  debit_account_id  TEXT NOT NULL REFERENCES accounts(account_id),
  credit_account_id TEXT NOT NULL REFERENCES accounts(account_id),
  amount_units      BIGINT NOT NULL CHECK (amount_units > 0),
  CHECK (debit_account_id <> credit_account_id)
);
CREATE INDEX ledger_entries_tx_idx ON ledger_entries(transaction_id);

CREATE TABLE reward_calculations (
  calculation_id     BIGSERIAL PRIMARY KEY,
  session_id         BIGINT NOT NULL,
  pool_type          TEXT NOT NULL CHECK (pool_type IN ('REGULAR','REFERRAL')),
  calc_version       TEXT NOT NULL,                    -- '1.2.0'
  participant_count  INTEGER NOT NULL CHECK (participant_count >= 0),
  participants_ref   TEXT NULL,
  per_user_units     BIGINT NOT NULL CHECK (per_user_units >= 0),
  paid_units         BIGINT NOT NULL CHECK (paid_units >= 0),
  leftover_units     BIGINT NOT NULL CHECK (leftover_units >= 0),
  created_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (session_id, pool_type)                       -- a session is calculated once per pool
);

-- Moves coins between two accounts and records the entry. The CHECK on accounts.balance_units
-- makes an overdraft fail, which rolls the whole surrounding transaction back (atomic session close).
CREATE FUNCTION post_transfer(p_tx BIGINT, p_from TEXT, p_to TEXT, p_units BIGINT) RETURNS VOID AS $$
BEGIN
  UPDATE accounts SET balance_units = balance_units - p_units WHERE account_id = p_from;
  IF NOT FOUND THEN RAISE EXCEPTION 'unknown source account %', p_from; END IF;
  UPDATE accounts SET balance_units = balance_units + p_units WHERE account_id = p_to;
  IF NOT FOUND THEN RAISE EXCEPTION 'unknown destination account %', p_to; END IF;
  INSERT INTO ledger_entries (transaction_id, debit_account_id, credit_account_id, amount_units)
  VALUES (p_tx, p_from, p_to, p_units);
END;
$$ LANGUAGE plpgsql;

-- Ledger rows are never edited or deleted (corrections are new CORRECTION entries, spec section 9).
CREATE FUNCTION forbid_change() RETURNS TRIGGER AS $$
BEGIN RAISE EXCEPTION 'ledger rows are append-only'; END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER ledger_transactions_append_only BEFORE UPDATE OR DELETE ON ledger_transactions
  FOR EACH ROW EXECUTE FUNCTION forbid_change();
CREATE TRIGGER ledger_entries_append_only BEFORE UPDATE OR DELETE ON ledger_entries
  FOR EACH ROW EXECUTE FUNCTION forbid_change();

-- Genesis Block 0 opening balances (spec 3.1).
INSERT INTO accounts (account_id, account_type, balance_units) VALUES
  ('FOUNDER',       'FOUNDER',       1200000000000000),
  ('REGULAR_POOL',  'REGULAR_POOL',  1296000000000000),
  ('REFERRAL_POOL', 'REFERRAL_POOL',  432000000000000),
  ('TASK_POOL',     'TASK_POOL',      172000000000000);

-- Health check: must always return 3100000000000000.
CREATE VIEW ledger_total AS SELECT COALESCE(SUM(balance_units), 0) AS total_units FROM accounts;

COMMIT;
