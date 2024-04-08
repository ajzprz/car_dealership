import Customer from "../models/userModel.js";
import bcrypt from "bcrypt";

class CustomerController {
  home = async (req, res) => {
    try {
      res.status(200).json("Home page using controller.");
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  // registration logic
  register = async (req, res) => {
    try {
      const { username, phone, email, password } = req.body;
      const userExists = await Customer.findOne({ email });
      if (userExists) {
        return res.status(400).json({ msg: "Email already exists" });
      }

      const userCreated = await Customer.create({
        username,
        phone,
        email,
        password,
      });
      res.status(201).json({
        message: "Registration successful",
        token: await userCreated.generateToken(),
        userId: userCreated._id.toString(),
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  // login logic
  login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const userExists = await Customer.findOne({ email });
      if (!userExists) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const isPasswordValid = await userExists.comparePassword(password);
      if (isPasswordValid) {
        res.status(200).json({
          message: "Login successful",
          token: await userExists.generateToken(),
          userId: userExists._id.toString(),
        });
      } else {
        res.status(401).json("Email or password invalid");
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
}

const customerController = new CustomerController();

export default customerController;
