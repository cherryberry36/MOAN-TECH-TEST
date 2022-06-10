const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userSchema = require("../models/userModel")
const {
  validateSignupInput,
   validateLoginInput,
} = require("../utils/validation");


//creates a user
// @route api/users

const signUp = async (req, res) => {
  const { errors, isValid } = validateSignupInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { name, email, password } = req.body;

  try {
    //check if user has been prevuiously registered
    const existingUser = await userSchema.findOne({ email });

    if (existingUser)
      return res.status(404).json({
        message: "user already exists",
      });

    //hash password
    const hashPassword = await bcrypt.hash(password, 12);

    const user = await userSchema.create({
      email,
      password: hashPassword,
      name,
    });

    const payload = {
      email: user.email,
      id: user._id,
      name: user.name,
    };

    const token = jwt.sign(payload, process.env.SECRETKEY, { expiresIn: "1h" });

    res.status(200).json({
      success: true,
      token: "Bearer " + token,
      user: payload
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "something went wrong" });
  }
};

// authenticate a user
// @route api/users/login

const login = async (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { email, password } = req.body;

  try {
    // check if user exists
    const existingUser = await userSchema.findOne({ email});

    if (!existingUser)
      return res.status(404).json({
        message: "user doesn't exist",
      });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect)
      return res.status(404).json({
        message: "invalid password",
      });

    const payload = { id: existingUser._id, email: existingUser.email };

    const token = jwt.sign(payload, process.env.SECRETKEY, { expiresIn: "1h" });
    res.status(200).json({
      success: true,
      token: "Bearer " + token,
      user: payload
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "something  went wrong",
    });
  }
};
 module.exports ={signUp, login}