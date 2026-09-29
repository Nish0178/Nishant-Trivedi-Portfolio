-- Production-safe schema migration: Add updated_at column to contact_messages
-- Accommodates existing data by backfilling from created_at before enforcing NOT NULL

DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name = 'contact_messages'
    ) AND NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' AND table_name = 'contact_messages' AND column_name = 'updated_at'
    ) THEN
        -- Step 1: Add updated_at column as nullable timestamp(6)
        ALTER TABLE public.contact_messages ADD COLUMN updated_at TIMESTAMP(6) WITHOUT TIME ZONE;

        -- Step 2: Populate existing rows using created_at timestamp
        UPDATE public.contact_messages SET updated_at = created_at WHERE updated_at IS NULL;

        -- Step 3: Enforce NOT NULL constraint now that all existing rows are populated
        ALTER TABLE public.contact_messages ALTER COLUMN updated_at SET NOT NULL;

        -- Step 4: Set DEFAULT CURRENT_TIMESTAMP for automated timestamping
        ALTER TABLE public.contact_messages ALTER COLUMN updated_at SET DEFAULT CURRENT_TIMESTAMP;
    END IF;
END $$;
