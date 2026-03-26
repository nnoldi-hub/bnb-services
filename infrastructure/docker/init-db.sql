-- Initial database setup script
-- This runs automatically when PostgreSQL container starts for the first time

-- Create schemas
CREATE SCHEMA IF NOT EXISTS public;

-- Set default privileges
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO public;

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Log initialization
DO $$
BEGIN
  RAISE NOTICE 'BNB Services database initialized successfully!';
END $$;
