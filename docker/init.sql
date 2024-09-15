-- Create grade enum type if it does not exist
DO $$ BEGIN
    CREATE TYPE grade_enum AS ENUM (
        'PREK',
        'KNDGTN',
        'GRADE1',
        'GRADE2',
        'GRADE3',
        'GRADE4',
        'GRADE5',
        'GRADE6',
        'JRHIGHSCH',
        'HIGHSCH',
        'ADULT'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create words table if it does not exist
CREATE TABLE IF NOT EXISTS words (
    id SERIAL PRIMARY KEY,
    word TEXT NOT NULL,
    first_letter CHAR(1),
    grade_level grade_enum
);
