// Status code email
const emailExists = { status: 409, message: 'User already registered' };

const invalidEmail = { status: 400, message: '"email" must be a valid email' };

const requiredEmail = { status: 400, message: '"email" is required' };

const emptyEmail = { status: 400, message: '"email" is not allowed to be empty' };

// Status code password

const requiredPassword = { status: 400, message: '"password" is required' };

const emptyPassword = { status: 400, message: '"password" is not allowed to be empty' };

const invalidPassword = {
  status: 400,
  message: '"password" length must be 6 characters long',
};

// Status code for token

const tokenNotFound = { status: 401, message: 'Token not found' };
const tokenInvalid = { status: 401, message: 'Expired or invalid token' };

// Status code for post

const titleRequired = { status: 400, message: '"title" is required' };
const contentRequired = { status: 400, message: '"content" is required' };
const categoryIdsRequired = { status: 400, message: '"categoryIds" is required' };
const categoryIdNotFound = { status: 400, message: '"categoryIds" not found' };

// Outhers Status code

const invalidEntries = { status: 400, message: 'Invalid fields' };

const userNotFound = { status: 404, message: 'User does not exist' };
const postNotFound = { status: 404, message: 'Post does not exist' };
const categoryIdCannotEdited = { status: 400, message: 'Categories cannot be edited' };

const invalidDisplayName = {
  status: 400,
  message: '"displayName" length must be at least 8 characters long',
};

module.exports = {
  emailExists,
  invalidEmail,
  requiredEmail,
  emptyEmail,
  requiredPassword,
  emptyPassword,
  invalidPassword,
  tokenNotFound,
  tokenInvalid,
  titleRequired,
  contentRequired,
  categoryIdsRequired,
  categoryIdNotFound,
  userNotFound,
  invalidEntries,
  categoryIdCannotEdited,
  postNotFound,
  invalidDisplayName,
};