import { Request, Response } from "express";
import { AuthService } from "./auth.service";

const userRegisteration = async (req:Request, res:Response) => { 
    const payload = req.body;
    
    try {
        const result = await AuthService.userRegisteration(payload);
        res.status(201).json({
            message: "User registered successfully",
            result: result.rows[0]
        });
    } catch (error:any) {
        if (error.message && error.message.includes('duplicate key value')) {
            return res.status(400).json({
                message: "Email already exists",
                error: error.message
            });
        }
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
}

const userLogin = async (req:Request, res:Response) => { 
    const payload = req.body;

    try {
        const result = await AuthService.userLogin(payload);
        return res.status(200).json({
            message: "User logged in successfully",
            token: result.token,
            user: result.user
        });
    } catch (error:any) {
        // Handle authentication errors with 401
        if (error.message === "User not found" || error.message === "Invalid password") {
            return res.status(401).json({
                message: "Invalid credentials",
                error: error.message
            });
        }
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
}

export const authController = {
    userRegisteration,
    userLogin
};