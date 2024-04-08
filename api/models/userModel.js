// require("dotenv").config();
import bcrypt  from "bcrypt";
import { mongoose } from 'mongoose';
import moongose from 'mongoose';
import jwt from "jsonwebtoken";

const customerSchema = new moongose.Schema({
    username:{
        type:String,
        require:true
    },
    phone:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
});

// pre method to secure the password

customerSchema.pre("save", async function(next){
    const user = this;
    if(!user.isModified('password')){
        next();
    }
    try {
        const saltRound = await bcrypt.genSalt(10);
        const hashed_password = await bcrypt.hash(user.password,saltRound);
        user.password = hashed_password;
        
    } catch (error) {
        next(error)
    }
})

// logic for comparing password
customerSchema.methods.comparePassword = async function(password){
    return bcrypt.compare(password,this.password);
}

// json web token
customerSchema.methods.generateToken = async function(){
    try {
        //payload
        return jwt.sign({
            userId:this._id.toString(),
            email:this.email,
            isAdmin:this.isAdmin
        },
        // signature this must be secured
        process.env.SECRET_KEY,
        {
            expiresIn:"30d",
        }
        )
    } catch (error) {
        console.error(error);
    }
}

// define the model or the collection name

const Customer = new mongoose.model("Customer", customerSchema);

export default Customer;