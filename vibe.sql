-- ============================================================
-- schema.sql
-- PostgreSQL schema for multi-user receipt tracking web app
-- Includes security, integrity, and scalability improvements
-- ============================================================

-- Extensions
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- =========================
-- Users
-- =========================
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  default_currency CHAR(3) NOT NULL DEFAULT 'EUR',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =========================
-- Receipts
-- =========================
CREATE TABLE receipts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  merchant TEXT,
  total_amount NUMERIC(12,2) NOT NULL,
  currency CHAR(3) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_receipts_user_date
ON receipts (user_id, date);

-- =========================
-- Line Items
-- =========================
CREATE TABLE line_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  receipt_id UUID NOT NULL REFERENCES receipts(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  quantity NUMERIC(10,2) NOT NULL DEFAULT 1,
  unit_price NUMERIC(12,2) NOT NULL,
  total_amount NUMERIC(12,2) NOT NULL,
  position INTEGER NOT NULL DEFAULT 1
);

ALTER TABLE line_items
ADD CONSTRAINT chk_quantity_positive CHECK (quantity > 0),
ADD CONSTRAINT chk_unit_price_non_negative CHECK (unit_price >= 0),
ADD CONSTRAINT chk_total_amount CHECK (total_amount = quantity * unit_price);

CREATE INDEX idx_line_items_receipt
ON line_items (receipt_id);

-- =========================
-- Categories (User-scoped)
-- =========================
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  parent_id UUID REFERENCES categories(id)
);

CREATE UNIQUE INDEX ux_categories_user_name
ON categories (user_id, name);

CREATE INDEX idx_categories_user
ON categories (user_id);

-- =========================
-- Line Item ↔ Category
-- =========================
CREATE TABLE line_item_categories (
  line_item_id UUID NOT NULL REFERENCES line_items(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  PRIMARY KEY (line_item_id, category_id)
);

CREATE INDEX idx_line_item_categories_category
ON line_item_categories (category_id);

-- =========================
-- Full Text Search
-- =========================
CREATE INDEX idx_line_items_search
ON line_items
USING GIN (to_tsvector('simple', description));

-- =========================
-- Row Level Security (RLS)
-- =========================
ALTER TABLE receipts ENABLE ROW LEVEL SECURITY;

CREATE POLICY receipts_user_isolation
ON receipts
USING (user_id = current_setting('app.current_user_id')::uuid);

-- =========================
-- Analytics: Materialized View
-- =========================
CREATE MATERIALIZED VIEW monthly_user_totals AS
SELECT
  r.user_id,
  DATE_TRUNC('month', r.date)::date AS month,
  SUM(li.total_amount) AS total_spent
FROM receipts r
JOIN line_items li ON li.receipt_id = r.id
WHERE r.deleted_at IS NULL
GROUP BY r.user_id, month;

CREATE INDEX idx_monthly_user_totals
ON monthly_user_totals (user_id, month);

-- ============================================================
-- End of schema.sql
-- ============================================================
