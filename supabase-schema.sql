-- Run this in your Supabase SQL editor to set up the database

CREATE TABLE submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  paid_at TIMESTAMP WITH TIME ZONE,

  -- Client info
  full_name TEXT NOT NULL,
  company TEXT NOT NULL,
  industry TEXT,
  location TEXT,
  tone TEXT,
  customer_email TEXT,

  -- Full form data as JSON
  form_data JSONB,

  -- Generated article
  article_headline TEXT,
  article_body TEXT,

  -- Package & payment
  package_id TEXT,
  package_name TEXT,
  status TEXT DEFAULT 'pending_payment', -- pending_payment | paid | published
  stripe_session_id TEXT
);

-- Enable Row Level Security
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

-- Only service role can access (no public reads)
-- Your backend uses SUPABASE_SERVICE_KEY which bypasses RLS

-- Optional: index for faster lookups
CREATE INDEX idx_submissions_status ON submissions(status);
CREATE INDEX idx_submissions_stripe_session ON submissions(stripe_session_id);
