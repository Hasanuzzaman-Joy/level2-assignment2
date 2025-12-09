import { pool } from "../../config/db";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from "../../config";

// User Registration
const userRegisteration = async(payload: Record<string, unknown>) => {
    const {name, email, password, phone, role} = payload;

    const hashedPassword = await bcrypt.hash(password as string, 10);

    const result = await pool.query(`
        INSERT INTO Users (name, email, password, phone, role) VALUES($1, $2, $3, $4, $5) RETURNING *;
    `, [name, email, hashedPassword, phone, role]);
    
    return result;
};

// User Login
const userLogin = async(payload: Record<string, unknown>) => {
    const {email, password} = payload;

    const user = await pool.query(`
        SELECT * FROM Users WHERE email = $1;
    `, [email]);

    if (user.rows.length === 0) {
        throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password as string, user.rows[0].password);

    if(!isPasswordValid) {
        throw new Error("Invalid password");
    }

    const token = jwt.sign({name: user.rows[0].name, email: user.rows[0].email, role: user.rows[0].role}, config.Jwt_secret as string, {expiresIn: '1h'});

    return {token, user: user.rows[0]};
}

export const AuthService = {
    userRegisteration,
    userLogin
};