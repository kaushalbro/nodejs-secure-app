const { verifyEmailToken } = require("../configs/utils/JWT");
const { query } = require("../db/sqlquery");
exports.getVeificationLink = async (req, res) => {
  const token = req.params.token;
  const isVerified = verifyEmailToken(token);
  const email = isVerified[1];
  // return;
  if (isVerified[0]) {
    const update = await query(
      "update subscribers set verified = ? where email = ?",
      [true, email]
    );
    if (update.affectedRows === 1) {
      return res
        .status(200)
        .json("Email is verified: Thank you for subscribing us:");
    }
  }
  return res.status(200).json("Verification faild: link expired or uneless");
};
