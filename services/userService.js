const { Users } = require('../models');
const authService = require('./authService');

const {
  emailExists,
  invalidEmail,
  requiredEmail,
  requiredPassword,
  invalidPassword,
  invalidDisplayName,
  tokenNotFound,
  tokenInvalid,
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

const verifyToken = (authorization) => {
  if (!authorization) throw tokenNotFound;
  const ifTokenValid = authService.verifyToken(authorization);
  if (!ifTokenValid) throw tokenInvalid;
};

module.exports = {
  verifyUser,
  verifyToken,
};
