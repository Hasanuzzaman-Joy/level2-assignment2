import config from ".";
import { Pool } from "pg";

export const pool = new Pool({
  connectionString: config.DB_URL,
});

export async function initDB() {
  await pool.query(`
        CREATE TABLE IF NOT EXISTS Users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(250) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL CHECK (LENGTH(password) >= 6),
        phone VARCHAR(15) NOT NULL,
        role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'customer'))
        );

        CREATE TABLE IF NOT EXISTS Vehicles (
        id SERIAL PRIMARY KEY, 
        vehicle_name VARCHAR(255) NOT NULL,
        type VARCHAR(10) NOT NULL CHECK (type IN ('car', 'bike', 'van', 'SUV')),
        registration_number VARCHAR(50) NOT NULL UNIQUE,
        daily_rent_price NUMERIC(10,2) NOT NULL CHECK (daily_rent_price > 0),
        availability_status VARCHAR(10) NOT NULL CHECK (availability_status IN ('available', 'booked')) 
        );

        CREATE TABLE IF NOT EXISTS Bookings (
        id SERIAL PRIMARY KEY, 
        customer_id INT NOT NULL REFERENCES Users(id) ON DELETE CASCADE, 
        vehicle_id INT NOT NULL REFERENCES Vehicles(id) ON DELETE CASCADE,
        rent_start_date DATE NOT NULL,
        rent_end_date DATE NOT NULL CHECK (rent_end_date > rent_start_date),
        total_price NUMERIC(10,2) NOT NULL CHECK (total_price > 0),
        status VARCHAR(10) NOT NULL CHECK (status IN ('active', 'cancelled', 'returned')) 
        );
    `);
}
