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


-- View reminders with pet names and reminder types
SELECT
    reminders.reminder_title,
    reminder_types.type_name AS reminder_type,
    reminders.due_date,
    reminders.is_completed,
    pets.name AS pet_name
FROM reminders
JOIN pets
    ON reminders.pet_id = pets.pet_id
JOIN reminder_types
    ON reminders.reminder_type_id = reminder_types.reminder_type_id
ORDER BY reminders.due_date;


-- View care records with pet names and care record types
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
ORDER BY care_records.record_date DESC;


-- View current active food logs
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
WHERE food_logs.end_date IS NULL
ORDER BY pets.name, food_logs.start_date DESC;

---------------------------------
-- APP-FOCUSED QUERIES
---------------------------------

-- Upcoming reminders
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
WHERE reminders.is_completed = FALSE
  AND reminders.due_date >= CURRENT_DATE
ORDER BY reminders.due_date;


-- Overdue reminders
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
WHERE reminders.is_completed = FALSE
  AND reminders.due_date < CURRENT_DATE
ORDER BY reminders.due_date;


-- Care history by pet
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
ORDER BY pets.name, care_records.record_date DESC;


-- Current food per pet
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
WHERE food_logs.end_date IS NULL
ORDER BY pets.name;


-- Food duration history
SELECT
    pets.name AS pet_name,
    foods.food_brand,
    foods.food_name,
    food_logs.bag_size,
    food_logs.start_date,
    food_logs.end_date,
    food_logs.end_date - food_logs.start_date AS days_used
FROM food_logs
JOIN pets
    ON food_logs.pet_id = pets.pet_id
JOIN foods
    ON food_logs.food_id = foods.food_id
WHERE food_logs.end_date IS NOT NULL
ORDER BY pets.name, food_logs.start_date;


-- Upcoming appointments
SELECT
    pets.name AS pet_name,
    appointments.appointment_title,
    appointments.appointment_date,
    appointments.provider_name,
    appointments.location,
    appointments.status
FROM appointments
JOIN pets
    ON appointments.pet_id = pets.pet_id
WHERE appointments.status = 'Scheduled'
ORDER BY appointments.appointment_date;

-- Past appointments
SELECT
    pets.name AS pet_name,
    appointments.appointment_title,
    appointments.appointment_date,
    appointments.provider_name,
    appointments.status
FROM appointments
JOIN pets
    ON appointments.pet_id = pets.pet_id
ORDER BY appointments.appointment_date DESC;

-- appointments in the next 30 days
SELECT
    pets.name AS pet_name,
    appointments.appointment_title,
    appointments.appointment_date
FROM appointments
JOIN pets
    ON appointments.pet_id = pets.pet_id
WHERE appointments.appointment_date
    BETWEEN CURRENT_DATE
    AND CURRENT_DATE + INTERVAL '30 days'
ORDER BY appointments.appointment_date;

-- View pets for a specific owner
SELECT
    owners.first_name,
    owners.last_name,
    pets.name AS pet_name,
    pets.species,
    pets.breed
FROM owners
JOIN pets
    ON owners.owner_id = pets.owner_id
WHERE owners.owner_id = 1;

-- View upcoming appointments for a specific owner
SELECT
    pets.name AS pet_name,
    appointments.appointment_title,
    appointments.appointment_date
FROM appointments
JOIN pets
    ON appointments.pet_id = pets.pet_id
JOIN owners
    ON pets.owner_id = owners.owner_id
WHERE owners.owner_id = 1
  AND appointments.status = 'Scheduled'
ORDER BY appointments.appointment_date;