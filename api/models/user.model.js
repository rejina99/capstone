import mongoose from "mongoose";



// schema

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        require:true,
        unique: true,
    },

    email: {
        type: String,
        require: true,
        unique: true,
    },

    password: {
        type: String,
        require: true,
    },
    avatar : {
        type: String,
        default: "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"

    }
}, {timestamps: true });



// model

const User = mongoose.model('User', userSchema);

export default User;