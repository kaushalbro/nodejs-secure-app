const posts = require("../models/Posts");
const query = require("../db/sqlquery");
const bodyFieldcheck = require("../helpers/bodyFieldcheck");

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//@                                                                                                                           @
//@                                                                                                                           @
//@                                                      POST METHOD                                                          @
//@                                                                                                                           @
//@                                                                                                                           @
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

exports.createPost = async (req, res) => {
  const post = req.body;

  const {
    title,
    body,
    featured_image,
    cat_id,
    post_status,
    language,
    source,
    is_commentable,
    send_to_subscriber_mail,
  } = post;
  if (condition) {
  }
  if (Object.keys(post).length !== 9) {
    return res.status(400).json("insufficient field must be min 9");
  }
  // //checking if any supplie field in request is empty or not
  var isEmpty = bodyFieldcheck.isEmpty(post);
  //if all field has value
  if (isEmpty) {
    return res.status(400).json(isEmpty);
  }
  try {
    await query.insertOne(
      "posts",
      "post_title",
      "post_body",
      "post_featured_image",
      "author_id",
      "author_name",
      "category_id",
      "post_status",
      "post_language",
      "post_source",
      "is_commentable",
      "send_to_subscriber_mail",
      title,
      body,
      featured_image,
      1,
      "req.token_user.username",
      cat_id,
      post_status,
      language,
      source,
      is_commentable,
      send_to_subscriber_mail
    );
    return res
      .status(200)
      .json({ message: "Post created successfully about " + title });
  } catch (error) {
    console.log(error);
    res.status(400).json({ "Post not created:": error });
  }
};

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//@                                                                                                                           @
//@                                                                                                                           @
//@                                                     DELETE METHOD                                                         @
//@                                                                                                                           @
//@                                                                                                                           @
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

exports.deletePostById = async (req, res) => {
  const user_level = req.token_user.user_level;
  const post_id = req.params.id;
  if (user_level === 0) {
    const deleted_post = await posts.deletePostById(post_id);
    if (deleted_post.affectedRows === 0) {
      return res.status(404).json("no post found and deleted");
    }
    return res.status(202).json("post deleted By admin successfully.");
  }

  const post = posts.getPostByID(post_id);
  if (post.length === 0) {
    return res.status(404).json({
      message: "no post found..",
    });
  }
  const delete_post = await posts.deletePostByIdAndAuthID(
    post_id,
    req.token_user.user_id
  );
  console.log(delete_post);
  if (delete_post.affectedRows === 0) {
    return res
      .status(403)
      .json("you do not have permission to delete other author's post");
  }
  return res.status(200).json("post deleted successfully...");
};

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//@                                                                                                                           @
//@                                                                                                                           @
//@                                                      PATCH METHOD                                                         @
//@                                                                                                                           @
//@                                                                                                                           @
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

exports.updatePost = async (req, res) => {
  const token_user_id = req.token_user.user_id;
  const token_user_level = req.toke_user.user_level;
  const post_id = req.params.id;
  const fields_to_update = req.body;
  try {
    const post_ = posts.getPostByID(post_id);
    if (post_.length === 0) {
      return res.status(404).json({
        message: "no post found..",
      });
    }
    if (token_user_level === 0) {
      const updatePost = await posts.updatePostByID(post_id, fields_to_update);
      if (updatePost.changedRows === 0) {
        return res.status(404).json("no field updated");
      }
      return res.status(200).json("updated successfully...");
    }
    const post__ = posts.getAllPostWhere_2Col(
      "post_id",
      post_id,
      "author_id",
      token_user_id
    );
    if (post__.length === 0) {
      return res.status(404).json({
        message: "cannot delete other's post: Access denied.",
      });
    }
    const updatePost = await posts.updatePostByIdAndauthor_id(
      post_id,
      token_user_id,
      fields_to_update
    );
    if (updatePost.changedRows === 0) {
      return res.status(404).json("no field updated");
    }
    return res.status(200).json("updated successfully...");
  } catch (error) {
    return res
      .status(404)
      .json("Error occur cann't proceed might be wrong field name not found");
  }
};

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//@                                                                                                                           @
//@                                                                                                                           @
//@                                                      GET METHOD                                                           @
//@                                                                                                                           @
//@                                                                                                                           @
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// GET ALL PUBLISHED POST

<<<<<<< HEAD
exports.getPosts = async (req, res) => {
  const end_point = req.originalUrl;
  const end_points = end_point
    .split("/")
    .filter((str) => str !== "")
    .slice(1);
  switch (end_points[1]) {
    case "all":
      const all_posts = await posts.getAll();
      res.status(200).json(all_posts);
      break;
    case "published":
      const published_post = await posts.getAllPostWhere_1Col(
        "post_status",
        "published"
      );
      res.status(200).json(published_post);
      break;
    case "archived":
      const archived_post = await posts.getAllPostWhere_1Col(
        "post_status",
        "archived"
      );
      res.status(200).json(archived_post);
      break;
    case "deleted":
      const deleted_post = await posts.getAllPostWhere_1Col(
        "post_status",
        "deleted"
      );
      res.status(200).json(deleted_post);
      break;
    case "id":
      const post = await posts.getAllPostWhere_1Col("post_status", "deleted");
      res.status(200).json(deleted_post);
      break;
    default:
      res.status(404).json("no post found");
      break;
  }
};

exports.getAllPublishedPosts = async (req, res) => {};

=======
exports.getAllPublishedPosts = async (req, res) => {
  const all_posts = await posts.getAllPostWhere_1Col(
    "post_status",
    "published"
  );
  res.status(200).json(all_posts);
};

>>>>>>> d8823b6f3a29c279c492b7aaba34be9f0765266e
//GET ONLY PUBLISHED POST BY ID
exports.getPublishedPostsById = async (req, res) => {
  const id = parseInt(req.params.id);
  const post = await posts.getAllPostWhere_2Col(
    "post_id",
    id,
    "post_status",
    "published"
  );
  console.log(post.length);
  if (post.length === 0) {
    return res
      .status(404)
      .json("Not published post OR post found with this id." + id);
  }
  return res.status(200).json(post);
};
// GET ALL PUBLISHED POST BY AUTHOR
exports.getAllPublishedPostsByAuthorName = async (req, res) => {
  const name = req.params.author_name;
  const post = await posts.getAllPostWhere_2Col(
    "author_name",
    name,
    "post_status",
    "published"
  );
  console.log(post.length);
  if (post.length === 0) {
    return res
      .status(404)
      .json("Not published post OR post found with this author name." + name);
  }
  return res.status(200).json(post);
};

// GET ALL PUBLISHED POST BY CATEGORY_ID
exports.getAllPublishedPostsByCategoryID = async (req, res) => {
  const cat_id = req.params.category_id;
  const post = await posts.getAllPostWhere_2Col(
    "category_id",
    cat_id,
    "post_status",
    "published"
  );
  console.log(post.length);
  if (post.length === 0) {
    return res
      .status(404)
      .json("Not published post OR post found with this cat id." + cat_id);
  }
  return res.status(200).json(post);
};

// GET ALL PUBLISHED POST BY YEAR
exports.getAllPublishedPostsByYear = async (req, res) => {
  const year = req.params.year;
  const all_posts = await posts.getAllPostByDate("2023-04");
  res.status(200).json("get all post of year " + year);
};

// GET ALL PUBLISHED POST BY MONTH
exports.getAllPublishedPostsByMonth = async (req, res) => {
  const year = req.params.year;
  const month = req.params.month;

  res.status(200).json("get all post of month " + year + "-" + month);
};

// GET ALL PUBLISHED POST BY DAY
exports.getAllPublishedPostsByDay = async (req, res) => {
  const year = req.params.year;
  const month = req.params.month;
  const day = req.params.day;
  res.status(200).json("get all post of day " + year + "-" + month + "-" + day);
};
