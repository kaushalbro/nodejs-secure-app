const db = require("../db/sqlquery");
const encrypt = require("../helpers/encrypt");

exports.All = () => {
  return db.getall("users");
};

exports.oneByID = (userID) => {
  return db.getWhere("users", "user_id", userID);
};

exports.updateUser = (UID, body) => {
  const updated = db.updateOneWhereClause("users", "user_id", UID, body);
  return updated;
};
exports.deleteUser = (UID) => {
  return db.deleteByOne("users", "user_id", UID);
};

exports.create = async (user) => {
  // "INSERT INTO " + tableName + " (" + a + ")" + " VALUES " + "(" + b + ")";
  const registered = [];
  const isUserExist_ = await this.isUser("user_name", user[0]);
  if (isUserExist_[0]) {
    registered.push(
      "Account already registered this Username login or try another"
    );
  }
  const isUserExist__ = await this.isUser("user_email", user[1]);
  if (isUserExist__[0]) {
    registered.push(
      "Account already registered this email login or try another"
    );
  }
  if (registered.length !== 0) {
    return registered;
  }
  //encrypting user password
  user[2] = encrypt.encode(user[2]);
  return db.query(
    "INSERT INTO users (user_name, user_email, password) values (?)",
    [user]
  );
};

exports.verifyUserPassword = async (userName, rawPassword) => {
  try {
    const user = await this.isUser("user_name", userName);
    // console.log(user[1][0].account_status);
    if (user.length === 0) {
      return (
        "user account invalid: " + `"` + userName + `"` + " does not exit."
      );
    }
    // console.log(user[0].account_status);

    if (user[0].account_status !== "active") {
      return "This user Account is deactivated or inactive: contact admin.";
    }
    const validPassword = encrypt.verify(rawPassword, user[0].password);
    if (!validPassword) {
      return (
        "user credential invalid: " +
        userName +
        "'s password does not match, try again..."
      );
    }
    return user[0];
  } catch (error) {
    return error;
  }
};
exports.isUser = (clo_name, col_val) => {
  return new Promise((resolve, reject) => {
    db.getWhere("users", clo_name, col_val)
      .then((result) => {
        if (result.length === 0) {
          resolve(result);
        } else {
          resolve(result);
        }
      })
      //if there is occur came while execurting the command or queruy reject with error
      .catch((error) => {
        reject(error);
      });
  });
};
