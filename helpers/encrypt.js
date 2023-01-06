const bcryptjs = require("bcryptjs");

//using sync method
exports.encode = (password) => {
  const salt = bcryptjs.genSaltSync(9);
  const hash = bcryptjs.hashSync(password, salt);
  return hash;
};

//using sync method
exports.verify = (rawpassword, hashedPasswordFromDB) => {
  return bcryptjs.compareSync(rawpassword, hashedPasswordFromDB);
};

// using async method
// bcryptjs.genSalt(11, (err, salt) => {
//     if (err) {
//       console.log("cannot salt password: error while salt password");
//     }`
//     bcryptjs.hash("password", salt, (err, encryptedhash) => {
//       if (err) {
//         console.log(
//           "cannot hash salted password: error while hashing password"
//         );
//       }
//       enPassword(encryptedhash);
//     });
//   });
