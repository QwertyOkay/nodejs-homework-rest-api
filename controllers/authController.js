const tokenCreater = require("../helpers/createToken");
const hashingPassword = require("../helpers/hashingPassword");
const RequestError = require("../helpers/RequestError");
const bcrypt = require("bcryptjs");

const { User } = require("../schemas/user");
const { SECRET_KEY } = process.env;

const registerController = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "Email in use");
  }
  const hashedPass = await hashingPassword(password);
  const result = await User.create({ name, email, password: hashedPass });
  res.status(201).json({ email: result.email, password: result.password });
};

const loginController = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const passCompare = await bcrypt.compare(password, user.password);

  if (!user || !passCompare) {
    throw RequestError(401, "Email or password is wrong");
  }

  const token = tokenCreater({ id: user._id }, SECRET_KEY);
  await User.findByIdAndUpdate(user._id, { token });
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      token,
    },
  });
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      user: {
        email,
        subscription,
      },
    },
  });
};

const logoutController = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });
  res.status(204).json("No Content");
};

const updateSubController = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;
  const user = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { runValidators: true }
  );
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      user: {
        email: user.email,
        subscription,
      },
    },
  });
};

module.exports = {
  registerController,
  loginController,
  getCurrent,
  logoutController,
  updateSubController,
};
