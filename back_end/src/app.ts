import express from 'express'
import tripRouter from './routers/trip'
import ticketRouter from './routers/ticket'
import userRouter from './routers/user'
import cors from "cors";

const app = express()
//middleware
app.use(
  cors({
    origin: "http://localhost:4200",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json())

// routers
app.use("/api", tripRouter)
app.use("/api", ticketRouter);
app.use("/api", userRouter);

export const viteNodeApp = app