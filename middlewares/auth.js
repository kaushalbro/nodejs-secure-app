const dotenv = require("../configs/dotenv_config");
const jwt = require("jsonwebtoken");

exports.verifyAccessToken = (req, res, next) => {
  const bearer_token = req.cookies.access_token;
  if (!bearer_token) {
    return res
      .status(403)
      .json({ message: "Access denied No access token provided" });
  }
  const token = bearer_token.split(" ")[1];
  try {
    // Verify token
    const decoded = jwt.verify(token, dotenv.access_token_key);
    req.token_user = decoded;
    next();
  } catch (err) {
    res
      .cookie("refresh_token", "", {
        secure: true,
        path: "/",
        httpOnly: true,
        hostOnly: true,
        sameSite: false,
        maxAge: 1,
      })
      .cookie("access_token", "", {
        secure: true,
        path: "/",
        httpOnly: true,
        hostOnly: true,
        sameSite: false,
        maxAge: 1,
      });
    return res.status(403).json({ message: "Token invalid" });
  }
};
