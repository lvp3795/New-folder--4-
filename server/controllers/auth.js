const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");

const register = async (req, res) => {
  try {
    const user = await User.create({ ...req.body });
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
  } catch (error) {
    if (error.code === 11000) {
      res.send({ msg: `Duplicate email ${error.keyValue.email}` });
    }
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new Error("Please provide email and password");
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.send({ msg: `No user with email: ${email}` });
    return;
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    res.send({ msg: `Incorrect Password ${password}` });
  }

  const token = user.createJWT();
  res
    .status(StatusCodes.OK)
    .json({ user: { name: user.name, role: user.role }, token });
};

const upload = (req, res) => {
  if (res.file) {
    console.log(res.file);
  }
  res.send({ msg: "upload success" });
};

module.exports = { login, register, upload };
