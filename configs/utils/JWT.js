const jwt = require("jsonwebtoken");
const dotenv = require("../dotenv_config");

exports.createAccessToken = (user) => {
  return new Promise((resolve, reject) => {
    const access_token = jwt.sign(
      {
        user_id: user.user_id,
        username: user.user_name,
        user_level: user.user_level,
      },
      dotenv.access_token_key,
      {
        expiresIn: "150m",
      }
    );
    if (!access_token) {
      reject("cannot create access token");
    }
    resolve(access_token);
  });
};

exports.createRefereshToken = (user) => {
  return new Promise((resolve, reject) => {
    const referesh_token = jwt.sign(
      {
        user_id: user.user_id,
        username: user.user_name,
        user_level: user.user_level,
      },
      dotenv.referesh_token_key,
      {
        expiresIn: "1550m",
      }
    );
    if (!referesh_token) {
      reject("cannot create access token");
    }
    resolve(referesh_token);
  });
};

exports.createEmailVerifyToken = (email) => {
  return new Promise((resolve, reject) => {
    const token = jwt.sign(
      {
        email: email,
      },
      dotenv.email_verification_key,
      {
        expiresIn: "7d",
      }
    );
    if (!token) {
      reject("cannot create access token");
    }
    resolve(token);
  });
};

exports.verifyEmailToken = (token) => {
  try {
    const decode = jwt.verify(token, dotenv.email_verification_key);
    const email = decode.email;
    return [true, email];
  } catch (error) {
    return false;
  }
};
