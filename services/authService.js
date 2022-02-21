const jwt = require('jsonwebtoken');
require('dotenv').config();
const {
  tokenNotFound,
  tokenInvalid,
} = require('./statusCode');

const JWT_CONFIG = {
  expiresIn: 360000,
  algorithm: 'HS256',
};

const genToken = (data) => jwt.sign({ data }, process.env.JWT_SECRET, JWT_CONFIG);

const verifyToken = (token) => {
  if (!token) throw tokenNotFound;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { data } = decoded;
    if (!data) throw tokenInvalid;

    return data;
  } catch (error) {
    console.error(error.message);
    throw tokenInvalid;
  }
};

module.exports = {
  genToken,
  verifyToken,
}; 