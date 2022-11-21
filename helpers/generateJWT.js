const jwt = require('jsonwebtoken');

const generateJWT = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: '4h'
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject('No se pudo generar el Token');
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = {
  generateJWT
};
