// carController.js

import carListings from "../models/carModel.js";

// carating CarController class
class CarController {
  // function to add car
  createListingController = async (req, res) => {
    try {
      const newCar = new carListings(req.body);
      const savedCar = await newCar.save();
      return res.status(201).json(savedCar);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };

  //function to get one car at a time
  getListingController = async (req, res, next) => {
    try {
      const vin = req.params.vin;
      const listing = await carListings.findOne({ vin });
      if (!listing) {
        return res.status(404).send("Car not found");
      }
      return res.status(200).json(listing);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };

  // function to get all the available cars
  getAllListingsController = async (req, res, next) => {
    try {
      console.log("Got till here");
      const listings = await carListings.find();
      return res.status(200).json(listings);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };

  // update function
  updateListingController = async (req, res) => {
    try {
      const vin = req.params.vin;
      const listing = await carListings.findOne({ vin });
      if (!listing) {
        return res.status(404).send("Car not found");
      }
      const { make, model, year, color, kms, price } = req.body;
      listing.make = make;
      listing.model = model;
      listing.year = year;
      listing.color = color;
      listing.kms = kms;
      listing.vin = vin;
      listing.price = price;
      const newCar = new carListings(req.body);

      try {
        const updatedCar = await listing.save();
        console.log(updatedCar);
        return res.status(201).json("Car info updated successfully");
      } catch (error) {
        return console.error("Error occured while updating", error);
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };


  // method to delete the car from the database
  deleteListingController = async (req, res, next) => {
    try {
      const vin = req.params.vin;
      const listing = await carListings.findOne({ vin });
      if (!listing) {
        return res.status(404).send("Car not found");
      }
      try {
        const deletedCar = await carListings.findByIdAndDelete(listing._id);
        res.status(200).json("Car deleted successfully");
      } catch (error) {
        return res.status(500).json("Error while deleting ", error)
      }
      

    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };

}

const carController = new CarController();
export default carController;
