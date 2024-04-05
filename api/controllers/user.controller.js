import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
import Listing from '../models/listing.model.js';

export const test = (req, res) => {
    res.json({
        message: 'Api route is working!',
    });
};

export const getUserListings = async (req, res, next) => {
    const userId = req.user.id;
    const requestedUserId = req.params.id;

    if (userId === requestedUserId) {
        try {
            const listings = await Listing.find({ userRef: userId });
            res.status(200).json(listings);
        } catch (error) {
            next(error);
        }
    } else {
        return next(errorHandler(401, 'You can only view your own listings!'));
    }
};


// User Functionality 
// 1. Update


export const updateUser = async (req, res, next) => {
    
        if (req.user.id !== req.params.id)
            return next(errorHandler(401, "You are not authenticated...."));
        try{
            if (req.body.password) {
                req.body.password = bcryptjs.hashSync(req.body.password, 10);
            }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar,
            },
        }, {
            new: true
        });

        const{password, ...rest} = updatedUser._doc;

        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
};

// 2. Delete
export const deleteUser = async (req, res, next) => {
    
    if(req.user.id !== req.params.id)
    {
        return(errorHandler(401, 'You can only delete your own account...'));

    }
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json({message: "User has been deleted..."})


    }
    catch(error)
    {
        next(error.message);
    }

}








// 
export const getUser = async (req, res, next) => {
  try {
    
    const user = await User.findById(req.params.id);
  
    if (!user) return next(errorHandler(404, 'User not found!'));
  
    const { password: pass, ...rest } = user._doc;
  
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
