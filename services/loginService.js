const { Users } = require('../models');
const {
  invalidEntries,
  requiredEmail,
  emptyEmail,
  requiredPassword,
  emptyPassword,
} = require('./statusCode');

const getEmail = async (email) => {
  const findEmail = await Users.findAll({
    attributes: ['email', 'password'],
    where: {
      email: `${email}`,
    },
  });

  return findEmail[0];
};

const validateEmail = async (email) => {
  if (email === '') throw emptyEmail;

  const findEmail = await getEmail(email);

  if (!findEmail) throw invalidEntries;
};

const validatePassword = async (email, password) => {
  if (password === '') throw emptyPassword;

  const { password: passwordDB } = await getEmail(email);

  if (password !== passwordDB) throw invalidEntries;
};

const verifyLogin = async (email, password) => {
  if (!email && email !== '') throw requiredEmail;
  if (!password && password !== '') throw requiredPassword;

  await validateEmail(email);
  await validatePassword(email, password);
};

module.exports = {
  verifyLogin,
};
