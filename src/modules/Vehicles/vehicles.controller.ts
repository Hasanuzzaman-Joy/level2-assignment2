import { Request, Response } from "express";
import { VehiclesService } from "./vehicles.service";

const addVehicle = async(req: Request, res:Response) =>{
    const payload = req.body;
    try {
        const result = await VehiclesService.addVehicle(payload)
        return res.status(201).send(result.rows[0])
    } catch (error:any) {
        res.status(500).send({error: error.message})
    }
}


const getVehicles = async(req:Request, res:Response) => {
    try {
        const result = await VehiclesService.getVehicles();
        return res.status(201).send(result.rows)
    } catch (error:any) {
        res.status(500).send(error.message)
    }
}

export const VehiclesController = {
    addVehicle,
    getVehicles
}