// carController.js

import carListings from "../models/carModel.js";

export const createListingController = async (req, res) => {
  try {
    const listing = await carListings.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getListingController = async (req, res, next) => {
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

export const getAllListingsController = async (req, res, next) => {
  try {
    const listings = await carListings.find();
    return res.status(200).json(listings);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
