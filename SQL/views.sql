-- -----------------------------------------------------
-- Current Pet Foods
-- -----------------------------------------------------
CREATE VIEW current_pet_foods AS
SELECT
    owners.owner_id,
    pets.pet_id,
    pets.name AS pet_name,
    foods.food_brand,
    foods.food_name,
    foods.food_type,
    food_logs.bag_size,
    food_logs.start_date
FROM food_logs
JOIN pets
    ON food_logs.pet_id = pets.pet_id
JOIN owners
    ON pets.owner_id = owners.owner_id
JOIN foods
    ON food_logs.food_id = foods.food_id
WHERE food_logs.end_date IS NULL;

-- USAGE
-- SELECT * FROM current_pet_foods
-- WHERE owner_id = 1

-- -----------------------------------------------------
-- Upcoming Appointments
-- -----------------------------------------------------
CREATE VIEW upcoming_appointments AS
SELECT
    owners.owner_id,
    appointments.appointment_id,
    pets.pet_id,
    pets.name AS pet_name,
    appointments.appointment_title,
    appointments.appointment_date,
    appointments.provider_name,
    appointments.location,
    appointments.status
FROM appointments
JOIN pets
    ON appointments.pet_id = pets.pet_id
JOIN owners
    ON pets.owner_id = owners.owner_id
WHERE appointments.status = 'Scheduled';

-- USAGE
-- SELECT * FROM upcoming_appointments
-- WHERE owner_id = 1

-- -----------------------------------------------------
-- Pet Medical History
-- -----------------------------------------------------
CREATE VIEW pet_medical_history AS
SELECT
    owners.owner_id,
    pets.pet_id,
    pets.name AS pet_name,
    care_record_types.type_name AS care_record_type,
    care_records.title,
    care_records.record_date,
    care_records.provider_name,
    care_records.next_due_date
FROM care_records
JOIN pets
    ON care_records.pet_id = pets.pet_id
JOIN owners
    ON pets.owner_id = owners.owner_id
JOIN care_record_types
    ON care_records.care_record_type_id =
       care_record_types.care_record_type_id;

-- USAGE
-- SELECT * FROM pet_medical_history
-- WHERE owner_id = 1

-- -----------------------------------------------------
-- Owner Dashboard
-- -----------------------------------------------------
CREATE VIEW owner_pet_summary AS
SELECT
    owners.owner_id,
    owners.first_name,
    owners.last_name,
    pets.pet_id,
    pets.name AS pet_name,
    pets.species,
    pets.breed
FROM owners
JOIN pets
    ON owners.owner_id = pets.owner_id;

-- USAGE
-- SELECT * FROM owner_pet_summary
-- WHERE owner_id = 1

-- -----------------------------------------------------
-- Upcoming Reminders
-- -----------------------------------------------------
CREATE VIEW upcoming_reminders AS
SELECT
    owners.owner_id,
    pets.pet_id,
    pets.name AS pet_name,
    reminders.reminder_title,
    reminder_types.type_name AS reminder_type,
    reminders.due_date
FROM reminders
JOIN pets
    ON reminders.pet_id = pets.pet_id
JOIN owners
    ON pets.owner_id = owners.owner_id
JOIN reminder_types
    ON reminders.reminder_type_id = reminder_types.reminder_type_id
WHERE reminders.is_completed = FALSE;

-- USAGE
-- SELECT * FROM upcoming_reminders
-- WHERE owner_id = 1