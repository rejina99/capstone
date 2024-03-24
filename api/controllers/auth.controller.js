import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';
// import jwt from 'jsonwebtoken';


export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });



    try {
        await newUser.save();
        res.status(201).json("User created succesfully");
    }
    catch (error) {
        next(errorHandler(450, "Error for the same name..."));
    }
};



//Sign in LOGIC


// next to use middleware and handling error
export const signin = async (req, res, next) => {
    const {email, password } = req.body;

    try {
        // await because it takes time to check email in database by mongoose
        const validUser = await User.findOne({email});

        if(!validUser) 
        {
            return next(errorHandler(404, 'USER NOT FOUND...'));
            
        }

        // in real world scenario many users frequently sigin thats why .compare is recommended and comparesync not
        const validPassword = bcryptjs.compareSync(password, validUser.password);
            
        if(!validPassword)
        {
            return next(errorHandler(401, 'PASSWORD IS NOT CORRECT...'));


        }

        const token = jwt.sign({ id : validUser._id}, process.env.JWT_SECRET);
  
        const {password: pass, ...rest } = validUser._doc;

        res.cookie('access_token', token, {httpOnly: true}).status(202).json(validUser);

        // res.json({ token });


        console.log(`Successful sign-in for user with email: ${email}`);

    } catch (error) { 
        next(error);
    }
}


export const google = async (req, res, next) => {
  try {
    
    const user = await User.findOne({email: req.body.email})

    if(user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;

      res
      .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);

    }
    else{
      const generatedPassword =
      Math.random().toString(36).slice(-8) +
      Math.random().toString(36).slice(-8);
    const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
    const newUser = new User({
      username:
        req.body.name.split(' ').join('').toLowerCase() +
        Math.random().toString(36).slice(-4),
      email: req.body.email,
      password: hashedPassword,
      avatar: req.body.photo,

    });
    await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    }


  } catch (error) {
    next(error)
  }
}


// signout

export const signOut = async (req, res, next) => {
  try {
    // Clear the access token cookie
    res.clearCookie('access_token', {
      
      path: '/', // Specify the path where the cookie is valid
      httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
      secure: true, // Only send the cookie over HTTPS
    });

    // Send a JSON response indicating successful logout
    res.status(200).json({ message: 'User has been logged out successfully.' });
  } catch (error) {
    // Pass any errors to the error handling middleware
    next(error);
  }
};



// for prevent brut force attack in siginn api

/*

npm install express-rate-limit




import rateLimit from 'express-rate-limit';

// Define a rate limiter middleware
const signInLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: 'Too many sign-in attempts. Please try again later.',
});

export const signin = async (req, res, next) => {
  // Apply rate limiting
  signInLimiter(req, res, async (err) => {
    if (err) {
      return next(err);
    }

    const { email, password } = req.body;

    try {
      const validUser = await User.findOne({ email });

      if (!validUser) {
        // Implement account lockout logic here
        // Increase a counter in the database for unsuccessful attempts
        // Check the counter and lock the account if it exceeds a threshold
        // Reset the counter after a successful login
        // Example: validUser.failedLoginAttempts++
        // Implement your own logic based on your requirements

        return next(errorHandler(404, 'USER NOT FOUND...'));
      }

      const validPassword = await bcryptjs.compare(password, validUser.password);

      if (!validPassword) {
        // Implement account lockout logic here as well

        return next(errorHandler(401, 'PASSWORD IS NOT CORRECT...'));
      }

      // Reset the failed login attempts counter on successful login
      // Example: validUser.failedLoginAttempts = 0;

      const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
      res.cookie('access_token', token, { httpOnly: true }).status(202).json(validUser);
    } catch (error) {
      next(error);
    }
  });
};



*/




// for different case in for loop
/*
export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    let validUser = await User.findOne({ email });

    if (!validUser) {
      // Implement account lockout logic here
      // Increase a counter in the database for unsuccessful attempts
      // Check the counter and lock the account if it exceeds a threshold
      // Reset the counter after a successful login

      // Example logic:
      if (!validUser.failedLoginAttempts) {
        validUser.failedLoginAttempts = 1;
      } else {
        validUser.failedLoginAttempts++;

        if (validUser.failedLoginAttempts >= 3) {
          // Lock the account
          validUser.isLocked = true;
          // You might want to store the lock timestamp for additional security
          validUser.lockedAt = new Date();
        }
      }

      await validUser.save();

      return next(errorHandler(404, 'USER NOT FOUND...'));
    }

    // Check if the account is locked
    if (validUser.isLocked) {
      const timeElapsed = new Date() - validUser.lockedAt;
      const minutesSinceLock = Math.floor(timeElapsed / (1000 * 60));

      // Example: Lock the account for 15 minutes
      if (minutesSinceLock < 15) {
        return next(errorHandler(401, 'Account is locked. Try again later.'));
      }

      // Unlock the account after the lockout period
      validUser.isLocked = false;
      validUser.failedLoginAttempts = 0;
      await validUser.save();
    }

    const validPassword = await bcryptjs.compare(password, validUser.password);

    if (!validPassword) {
      // Increment failed login attempts if the password is incorrect
      validUser.failedLoginAttempts++;
      await validUser.save();

      return next(errorHandler(401, 'PASSWORD IS NOT CORRECT...'));
    }

    // Reset the failed login attempts counter on successful login
    validUser.failedLoginAttempts = 0;
    await validUser.save();

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    res.cookie('access_token', token, { httpOnly: true }).status(202).json(validUser);
  } catch (error) {
    next(error);
  }
};



*/ 
// 
