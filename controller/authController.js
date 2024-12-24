const bcrypt = require('bcrypt');
const User = require('../models/user');
const comparePassword = require('../helpers/auth').comparePassword;

const test = (req, res) => {
    res.json('test is working');
};

const registerUser = async (req, res) => {
    try {
        const { username, email, password, confirmpassword} = req.body;

        if (!username || !email || !password || !confirmpassword ) {
            return res.json({
                error: 'All fields are required',
            });
        }

        if (password.length < 6) {
            return res.json({
                error: 'Password  should be at least 6 characters long',
            });
        }

        if (password !== confirmpassword) {
            return res.json({
                error: "Passwords don't match",
            });
        }

        const exist = await User.findOne({ email });

        if (exist) {
            return res.json({
                error: 'Email is already taken',
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        
        });

        return res.json(user);
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'An error occurred during registration',
        });
    }
};



const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            console.log('User not found:', email);
            return res.json({
                error: 'No user found',
            });
        }

        const isPasswordMatch = await comparePassword(password, user.password);

        if (isPasswordMatch) {
            const token = await user.generateAuthToken();
            console.log(token);

            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 2589200000),
                httpOnly: true
            });

            console.log('Login successful for:', email);
            return res.json({
                message: 'Login successful',
                token,
            });

        } else {
            console.log('Incorrect password for:', email);
            return res.json({
                error: 'Incorrect password',
            });
        }
    } catch (error) {
        console.log('Error during login:', error);
        return res.json({
            error: 'An error occurred during login',
        });
    }
};


module.exports = {
    test,
    registerUser,
    loginUser,

};