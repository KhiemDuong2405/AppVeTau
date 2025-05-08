import express from 'express'
import { createTrip, deleteTrip, getTrip, getTripByQuery, updateTrip } from '../controllers/trip'

const router = express.Router()

router.get(`/trip`, getTrip)
router.get(`/trip`, getTripByQuery);
router.post(`/trip`, createTrip);
router.put(`/trip`, updateTrip);
router.delete(`/trip`, deleteTrip);

export default router