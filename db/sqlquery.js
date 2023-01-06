const encrypt = require("../helpers/encrypt");
const db = require("./db_config");
//gets data and forward
//this file get data from database:

//getting all data from specific table
exports.getall = (tableName, tableData) => {
  // const sql = "select * from ??";
  // db.query(sql, [tableName], (error, result) => {
  //   if (error) {
  //     console.log(error);
  //   }
  //   tableData(result);
  // });

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
exports.getOne = (tableName, columnName, value, indivisualResult) => {
  const sql = "select * from ?? where ?? =?";
  db.query(sql, [tableName, columnName, value], (error, result) => {
    if (error) {
      console.log(error);
    }
    indivisualResult(result);
  });
};

exports.insertIntoTable = (tableName, ...params) => {
  sql = insertQuery(tableName, ...params);
  db.query(sql, [...params], (error) => {
    if (error) {
      console.log(error);
    }
    isInserted = true;
    console.log("user registered");
  });
};

//for insert query only
const insertQuery = (tableName, ...params) => {
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
    "insert into " + tableName + " (" + a + ")" + " values " + "(" + b + ")";
  //if paramenters are not even then through error else proceed;
  if (paramsLength % 2 !== 0) {
    console.log(
      "insert column name and value note matched: one or many coulmn and value quntity not matched"
    );
  }
  return sql;
};

exports.verifyUser = (userName, isUser) => {
  this.getOne("users", "user_name", userName, (result) => {
    if (result.length > 0) {
      isUser(true);
    } else {
      console.log("user Not Found");
      isUser(false);
    }
  });
};

exports.verifyUserNamePassword = (userName, rawPassword, isValidUser) => {
  this.verifyUser(userName, (isUser) => {
    if (isUser) {
      this.getOne("users", "user_name", userName, (result) => {
        //result comes like [{user_id: 41, user_name: '11kello', user_email: 'hello1@gmail.com',user_role: 'user' }]
        // so, i want to extract password from first index i do link result[0].password
        const encryptedDBPassword = result[0].password;
        if (encrypt.verify(rawPassword, encryptedDBPassword)) {
          isValidUser(true);
        } else {
          isValidUser(false);
        }
      });
    } else {
      isValidUser(false);
    }
  });
};
