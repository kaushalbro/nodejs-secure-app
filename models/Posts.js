const db = require("../db/sqlquery");
//for table name use ?? and for value user ?

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//@                                                                                                                           @
//@                                                                                                                           @
//@                                                       POST METHOD                                                         @
//@                                                                                                                           @
//@                                                                                                                           @
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

exports.createPost = async (table_name, post) => {
  await db.insertOne(table_name, post);
};

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//@                                                                                                                           @
//@                                                                                                                           @
//@                                                       PATCH METHOD                                                        @
//@                                                                                                                           @
//@                                                                                                                           @
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

exports.updatePostByID = async (postID, body) => {
  const updated = db.updateOneWhereClause("posts", "post_id", postID, body);
  return updated;
};
exports.updatePostByIdAndauthor_id = async (postID, authID, body) => {
  const updated = db.updateTwoWhereClause(
    "posts",
    "post_id",
    postID,
    "author_id",
    authID,
    body
  );
  return updated;
};

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//@                                                                                                                           @
//@                                                                                                                           @
//@                                                       GET METHOD                                                          @
//@                                                                                                                           @
//@                                                                                                                           @
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

exports.getAllPostWhere_2Col = async (
  col_name_1,
  col_value_1,
  col_name_2,
  col_value_2
) => {
  const posts = await db.query("select * from ?? WHERE ?? = ? AND ?? = ?", [
    "posts",
    col_name_1,
    col_value_1,
    col_name_2,
    col_value_2,
  ]);
  return posts;
};

exports.getAllPostWhere_1Col = async (col_name_1, col_value_1) => {
  const posts = await db.query("select * from ?? WHERE ?? = ?", [
    "posts",
    col_name_1,
    col_value_1,
  ]);
  return posts;
};

exports.getAllPostByDate = async (date) => {
  const posts = await db.query("select * from ?? WHERE ?? LIKE `?%`", [
    "posts",
    "created_at",
    date,
  ]);
  return posts;
};

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//@                                                                                                                           @
//@                                                                                                                           @
//@                                                       DELETE METHOD                                                       @
//@                                                                                                                           @
//@                                                                                                                           @
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

exports.deletePostByIdOfspecificEditor = async (post_id, user_id) => {
  const deleted_post = await db.deleteByOne("posts", "post_id", post_id);
  return deleted_post;
};
