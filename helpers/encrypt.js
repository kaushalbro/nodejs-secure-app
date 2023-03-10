const bcryptjs = require("bcryptjs");

//using sync method
exports.encode = (password) => {
  return new Promise((resolve, reject) => {
    const salt = bcryptjs.genSaltSync(9);
    const hash = bcryptjs.hashSync(password, salt);
    resolve(hash);
    reject("can't encrypt password..");
  });
};

//using sync method
exports.verify = (rawpassword, hashedPasswordFromDB) => {
  return new Promise((resolve, reject) => {
    if (bcryptjs.compareSync(rawpassword, hashedPasswordFromDB)) {
      resolve(true);
    } else {
      reject("password does not matched...");
    }
  });
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
