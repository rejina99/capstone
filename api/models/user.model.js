import mongoose from "mongoose";

// schema

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required:true,
        unique: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },
    avatar:{
        type: String,
        default:"https://images.pexels.com/photos/11798029/pexels-photo-11798029.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"

    },
}, {timestamps: true });



// model

const User = mongoose.model('User', userSchema);

export default User;