import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import connectDB from "./config/mongo_db";
import router from "./routes/contact.routes";

const app = express();
const port = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Server is running", status: "ok" });
});

app.use("/api/v1", router);

const errorHandler: ErrorRequestHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Error:", err);
  res.status(500).json({
    message: "Internal Server Error",
    error: process.env.NODE_ENV === "production" ? "Something went wrong" : err.message,
  });
};

app.use(errorHandler);

const startServer = async (): Promise<void> => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`🚀 Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();