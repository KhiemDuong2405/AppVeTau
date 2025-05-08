import { rtdb } from "../firebase";

export const getUser = async (req, res) => {
  try {
    const snapshot = await rtdb.ref("User").once("value");
    const data = snapshot.val();

    if (!data) {
      return res.status(404).json({ message: "No users found" });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch users" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { phone } = req.params; 

    if (!phone) {
      return res.status(400).json({ error: "Missing phone number" });
    }

    const snapshot = await rtdb.ref(`User/${phone}`).once("value");
    const user = snapshot.val();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch user" });
  }
};

export const createUser = async (req, res) => {
  try {
    const { phone, name, email, diachi } = req.body;

    if (!phone || !name || !email || !diachi) {
      return res.status(400).json({ error: "Missing required user fields" });
    }

    const user = { name, email, diachi};

    await rtdb.ref(`User/${phone}`).set(user);

    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create user" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { phone } = req.params; 
    const { name, email, diachi } = req.body;

    if (!phone) {
      return res.status(400).json({ error: "Missing phone number" });
    }

    const updates: Record<string, any> = {};
    if (name !== undefined) updates.name = name;
    if (email !== undefined) updates.email = email;
    if (diachi !== undefined) updates.diachi = diachi;

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: "No fields to update" });
    }

    await rtdb.ref(`User/${phone}`).update(updates);

    return res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update user" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { phone } = req.params; 

    if (!phone) {
      return res.status(400).json({ error: "Missing phone number" });
    }

    await rtdb.ref(`User/${phone}`).remove();

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to delete user" });
  }
};
