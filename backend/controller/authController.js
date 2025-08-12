const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');


//regisster user controller
const register = async (req, res) => {
    const { username, password, role } = req.body;

    // Basic validation
    if (!username || !password || !role) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Check if user exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const hashedpassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedpassword, role });

        await newUser.save();
        
        res.status(201).json({
            success: true,
            message: `User registered successfully`,
            data: {
                id: newUser._id,
                username: newUser.username,
                role: newUser.role
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during registration',
            
        });
    }
}

//login user controller
const login = async (req, res) => {

    try {

        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: `User not found with ${username}` });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                username: user.username,
                role: user.role
            }
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error logging in',
            error: error.message
        });

    }


}

module.exports = {
    register,
    login
};