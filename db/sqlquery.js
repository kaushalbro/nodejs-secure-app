// const encrypt = require("../helpers/encrypt");
const enctypt = require("../helpers/encrypt");
const db = require("./db_config");
//gets data and forward
//this file get data from database:

//getting all data from specific table
exports.getall = (tableName) => {
  return new Promise((resolve, reject) => {
    const sql = "select * from ??";
    db.query(sql, [tableName], (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  });
};

//getting one data from specific table using where
exports.getbyOne = (tableName, fieldname, value) => {
  return new Promise((resolve, reject) => {
    const sql = "select * from ?? WHERE ?? = ?";
    db.query(sql, [tableName, fieldname, value], (error, result) => {
      if (error) {
        reject(
          "error while quering userbyone +++++++++++++++++++++++++++++++" +
            error
        );
      }
      resolve(result);
    });
  });
};

exports.insertIntoTable = (tableName, ...params) => {
  return new Promise((resolve, reject) => {
    sql = createInsertQuery(tableName, ...params);
    db.query(sql, [...params], (error, result) => {
      if (error) {
        reject("error while inserting new record...: \n" + error);
      } else {
        resolve(result);
      }
    });
  });
};

exports.isUser = (username) => {
  return new Promise((resolve, reject) => {
    this.getbyOne("users", "user_name", username)
      .then((result) => {
        if (result.length === 0) {
          //if there is no user return false
          resolve(false);
        } else {
          //if there is user return true
          resolve(true);
        }
        // reject("no user with user " + username + " found");
      })
      //if there is occur came while execurting the command or queruy reject with error
      .catch((error) => {
        reject(error);
      });
  });
};

exports.verifyUserNamePassword = (userName, rawPassword) => {
  return new Promise((resolve, reject) => {
    this.isUser(userName)
      .then((isUser) => {
        return isUser;
      })
      .then((isUser) => {
        if (isUser) {
          return this.getbyOne("users", "user_name", userName);
        } else {
          reject("Invalid username: " + userName + " No username found .....");
        }
      })
      .then((result) => {
        return enctypt.verify(rawPassword, result[0].password);
      })
      .then(() => {
        resolve(true);
      })
      .catch((error) => reject(error));
  });
};
// this.verifyUser(userName, (isUser) => {
//   if (isUser) {
//     this.getOne("users", "user_name", userName, (result) => {
//       //result comes like [{user_id: 41, user_name: '11kello', user_email: 'hello1@gmail.com',user_role: 'user' }]
//       // so, i want to extract password from first index i do link result[0].password
//       const encryptedDBPassword = result[0].password;
//       if (encrypt.verify(rawPassword, encryptedDBPassword)) {
//         isValidUser(true);
//       } else {
//         isValidUser(false);
//       }
//     });
//   } else {
//     isValidUser(false);
//   }
// });

//for insert query only
const createInsertQuery = (tableName, ...params) => {
  //first param always tableName
  var paramsLength = params.length;
  var halfParam = paramsLength / 2;
  var a = "";
  var b = "";
  //from first index of array to half index
  //beacuse half of the parameters are columnname and others are its value
  for (i = 0; i <= paramsLength - halfParam - 1; i++) {
    a = a + "??,";
    b = b + "?,";
  }
  //result comes like ??,??,??, we need to remove last character ,
  a = a.slice(0, -1);
  b = b.slice(0, -1);
  const sql =
    "INSERT INTO " + tableName + " (" + a + ")" + " VALUES " + "(" + b + ")";
  //if paramenters are not even then through error else proceed;
  if (paramsLength % 2 !== 0) {
    console.log(
      "insert column name and value note matched: one or many coulmn and value quntity not matched"
    );
  } else {
    return sql;
  }
};

//reject use case in pr
