import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express from "express";
import connectDB from "./config/mongo_db";
import router from "./routes/contact.routes";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Server is running', status: 'ok' });
});

app.use("/api/v1", router);

app.use((err: express.ErrorRequestHandler, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ 
    message: 'Internal Server Error', 
    error: process.env.NODE_ENV === 'production' ? 'Something went wrong' : String(err)
  });
});

const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`🚀 Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();