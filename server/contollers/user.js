import bcrypt from 'bcryptjs'; // for encrypting user details e.g. passwords in the datbase
import jwt from 'jsonwebtoken'; // ensures a user stays signed in for some time

import User from '../models/user.js';

const secret = 'test';

// sign in controller
export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email }); // finding the old user by looking up their email in the database

        if(!existingUser) return res.status(404).json({ message: "User doesn't exist." });

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials." });

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, secret, { expiresIn: "1h" } ) // getting the user's jasonwebtoken that we need to send to the frontend

        res.status(200).json({ result: existingUser, token }); // returning the token
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.' });
    }
};

// sign up controller
export const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName  } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if(existingUser) return res.status(400).json({ message: "User already exist." });

        if(password !== confirmPassword) return res.status(400).json({ message: "Passwords don't match" });

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

        const token = jwt.sign({ email: result.email, id: result._id }, secret, { expiresIn: "1h" } ); // getting the user's jasonwebtoken that we need to send to the frontendresult     

        res.status(200).json({ result, token }); // returning the token

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.' });

        console.log(error);
    }
};