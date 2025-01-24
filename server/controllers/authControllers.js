const User = require('../models/User');

const test = (req, res) => {
    res.json({ message: 'test is working' });
};

const signupUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        // Check if username enter
        if (!username) {
            return res.json({ error: 'Username is required' });
        }

        // Check email
        const exist = await User.findOne({ email });
        if (exist) {
            return res.json({ error: 'Email is taken' });
        }

        // Check if password is valid
        if (!password || password.length < 6) {
            return res.json({ error: 'Password is required and should be 6 characters long' });
        }
        
        const user = await User.create({
            username,
            email,
            password
        });

        return res.json(user);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    test,
    signupUser
};