-- Insert sample reminder types
INSERT INTO reminder_types (type_name)
VALUES
('Vaccination'),
('Checkup'),
('Medication'),
('Food'),
('Grooming'),
('Equipment'),
('Other');

-- Insert sample care record types
INSERT INTO care_record_types (type_name)
VALUES
('Vaccination'),
('Checkup'),
('Medication'),
('Surgery'),
('Dental'),
('Lab Work'),
('Other');

-- Insert security questions
INSERT INTO security_questions (question_text) VALUES
('What was the name of your first pet?'),
('What city were you born in?'),
('What is your favorite animal?'),
('What was the name of your elementary school?'),
('What is your favorite food?');

-- Insert sample owners
INSERT INTO owners (first_name, last_name, email, password, security_question_id, security_answer, phone)
VALUES
('Copper', 'Wilson', 'copper.wilson@email.com', 'password123', 5, 'Pasta', '509-867-5309'),
('Luna', 'Hawthorn', 'luna.hawthorn@email.com', 'password456', 2, 'Seattle', '555-555-5555'),
('John', 'Doe', 'john.doe@email.com', 'password789', 3, 'Dog', '555-222-3333');

-- Insert sample pets
INSERT INTO pets (owner_id, name, species, breed, birth_date, weight)
VALUES
(1, 'Oreo', 'Cat', 'Domestic Shorthair', '2018-08-13', 13.5),
(2, 'Cricket', 'Cat', 'Domestic Shorthair', '2023-09-28', 8.2),
(3, 'Olive', 'Dog', 'Golden Retriever', '2020-02-18', 65.0),
(3, 'Mars', 'Dog', 'Australian Shepherd', '2022-01-25', 55.0);

-- Insert sample care records
INSERT INTO care_records
(pet_id, care_record_type_id, record_date, title, description, provider_name, next_due_date)
VALUES
(
    1,
    1, -- vaccination
    '2026-03-09',
    'Rabies Vaccine',
    'Annual rabies vaccination.',
    'Bellevue Pet Care Clinic',
    '2027-03-09'
),
(
    2,
    2, -- checkup
    '2026-01-10',
    'Annual Wellness Exam',
    'Routine yearly checkup and weight evaluation.',
    'Evergreen Animal Hospital',
    '2027-01-10'
),
(
    3,
    3, -- medication
    '2026-03-05',
    'Flea & Tick Treatment',
    'Monthly preventative medication.',
    'Happy Paws Vet',
    '2026-04-05'
),
(
    4,
    4, -- surgery
    '2022-11-20',
    'Neuter Procedure',
    'Routine neuter surgery with no complications.',
    'Cascade Pet Clinic',
    NULL
);

-- Insert sample appointments
INSERT INTO appointments
( pet_id, appointment_title, appointment_date, provider_name, location, notes, status)
VALUES
(
    1,
    'Annual Wellness Exam',
    '2026-08-15 10:00:00',
    'Bellevue Pet Care Clinic',
    'Bellevue, WA',
    'Yearly exam and weight check.',
    'Scheduled'
),
(
    2,
    'Kitten Follow-Up Visit',
    '2026-07-10 14:30:00',
    'Evergreen Animal Hospital',
    'Seattle, WA',
    'Monitor growth and vaccinations.',
    'Scheduled'
),
(
    3,
    'Dental Cleaning',
    '2026-06-20 09:00:00',
    'Happy Paws Vet',
    'Redmond, WA',
    'Routine dental cleaning.',
    'Scheduled'
),
(
    4,
    'Neuter Follow-Up',
    '2022-12-05 11:00:00',
    'Cascade Pet Clinic',
    'Bellevue, WA',
    'Post-surgery checkup.',
    'Completed'
);

-- Insert sample reminders
INSERT INTO reminders
(pet_id, reminder_title, reminder_type_id, due_date, is_completed)
VALUES
(1, 'Schedule Oreo rabies booster', 1, '2027-03-09', FALSE),
(2, 'Cricket annual wellness exam', 2, '2027-01-10', FALSE),
(3, 'Give Olive flea & tick medication', 3, '2026-04-05', FALSE),
(4, 'Buy Mars quarterly toy', 6, '2026-05-01', FALSE);


-- Insert sample foods
INSERT INTO foods
(food_brand, food_name, food_type, species)
VALUES
(
    'Nutrish',
    'Indoor Complete Chicken, Lentils & Salmon',
    'Dry Food',
    'Cat'
),
(
    'Hill''s Prescription Diet',
    'Multicare Urinary Care Dry, Chicken Flavor',
    'Prescription Dry Food',
    'Cat'
),
(
    'Hill''s Science Diet',
    'Kitten Formula',
    'Dry Food',
    'Cat'
),
(
    'Blue Buffalo',
    'Large Breed Adult',
    'Dry Food',
    'Dog'
),
(
    'Taste of the Wild',
    'High Prairie Canine',
    'Dry Food',
    'Dog'
);

-- Insert sample food logs
INSERT INTO food_logs
(pet_id, food_id, bag_size, start_date, end_date, notes)
VALUES
(
    1, -- Oreo
    1, -- Nutrish
    '14 lb',
    '2025-05-03',
    '2025-09-03',
    'Mixed some wet food with dry.'
),
(
    1,
    1,
    '14 lb',
    '2025-09-04',
    '2026-01-12',
    NULL
),
(
    1,
    1, 
    '14 lb',
    '2026-01-13',
    NULL,
    NULL
),
(
    1,
    2, -- Hill's Prescription Diet
    '14 lb',
    '2026-03-15',
    NULL,
    'Switched to this food due to urinary issues.'
),
(
    2,
    3, -- Hill's Science Diet
    '7 lb',
    '2026-05-01',
    NULL,
    'Currently transitioning to this food slowly.'
),
(
    3,
    4, -- Blue Buffalo
    '30 lb',
    '2026-03-15',
    '2026-04-30',
    'No digestive issues noticed.'
),
(
    4,
    5, -- Taste of the Wild
    '28 lb',
    '2026-04-20',
    NULL,
    'Mars has higher energy levels on this food.'
);


