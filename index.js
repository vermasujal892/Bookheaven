import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const URI = process.env.MongoDb_URI;

// Connect to MongoDB
mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error(`Error connecting to MongoDB: ${err.message}`);
});

mongoose.connection.on('disconnected', () => {
  console.log('Disconnected from MongoDB');
});

// Running routes
app.use("/book", bookRoute);
app.use("/user", userRoute);

// Start server only after MongoDB connection is successful
mongoose.connection.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
