const gravatar = require("gravatar");

const createAvatar = (email) => {
  const avatar = gravatar.url(email);
  return avatar;
};

module.exports = createAvatar;
