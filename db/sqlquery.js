const db = require("./db_config");
//gets data and forward
//this file get data from database:

exports.query = (sqlQuery, fields) => {
  return new Promise((resolve, reject) => {
    db.query(sqlQuery, fields, (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  });
};

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
exports.getWhere = (tableName, fieldname, value) => {
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
exports.insertOnenewMethod = (tableName, ...params) => {
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO " + tableName + "";

    db.query(sql, [...params], (error, result) => {
      if (error) {
        reject("error while inserting new record...: \n" + error);
      } else {
        resolve(result);
      }
    });
  });
};

exports.insertOne = (tableName, ...params) => {
  return new Promise((resolve, reject) => {
    const sql = createInsertQuery(tableName, ...params);
    db.query(sql, [...params], (error, result) => {
      if (error) {
        reject("error while inserting new record...: \n" + error);
      } else {
        resolve(result);
      }
    });
  });
};
exports.insertOne1 = (tableName, ...params) => {
  return new Promise((resolve, reject) => {
    const sql = createInsertQuery(tableName, ...params);
    db.query(sql, [...params], (error, result) => {
      if (error) {
        reject("error while inserting new record...: \n" + error);
      } else {
        resolve(result);
      }
    });
  });
};

exports.deleteByOne = (tableName, fieldname, value) => {
  return new Promise((resolve, reject) => {
    const sql = "delete from ?? WHERE ?? = ?";
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

exports.deleteByOneTwoConditions = (
  tableName,
  fieldname1,
  value1,
  fieldname2,
  value2
) => {
  return new Promise((resolve, reject) => {
    const sql = "delete from ?? WHERE ?? = ? AND ?? = ?";
    db.query(
      sql,
      [tableName, fieldname1, value1, fieldname2, value2],
      (error, result) => {
        if (error) {
          reject(
            "error while quering userbyone +++++++++++++++++++++++++++++++" +
              error
          );
        }
        resolve(result);
      }
    );
  });
};

exports.updateOneWhereClause = (
  tableName,
  col_name,
  col_value,
  table_fields
) => {
  return new Promise((resolve, reject) => {
    // const sql = updateQuery(tableName, col_name, col_value, ...params);
    const sql =
      "UPDATE " + tableName + " SET ? WHERE " + col_name + " = " + col_value;
    db.query(sql, [table_fields], (error, result) => {
      if (error) {
        reject("error while inserting new record...: \n" + error);
      } else {
        resolve(result);
      }
    });
  });
};
exports.updateTwoWhereClause = (
  tableName,
  col_name1,
  col_value1,
  col_name2,
  col_value2,
  table_fields
) => {
  return new Promise((resolve, reject) => {
    // const sql = updateQuery(tableName, col_name, col_value, ...params);
    const sql =
      "UPDATE " +
      tableName +
      " SET ? WHERE " +
      col_name1 +
      " = " +
      col_value1 +
      " AND " +
      col_name2 +
      " = " +
      col_value2;
    db.query(sql, [table_fields], (error, result) => {
      if (error) {
        reject("error while inserting new record...: \n" + error);
      } else {
        resolve(result);
      }
    });
  });
};

//generate sql Query
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

// exports.updateQuery = (tableName, col_name, col_value, ...params) => {
//   //first param always tableName
//   var paramsLength = params.length;
//   var halfParam = paramsLength / 2;
//   var a = "";
//   var b = ""; // ??=?
//   //from first index of array to half index
//   //beacuse half of the parameters are columnname and others are its value
//   for (i = 0; i <= paramsLength - halfParam - 1; i++) {
//     a = a + " ?? = ? ,";
//   }
//   //result comes like ??,??,??, we need to remove last character ,
//   a = a.slice(0, -1);
//   b = b.slice(0, -1);
//   //   UPDATE Customers
//   // SET ContactName = 'Alfred Schmidt', City= 'Frankfurt'
//   // WHERE CustomerID = 1;
//   const sql =
//     "UPDATE " +
//     tableName +
//     " SET " +
//     a +
//     " WHERE " +
//     col_name +
//     " = " +
//     col_value;
//   //if paramenters are not even then through error else proceed;
//   if (paramsLength % 2 !== 0) {
//     console.log(
//       "insert column name and value note matched: one or many coulmn and value quntity not matched"
//     );
//   } else {
//     return sql;
//   }
// };

// //reject use case in pr
