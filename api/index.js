import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import path from 'path';
import router from './routes/carRoutes.js';
import bodyParser from 'body-parser';

const __dirname = path.resolve();
const app = express();
const PORT = process.env.PORT || 3000;


const uri = "mongodb://127.0.0.1:27017/car_dealership?retryWrites=true&w=majority";

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

  app.use(bodyParser.json());
  app.use("/api/car", router);



// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
