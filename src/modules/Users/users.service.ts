import { pool } from "../../config/db";

//Get Users
const getUsers = async () => {
  const result = await pool.query("SELECT * FROM Users");
  return result;
};

// Update User
const updateUser = async (
  userId: string,
  payload: Record<string, unknown>,
  userRole: string,
  tokenUserId: string
) => {
  // Check if user exists
  const userCheck = await pool.query(
    `SELECT * FROM Users WHERE id = $1`,
    [userId]
  );

  if (userCheck.rows.length === 0) {
    throw new Error("User not found");
  }

  if (userRole === "admin") {
    const { name, email, phone, role } = payload;
    // Ensure email is lowercase if provided
    const lowerEmail = email ? (email as string).toLowerCase() : userCheck.rows[0].email;
    return await pool.query(
      "UPDATE Users SET name=$1, email=$2, phone=$3, role=$4 WHERE id=$5 RETURNING *",
      [name, lowerEmail, phone, role, userId]
    );
  } else if (userRole === "customer") {
    if (userId.toString() !== tokenUserId.toString()) {
      throw new Error("Customers can only update their own profile");
    }
    
    // Customers cannot update their role - reject if role is provided
    if (payload.role !== undefined) {
      throw new Error("Customers cannot update their role");
    }
    
    // Customers can only update name and phone
    const { name, phone } = payload;
    return await pool.query(
      "UPDATE Users SET name=$1, phone=$2 WHERE id=$3 RETURNING id, name, email, phone, role",
      [name, phone, userId]
    );
  }
  throw new Error("Unauthorized role");
};

// DELETE User
const deleteUser = async (userId: string) => {
  // Check if user exists
  const userCheck = await pool.query(
    `SELECT * FROM Users WHERE id = $1`,
    [userId]
  );

  if (userCheck.rows.length === 0) {
    throw new Error("User not found");
  }

  const bookings = await pool.query(
    `SELECT * FROM Bookings WHERE customer_id = $1`,
    [userId]
  );

  const activeBooking = bookings.rows.find(b => b.status === "active");
  if (activeBooking) {
    throw new Error("Cannot delete user with active bookings");
  }

  // Delete the user
  return await pool.query(
    `DELETE FROM Users WHERE id = $1 RETURNING *`,
    [userId]
  );
};

export const usersService = {
  getUsers,
  updateUser,
  deleteUser,
};
