import { Request, Response } from "express";
import { AuthService } from "./auth.service";

const userRegisteration = async (req:Request, res:Response) => { 
    const payload = req.body;
    
    try {
        const result = await AuthService.userRegisteration(payload);
        res.status(201).json({
            message: "User registered successfully",
            result: result.rows
        });
    } catch (error:any) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
}

export const authController = {
    userRegisteration
};