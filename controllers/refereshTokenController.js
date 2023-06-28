const jwt = require("jsonwebtoken");
const dotenv = require("../configs/dotenv_config");
const accessToken = require("../configs/utils/JWT");

exports.refereshToken = async (req, res) => {
  //verify referesh token
  // console.log("this is cookie registered " + req.cookies.jwt);
  // const cookie_referesh_token=req.cookies.jwt;
  const cookie_referesh_token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo0LCJ1c2VybmFtZSI6ImthdXNoYWwiLCJ1c2VyX2xldmVsIjowLCJpYXQiOjE2ODA2Njc1MDAsImV4cCI6MTY4MDc2MDUwMH0.eBLKj1QEneQJqyD14eHkWiRdSlUG_KsJLBoRqaf1kOc";
  if (cookie_referesh_token === " " || cookie_referesh_token === undefined) {
    return res.send("Unauthorized");
  }
  try {
    const decoded_user = await jwt.verify(
      cookie_referesh_token,
      dotenv.referesh_token_key
    );
    const new_access_token = await accessToken.createAccessToken(decoded_user);
    return res.status(201).json({ access_token: new_access_token });
  } catch (error) {
    return res.send(error);
  }
};
