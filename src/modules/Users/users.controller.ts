import { Request, Response } from "express";
import { usersService } from "./users.service";

const getUsers = async(req:Request, res:Response) => {
  const result = await usersService.getUsers();

  try {
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const usersController = {
  getUsers,
};
