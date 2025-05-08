import express from 'express'
import { getTicket, getTicketById, createTicket, updateTicket,deleteTicket } from "../controllers/ticket";

const router = express.Router()

router.get(`/ticket`, getTicket)
router.get(`/ticket/:phone`, getTicketById);
router.post(`/ticket/:phone`, createTicket);
router.put(`/ticket/:phone`, updateTicket);
router.delete(`/ticket/:phone`, deleteTicket);

export default router