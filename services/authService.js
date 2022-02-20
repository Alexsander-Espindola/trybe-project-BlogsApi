const jwt = require('jsonwebtoken');
require('dotenv').config();
// const API_SECRET = 'ABC123456';

const JWT_CONFIG = {
  expiresIn: 360000,
  algorithm: 'HS256',
};

const genToken = (data) => jwt.sign({ data }, process.env.JWT_SECRET, JWT_CONFIG);

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { data } = decoded;

    return data;
  } catch (error) {
    console.log('FALHA NA VERIFICAÇÃO');
    return null;
  }
};

module.exports = {
  genToken,
  verifyToken,
}; 