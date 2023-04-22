const bcryptjs = require("bcryptjs");

exports.encode = (password) => {
  const salt = bcryptjs.genSaltSync(9);
  const hash = bcryptjs.hashSync(password, salt);
  return hash;
};
exports.verify = (rawPassword, hashedPasswordFromDB) => {
  return bcryptjs.compareSync(rawPassword, hashedPasswordFromDB);
};
