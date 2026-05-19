---------------------------------
-- JOINS
---------------------------------
-- View pets and their owners
SELECT
    pets.name AS pet_name,
    pets.species,
    pets.breed,
    owners.first_name,
    owners.last_name
FROM pets
JOIN owners
    ON pets.owner_id = owners.owner_id;

-- View reminders with pet names
SELECT
    reminders.reminder_title,
    reminders.reminder_type,
    reminders.due_date,
    pets.name AS pet_name
FROM reminders
JOIN pets
    ON reminders.pet_id = pets.pet_id
ORDER BY reminders.due_date;


-- View care records with pet names
SELECT
    pets.name AS pet_name,
    care_records.record_type,
    care_records.title,
    care_records.record_date,
    care_records.provider_name
FROM care_records
JOIN pets
    ON care_records.pet_id = pets.pet_id
ORDER BY care_records.record_date DESC;

-- View current active food logs
SELECT
    pets.name AS pet_name,
    food_logs.food_brand,
    food_logs.food_name,
    food_logs.start_date
FROM food_logs
JOIN pets
    ON food_logs.pet_id = pets.pet_id
WHERE food_logs.end_date IS NULL;