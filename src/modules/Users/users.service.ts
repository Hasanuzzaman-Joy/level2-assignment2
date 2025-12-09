import { pool } from "../../config/db";

//Get Users
const getUsers = async () => {
  const result = await pool.query("SELECT * FROM users");
  return result;
};

// Update User
const updateUser = async (
  userId: string,
  payload: Record<string, unknown>,
  userRole: string,
  tokenUserId: string
) => {
  const { name, email, phone, role } = payload;

  if (userRole === "admin") {
    return await pool.query(
      "UPDATE users SET name=$1, email=$2, phone=$3, role=$4 WHERE id=$5 RETURNING *",
      [name, email, phone, role, userId]
    );
  } else if (userRole === "customer") {
    if (userId.toString() !== tokenUserId.toString()) {
      throw new Error("Customers can only update their own profile");
    }
    return await pool.query(
      "UPDATE users SET name=$1, phone=$2 WHERE id=$3 RETURNING *",
      [name, phone, userId]
    );
  }
  throw new Error("Unauthorized role");
};

export const usersService = {
  getUsers,
  updateUser,
};
