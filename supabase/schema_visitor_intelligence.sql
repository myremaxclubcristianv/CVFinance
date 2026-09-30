-- ==============================================================================
-- CV FINANCE — VISITOR INTELLIGENCE v2 SUPABASE SCHEMA & RLS POLICIES
-- ==============================================================================

-- 1. SESSIONS TABLE
CREATE TABLE IF NOT EXISTS visitor_sessions (
  id TEXT PRIMARY KEY,
  visitor_id TEXT NOT NULL,
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_seen_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  ended_at TIMESTAMPTZ,
  landing_page TEXT,
  exit_page TEXT,
  source TEXT,
  medium TEXT,
  campaign TEXT,
  content TEXT,
  term TEXT,
  device_type TEXT,
  os TEXT,
  browser TEXT,
  language TEXT,
  timezone TEXT,
  country TEXT,
  region TEXT,
  city TEXT,
  page_count INT DEFAULT 1,
  event_count INT DEFAULT 1,
  duration_seconds INT DEFAULT 0,
  consent_state JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_visitor_sessions_visitor_id ON visitor_sessions(visitor_id);
CREATE INDEX IF NOT EXISTS idx_visitor_sessions_started_at ON visitor_sessions(started_at DESC);
CREATE INDEX IF NOT EXISTS idx_visitor_sessions_source ON visitor_sessions(source);

-- 2. EVENTS TABLE
CREATE TABLE IF NOT EXISTS visitor_events (
  id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL,
  visitor_id TEXT NOT NULL,
  event_type TEXT NOT NULL,
  route TEXT,
  referrer TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_visitor_events_session_id ON visitor_events(session_id);
CREATE INDEX IF NOT EXISTS idx_visitor_events_visitor_id ON visitor_events(visitor_id);
CREATE INDEX IF NOT EXISTS idx_visitor_events_created_at ON visitor_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_visitor_events_event_type ON visitor_events(event_type);

-- 3. ZERO-TRUST ROW LEVEL SECURITY (RLS)
ALTER TABLE visitor_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE visitor_events ENABLE ROW LEVEL SECURITY;

-- Deny all direct client-side anon / authenticated read and write access.
-- Server-side routes authenticate exclusively via service-role key which bypasses RLS.
DROP POLICY IF EXISTS "Deny public select visitor_sessions" ON visitor_sessions;
CREATE POLICY "Deny public select visitor_sessions" ON visitor_sessions FOR SELECT TO anon, authenticated USING (false);

DROP POLICY IF EXISTS "Deny public insert visitor_sessions" ON visitor_sessions;
CREATE POLICY "Deny public insert visitor_sessions" ON visitor_sessions FOR INSERT TO anon, authenticated WITH CHECK (false);

DROP POLICY IF EXISTS "Deny public select visitor_events" ON visitor_events;
CREATE POLICY "Deny public select visitor_events" ON visitor_events FOR SELECT TO anon, authenticated USING (false);

DROP POLICY IF EXISTS "Deny public insert visitor_events" ON visitor_events;
CREATE POLICY "Deny public insert visitor_events" ON visitor_events FOR INSERT TO anon, authenticated WITH CHECK (false);
