import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowerCase: true,
        match: /\S+@\S+\.\S+/,
        index: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
});

export default mongoose.model('User', userSchema);