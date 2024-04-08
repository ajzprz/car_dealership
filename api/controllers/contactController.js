import Contact from "../models/contactModel.js";

const contactUs = async(req,res)=>{
    try {
        const response = req.body;
        await Contact.create(response);
        res.status(200).json({message:"Message sent successfully"});
    } catch (error) {
        res.status(500).json("Error occured while sending message", error)
    }
}

export default contactUs;