// Schema for admin
const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    // Add more fields as needed for admin profile
});

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;