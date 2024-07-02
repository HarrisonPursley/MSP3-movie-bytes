import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


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

// Password encryption
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
    }
    next();
});


// Generates JWT Token using user's info
userSchema.methods.generateJWT = function() {
    return jwt.sign({
        id: this._id,
        email: this.email
    }, process.env.JWT_SECRET, {expiresIn: '24h'});
}


export default mongoose.model('User', userSchema);