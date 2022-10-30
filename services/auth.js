const { User } = require("../schemas/user");

const createUser = async (name, email, password, avatarURL) => {
  const user = User.create({ name, email, password, avatarURL });
  return user;
};

const userSearch = async (email) => {
  const data = await User.findOne({ email });
  return data;
};

const signup = async (id, token) => {
  const data = await User.findByIdAndUpdate(id, token);
  return data;
};

const logout = async (id, token) => {
  const data = await User.findByIdAndUpdate(id, token);
  return data;
};

const updateStatus = async (id, status) => {
  const data = await User.findByIdAndUpdate(id, status);
  return data;
};

const updateUserAvatar = async (id, avatarURL) => {
  const data = User.findByIdAndUpdate(id, avatarURL);
  return data;
};

const searchVerificationToken = async (verifyToken) => {
  const data = await User.findOne(verifyToken);
  return data;
};

const updateVerify = async (id, verify, verificationToken) => {
  const data = await User.findByIdAndUpdate(id, verify, verificationToken);
  return data;
};
module.exports = {
  userSearch,
  createUser,
  signup,
  logout,
  updateStatus,
  updateUserAvatar,
  searchVerificationToken,
  updateVerify,
};
