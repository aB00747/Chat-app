const User = require("../Model/User");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
    const jwtKey = process.env.JWT_SCERET_KEY;

    // jwt check out (https://jwt.io/)
    return jwt.sign({ _id }, jwtKey, { expiresIn: "3d" })  // 3d - 3 days to expired
};

const registerUser = async (req, res) => {
    // res.send("Register CONTROLLER")
    try {

        const { name, email, password } = req.body;

        let user = await User.findOne({ email });

        if (user) return res.status(400).send({ error: "user with given already exist !" });

        if (!name || !email || !password) return res.status(400).send({ error: 'Please provide all fields' });

        if (!validator.isEmail(email)) return res.status(400).send({ error: "Email must be valid !" });

        if (!validator.isStrongPassword(password)) return res.status(400).send({ error: "Password must be strong !!" })

        user = new User({ name, email, password });

        const salt = await bcrypt.genSalt(10); // encrypt the password.
        user.password = await bcrypt.hash(password, salt);  // store hashed password in our database not original password 10 is a good number for security.
        await user.save();

        const token = createToken(user.id);

        res.status(200).json({ _id: user.id, name, email, token })

    } catch (error) {

        console.log(error);
        res.status(500).json(error)

    }
};

module.exports = { registerUser };