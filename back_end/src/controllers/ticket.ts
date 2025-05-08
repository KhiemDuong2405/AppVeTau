import { rtdb } from "../firebase";

export const getTicket = async (req, res) => {
  try {
    const snapshot = await rtdb.ref("User").once("value");
    const data = snapshot.val();

    if (!data) {
      return res.status(404).json({ message: "No users or tickets found" });
    }

    const result: Record<string, any> = {};

    for (const phone in data) {
      if (data[phone].LSV) {
        result[phone] = data[phone].LSV;
      }
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch tickets" });
  }
};

export const getTicketById = async (req, res) => {
  try {
    const { phone } = req.params;

    if (!phone) {
      return res.status(400).json({ error: "Missing phone parameter" });
    }

    const snapshot = await rtdb.ref(`User/${phone}/LSV`).once("value");
    const data = snapshot.val();

    if (!data) {
      return res
        .status(404)
        .json({ message: "No tickets found for this user" });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch user tickets" });
  }
};

export const createTicket = async (req, res) => {
  try {
    const { phone } = req.params;
    const { date, from, to, index, giodi, phutdi, gioden, phutden, gheDaChon } =
      req.body;

    if (!phone || !date || !from || !to || !index) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const ticketData = {
      giodi,
      phutdi,
      gioden,
      phutden,
      gheDaChon,
    };

    const path = `User/${phone}/LSV/${date}/${from}/${to}/${index}`;
    await rtdb.ref(path).set(ticketData);

    return res.status(200).json({ message: "Ticket created successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create ticket" });
  }
};

export const deleteTicket = async (req, res) => {
  try {
    const { phone } = req.params;
    const { date, from, to, index } = req.query;

    if (!phone || !date || !from || !to || !index) {
      return res.status(400).json({ error: "Missing required parameters" });
    }

    const path = `User/${phone}/LSV/${date}/${from}/${to}/${index}`;
    await rtdb.ref(path).remove();

    return res.status(200).json({ message: "Ticket deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to delete ticket" });
  }
};

export const updateTicket = async (req, res) => {
  try {
    const { phone } = req.params;
    const { date, from, to, index, gheDaChon, giodi, phutdi, gioden, phutden } =
      req.body;

    if (!phone || !date || !from || !to || !index) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const path = `User/${phone}/LSV/${date}/${from}/${to}/${index}`;

    const updateData: Record<string, any> = {};
    if (giodi !== undefined) updateData.giodi = giodi;
    if (phutdi !== undefined) updateData.phutdi = phutdi;
    if (gioden !== undefined) updateData.gioden = gioden;
    if (phutden !== undefined) updateData.phutden = phutden;
    if (gheDaChon !== undefined) updateData.gheDaChon = gheDaChon;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: "No fields to update" });
    }

    await rtdb.ref(path).update(updateData);

    return res.status(200).json({ message: "Ticket updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update ticket" });
  }
};
