import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

export const auth =  (...roles: string[]) => {
    return (req:Request, res:Response, next:NextFunction) => {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: "Token missing" });
        }   

        try {
            const decoded = jwt.verify(token, config.Jwt_secret as string);

            req.user = decoded as JwtPayload;

            if (!roles.includes((decoded as JwtPayload).role)) {
                return res.status(403).json({ message: "Forbidden: You don't have enough permissions" });
            }
            next();
        } catch (error) {
            return res.status(401).json({ message: "Invalid token" });
        }
    }
}