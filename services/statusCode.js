const emailExists = { status: 409, message: 'User already registered' };
const invalidEntries = { status: 400, message: 'Invalid fields' };
const invalidEmail = { status: 400, message: '"email" must be a valid email' };
const requiredEmail = { status: 400, message: '"email" is required' };
const emptyEmail = { status: 400, message: '"email" is not allowed to be empty' };
const requiredPassword = { status: 400, message: '"password" is required' };
const emptyPassword = { status: 400, message: '"password" is not allowed to be empty' };
const invalidDisplayName = {
  status: 400,
  message: '"displayName" length must be at least 8 characters long',
};
const invalidPassword = {
  status: 400,
  message: '"password" length must be 6 characters long',
};

module.exports = {
  invalidDisplayName,
  emailExists,
  invalidEntries,
  invalidEmail,
  requiredEmail,
  emptyEmail,
  requiredPassword,
  emptyPassword,
  invalidPassword,
};