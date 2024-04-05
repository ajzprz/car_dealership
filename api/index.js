import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import path from 'path';
import carRouter from "./routes/carRoutes.js";

const __dirname = path.resolve();
const app = express();
const PORT = process.env.PORT || 3000;

// Connection URI for MongoDB (replace <username>, <password>, <clustername>, <dbname> with your MongoDB credentials)
const uri = "mongodb://localhost:27017/car_dealership?retryWrites=true&w=majority";

mongoose
  .connect(uri)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.log(error);
  });


  app.use(express.static(path.join(__dirname, "/client/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
  });

  app.use("/api/carListing/", carRouter);



// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
