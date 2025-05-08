import express from "express";
import {
  getUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user";

const router = express.Router();

router.get(`/user`, getUser);
router.get(`/user/:phone`, getUserById);
router.post(`/user`, createUser);
router.put(`/user/:phone`, updateUser);
router.delete(`/user/:phone`, deleteUser);

export default router;
