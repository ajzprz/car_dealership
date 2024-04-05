// carController.js

import carListings from "../models/carModel.js";

class CarController{
  createListingController = async (req, res) => {
    try {
      console.log(req.body);
      const newCar =  new carListings(req.body);
      console.log(newCar);
     const savedCar = await newCar.save();
      return res.status(201).json(savedCar);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  getListingController = async (req, res, next) => {
    try {
      const listing = await carListings.findById(req.params.id);
      if (!listing) {
        return res.status(404).send("Listing not found");
      }
      return res.status(200).json(listing);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  getAllListingsController = async (req, res, next) => {
    try {
      const listings = await carListings.find();
      return res.status(200).json(listings);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };

}

const carController = new CarController();
export default carController;