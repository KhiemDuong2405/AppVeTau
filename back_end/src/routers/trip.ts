import express from 'express'
import { createTrip, deleteTrip, getTrip, getTripById, updateTrip } from '../controllers/trip'

const router = express.Router()

router.get(`/trip`, getTrip)
router.get(`/trip`, getTripById);
router.post(`/trip`, createTrip);
router.put(`/trip`, updateTrip);
router.delete(`/trip`, deleteTrip);

export default router