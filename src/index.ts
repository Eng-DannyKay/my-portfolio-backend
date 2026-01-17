import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import cors from "cors";
import connectDB from "./config/mongo_db";
import router from "./routes/contact.routes";

const app = express();
const port = process.env.PORT || 3000;

const allowedOrigins = new Set([
  "http://localhost:5173",
  "https://danielforson.onrender.com",
]);

const corsOptions: cors.CorsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (!origin) return callback(null, true);

    if (allowedOrigins.has(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  maxAge: 86400,
};

app.use(cors(corsOptions));

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Server is running", status: "ok" });
});

app.use("/api/v1", router);

const errorHandler: ErrorRequestHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Error:", err);

  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({
      message: "CORS Error: Origin not allowed",
    });
  }

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