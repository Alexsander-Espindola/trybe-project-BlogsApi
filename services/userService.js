const { Users } = require('../models');

const emailExists = { status: 409, message: 'Email already registered' };
const invalidEntries = { status: 400, message: 'Invalid entries. Try again.' };
const invalidEmail = { status: 400, message: '"email" must be a valid email' };
const requiredEmail = { status: 400, message: '"email" is required' };
const requiredPassword = { status: 400, message: '"password" is required' };
const invalidDisplayName = {
  status: 400,
  message: '"displayName" length must be at least 8 characters long',
};
const invalidPassword = {
  status: 400,
  message: '"password" length must be 6 characters long',
  
};

// --------------- Verificação do usuário -----------------

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
