const { Users } = require('../models');

const {
  emailExists,
  invalidEmail,
  requiredEmail,
  requiredPassword,
  invalidDisplayName,
  invalidPassword,
} = require('./statusCode');

const validateEmail = async (email) => {
  if (!email) throw requiredEmail;
  const emailRegex = /^[a-z0-9\-_]+@[a-z]+\.[a-z]{2,}$/;
  if (emailRegex.test(email) === false) throw invalidEmail;

  const ifEmailExists = await Users.findAll({
    attributes: ['email'],
    where: {
      email: `${email}`,
    },
  });

  if (ifEmailExists.length >= 1) throw emailExists;
};

const verifyUser = async (displayName, email, password) => {
  if (!password) throw requiredPassword;
  if (displayName.length <= 7) throw invalidDisplayName;
  if (password.length < 6) throw invalidPassword;
  
  await validateEmail(email);
};

module.exports = {
  verifyUser,
};
