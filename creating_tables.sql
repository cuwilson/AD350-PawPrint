-- -----------------------------------------------------
-- Table owners
-- -----------------------------------------------------
CREATE TABLE owners (
    owner_id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT
);

-- -----------------------------------------------------
-- Table pets
-- -----------------------------------------------------
CREATE TABLE pets (
    pet_id SERIAL PRIMARY KEY,
    owner_id INT NOT NULL,
    name TEXT NOT NULL,
    species TEXT,
    breed TEXT,
    birth_date DATE,
    weight NUMERIC,

    CONSTRAINT fk_owner
        FOREIGN KEY (owner_id)
        REFERENCES owners(owner_id)
        ON DELETE CASCADE --if an owner is deleted, their pets will also be deleted
);

-- -----------------------------------------------------
-- Table care_records
-- -----------------------------------------------------
CREATE TABLE care_records (
    care_record_id SERIAL PRIMARY KEY,
    pet_id INT NOT NULL,
    record_type TEXT NOT NULL,
    record_date DATE NOT NULL,
    title TEXT,
    description TEXT,
    provider_name TEXT,
    next_due_date DATE,

    CONSTRAINT fk_pet_care
        FOREIGN KEY (pet_id)
        REFERENCES pets(pet_id)
        ON DELETE CASCADE
);

-- -----------------------------------------------------
-- Table reminders
-- -----------------------------------------------------
CREATE TABLE reminders (
    reminder_id SERIAL PRIMARY KEY,
    pet_id INT NOT NULL,
    reminder_title TEXT NOT NULL,
    reminder_type TEXT,
    due_date DATE NOT NULL,
    is_completed BOOLEAN DEFAULT FALSE,

    CONSTRAINT fk_pet_reminder
        FOREIGN KEY (pet_id)
        REFERENCES pets(pet_id)
        ON DELETE CASCADE
);

-- -----------------------------------------------------
-- Table food_logs
-- -----------------------------------------------------
CREATE TABLE food_logs (
    food_log_id SERIAL PRIMARY KEY,
    pet_id INT NOT NULL,
    food_brand TEXT,
    food_name TEXT,
    bag_size TEXT,
    start_date DATE NOT NULL,
    end_date DATE,
    notes TEXT,

    CONSTRAINT fk_pet_food
        FOREIGN KEY (pet_id)
        REFERENCES pets(pet_id)
        ON DELETE CASCADE
);