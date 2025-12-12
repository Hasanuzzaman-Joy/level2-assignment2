import { Request, Response } from "express";
import { usersService } from "./users.service";
import { JwtPayload } from "jsonwebtoken";

// Get users
const getUsers = async(req:Request, res:Response) => {
  try {
    const result = await usersService.getUsers();
    return res.status(200).json(result.rows);
  } catch (error: any) {
    return res.status(500).json({ 
      message: "Internal Server Error",
      error: error.message 
    });
  }
};

// Update User
const updateUser = async(req:Request, res:Response) => {
  const paramId = req.params.userId;
  const payload = req.body;
  const { role, id: tokenUserId } = req.user as JwtPayload;

  try {
    const result = await usersService.updateUser(paramId as string, payload, role, tokenUserId);

    res.status(200).json({ message: `User ${paramId} updated successfully`, result: result.rows[0] });
  } 
  catch (error:any) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
}

// DELETE User
const deleteUser = async(req:Request, res:Response) => {
  const paramId = req.params.userId;

  try {
    const result = await usersService.deleteUser(paramId as string);

    res.status(200).json({ message: `User ${paramId} deleted successfully`, result: result.rows});
  } 
  catch (error:any) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
}

export const usersController = {
  getUsers,
  updateUser,
  deleteUser
};
