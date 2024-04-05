import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
    make: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    kms: {
        type: Number,
        required: true
    },
    vin: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    images: {
        type: [String],
        validate: [imagesLimit, 'Up to four images are allowed']
    }
});

function imagesLimit(val) {
    return val.length <= 4;
}

const carListings = mongoose.model('Car', carSchema);

export default carListings;