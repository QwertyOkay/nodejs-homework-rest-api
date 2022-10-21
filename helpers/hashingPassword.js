const bcrypt = require("bcryptjs");

const hashingPassword = async (password) => {
  const hashPass = await bcrypt.hash(password, 10);
  return hashPass;
};
module.exports = hashingPassword;
