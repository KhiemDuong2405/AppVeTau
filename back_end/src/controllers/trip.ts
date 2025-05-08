import { rtdb } from "../firebase";
import { Request, Response } from "express";

export const getTrip = async (req: Request, res: Response) => {
  try {
    const { date, from, to } = req.query;

    let path = "VeTau";
    if (date) path += `/${date}`;
    if (from) path += `/${from}`;
    if (to) path += `/${to}`;

    const snapshot = await rtdb.ref(path).once("value");
    const data = snapshot.val();

    if (!data) {
      return res.status(404).json({ message: "No trips found" });
    }

    return res.json(data);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch trips" });
  }
};

export const getTripByQuery = async (req: Request, res: Response) => {
  try {
    const { date, from, to, index } = req.query;

    if (!date) {
      return res
        .status(400)
        .json({ error: "Missing required parameter: date" });
    }

    let basePath = `VeTau/${date}`;
    if (from) basePath += `/${from}`;
    if (to) basePath += `/${to}`;
    if (index) basePath += `/${index}`;

    const ref = rtdb.ref(basePath);
    const snapshot = await ref.once("value");
    const data = snapshot.val();

    if (!data) {
      return res.status(404).json({ message: "No trip(s) found" });
    }

    const formatResult = (val: any) => {
      if (typeof val === "object" && !Array.isArray(val)) {
        const result: any[] = [];
        for (const fromKey in val) {
          for (const toKey in val[fromKey]) {
            for (const indexKey in val[fromKey][toKey]) {
              result.push({
                date,
                from: fromKey,
                to: toKey,
                index: indexKey,
                ...val[fromKey][toKey][indexKey],
              });
            }
          }
        }
        return result;
      }
      return val; 
    };

    return res.status(200).json(formatResult(data));
  } catch (error) {
    console.error("Error fetching trip:", error);
    return res.status(500).json({ error: "Failed to fetch trip(s)" });
  }
};

export const createTrip = async (req: Request, res: Response) => {
  try {
    const {
      date,
      from,
      to,
      index,
      giodi,
      phutdi,
      gioden,
      phutden,
      row = 10,
      col = 12,
    } = req.body;

    if (
      !date ||
      !from ||
      !to ||
      !index ||
      giodi === undefined ||
      phutdi === undefined ||
      gioden === undefined ||
      phutden === undefined
    ) {
      return res.status(400).json({ error: "Missing required trip fields" });
    }

    const ghetrong: Record<string, Record<string, boolean>> = {};
    for (let i = 1; i <= row; i++) {
      ghetrong[i] = {};
      for (let j = 1; j <= col; j++) {
        ghetrong[i][j] = false;
      }
    }

    const tripData = {
      giodi,
      phutdi,
      gioden,
      phutden,
      ghetrong,
    };

    await rtdb.ref(`VeTau/${date}/${from}/${to}/${index}`).set(tripData);

    res.status(200).json({ message: "Trip created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create trip" });
  }
};

export const deleteTrip = async (req: Request, res: Response) => {
  try {
    const { date, from, to, index } = req.query;

    if (!date) {
      return res
        .status(400)
        .json({ error: "Missing required parameter: date" });
    }

    let basePath = `VeTau/${date}`;
    if (from) basePath += `/${from}`;
    if (to) basePath += `/${to}`;
    if (index) basePath += `/${index}`;

    const ref = rtdb.ref(basePath);
    const snapshot = await ref.once("value");

    if (!snapshot.exists()) {
      return res.status(404).json({ message: "No matching trip(s) found" });
    }

    await ref.remove();
    return res.status(200).json({ message: "Trip(s) deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    return res.status(500).json({ error: "Failed to delete trip(s)" });
  }
};

export const updateTrip = async (req: Request, res: Response) => {
  try {
    const { date, from, to, index } = req.query;
    const { giodi, phutdi, gioden, phutden, ghetrong } = req.body;

    if (!date || !from || !to || !index) {
      return res.status(400).json({
        error: "Missing required query parameters: date, from, to, index",
      });
    }

    const tripPath = `VeTau/${date}/${from}/${to}/${index}`;
    const tripSnapshot = await rtdb.ref(tripPath).once("value");

    if (!tripSnapshot.exists()) {
      return res.status(404).json({ error: "Trip not found" });
    }

    const updateData: Record<string, any> = {};
    if (giodi !== undefined) updateData.giodi = giodi;
    if (phutdi !== undefined) updateData.phutdi = phutdi;
    if (gioden !== undefined) updateData.gioden = gioden;
    if (phutden !== undefined) updateData.phutden = phutden;

    if (Object.keys(updateData).length > 0) {
      await rtdb.ref(tripPath).update(updateData);
    }

    if (ghetrong && typeof ghetrong === "object") {
      const updates: Record<string, any> = {};

      for (const row in ghetrong) {
        for (const col in ghetrong[row]) {
          const seatValue = ghetrong[row][col];
          updates[`ghetrong/${row}/${col}`] = seatValue;
        }
      }

      if (Object.keys(updates).length > 0) {
        await rtdb.ref(tripPath).update(updates);
      }
    }

    return res.status(200).json({ message: "Trip updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update trip" });
  }
};
