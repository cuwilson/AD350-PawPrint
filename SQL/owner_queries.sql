---------------------------------
-- OWNER-SPECIFIC APP QUERIES
---------------------------------

-- Simulated logged-in user
-- Change this value to test different owners

DROP TABLE IF EXISTS current_owner;

CREATE TEMP TABLE current_owner (
    owner_id INT
);

INSERT INTO current_owner (owner_id)
VALUES (1);
-- Owner 1 = Copper
-- Owner 2 = Luna
-- Owner 3 = John


-- View pets for the current owner
SELECT
    owners.owner_id,
    owners.first_name,
    owners.last_name,
    pets.pet_id,
    pets.name AS pet_name,
    pets.species,
    pets.breed,
    pets.weight
FROM owners
JOIN pets
    ON owners.owner_id = pets.owner_id
JOIN current_owner
    ON owners.owner_id = current_owner.owner_id
ORDER BY pets.name;


-- View upcoming reminders for the current owner
SELECT
    pets.name AS pet_name,
    reminders.reminder_title,
    reminder_types.type_name AS reminder_type,
    reminders.due_date
FROM reminders
JOIN pets
    ON reminders.pet_id = pets.pet_id
JOIN reminder_types
    ON reminders.reminder_type_id = reminder_types.reminder_type_id
JOIN current_owner
    ON pets.owner_id = current_owner.owner_id
WHERE reminders.is_completed = FALSE
  AND reminders.due_date >= CURRENT_DATE
ORDER BY reminders.due_date;


-- View upcoming appointments for the current owner
SELECT
    pets.name AS pet_name,
    appointments.appointment_title,
    appointments.appointment_date,
    appointments.provider_name,
    appointments.location
FROM appointments
JOIN pets
    ON appointments.pet_id = pets.pet_id
JOIN current_owner
    ON pets.owner_id = current_owner.owner_id
WHERE appointments.status = 'Scheduled'
ORDER BY appointments.appointment_date;


-- View care history for the current owner
SELECT
    pets.name AS pet_name,
    care_record_types.type_name AS care_record_type,
    care_records.title,
    care_records.record_date,
    care_records.provider_name,
    care_records.next_due_date
FROM care_records
JOIN pets
    ON care_records.pet_id = pets.pet_id
JOIN care_record_types
    ON care_records.care_record_type_id = care_record_types.care_record_type_id
JOIN current_owner
    ON pets.owner_id = current_owner.owner_id
ORDER BY pets.name, care_records.record_date DESC;


-- View current foods for the current owner
SELECT
    pets.name AS pet_name,
    foods.food_brand,
    foods.food_name,
    foods.food_type,
    food_logs.bag_size,
    food_logs.start_date,
    food_logs.notes
FROM food_logs
JOIN pets
    ON food_logs.pet_id = pets.pet_id
JOIN foods
    ON food_logs.food_id = foods.food_id
JOIN current_owner
    ON pets.owner_id = current_owner.owner_id
WHERE food_logs.end_date IS NULL
ORDER BY pets.name;

-- View dashboard stats for current owner
WITH current_owner AS (
    SELECT 1 AS owner_id
)
SELECT *
FROM owner_dashboard_stats
WHERE owner_id = (SELECT owner_id FROM current_owner);