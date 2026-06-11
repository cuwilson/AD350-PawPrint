# AD350-PawPrint
**Copper Wilson** 

*AD350 - Database Technology*

### Overview
This project is divided into two parts - first is the database schema and backend for the PawPrint app designed in AD351, the second is a React Native / Expo application connected to the PawPrint PostgreSQL database hosted in Supabase

Currently, this application serves as the front-end for the PawPrint database project. Users can create owner accounts, log in using their email address, and access a personalized dashboard.

#### The Goal
PawPrint helps pet owners manage their pets care in one place. Users can add pets, view services, schedule appointments, and track basic pet care records. 

## Database Schema
### Core Tables
1. `Owners`
stores the pet owner's information
    - id
    - first_name
    - last_name
    - email
    - phone
2. `pets` stores each pet profile
    - id
    - owner_id
    - name
    - species
    - breed
    - birth_date
    - adoption_date
    - weight
3. `care_records`
    - id
    - pet_id
    - care_record_type_id
    - record_date
    - title
    - description
    - provider_name
    - next_due_date
4. `reminders`
    - id
    - pet_id
    - reminder_title
    - reminder_type_id
    - due_date
    - is_completed
5. `food_logs`
    - id
    - pet_id
    - food_id
    - bag_size
    - start_date
    - end_date
    - notes
6. `appointments`
    - appointment_id
    - pet_id
    - appointment_title
    - appointment_date
    - provider_name
    - location
    - notes
    - status

### Other Tables
1. `reminder_types` 
    - id
    - type_name
2. `care_record_types`
    - id
    - type_name
3. `foods` to help standardize the DB, so food could be a dropdown
    - id
    - food_brand
    - food_name
    - food_type
    - species
    
    
## Expo App
### Current Features
- Create a new owner account
- Store owner information in Supabase
- Look up existing owners by email
- navigate to a dashboard after login
- Connect directly to the PawPrint database
### Technologies Used
- Expo
- React Native
- TypeScript
- Expo Router
- Supabase
- PostgreSQL
---
### Setup
1.  Install Dependencies
`npm install`
2. Create Environment Variables
    Create a `.env` file in the project root:
    ```
    EXPO_PUBLIC_SUPABASE_URL=your_supabase_project_url
    EXPO_PUBLIC_SUPABASE_KEY=your_supabase_publishable_key
    ```
    The `.env` file is not committed to source control and must be created locally before running the application.

3. Start the Application
`npx expo start`

#### Wireframes
  ![High fidelity Wireframes](images/HFWF.png)