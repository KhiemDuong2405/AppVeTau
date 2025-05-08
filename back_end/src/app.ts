import express from 'express'
import tripRouter from './routers/trip'
import ticketRouter from './routers/ticket'
import userRouter from './routers/user'

const app = express()
//middleware
app.use(express.json())

// routers
app.use("/api", tripRouter)
app.use("/api", ticketRouter);
app.use("/api", userRouter);

export const viteNodeApp = app