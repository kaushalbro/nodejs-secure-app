const express = require("express");
const postRouter = express.Router();
const postContoller = require("../controllers/postController");
const auth = require("../middlewares/auth");
const role = require("../middlewares/userRole");

//level 0 means superAdmin
//level 1 means editor
//level3 means normal user

postRouter
  .get("/", postContoller.getAllPublishedPosts)
  .get("/id/:id", postContoller.getPublishedPostsById)
  // get /posts/published, /deleted /archived / drafted
  .get("/:status", postContoller.getPosts)
  // get by /posts/author
  .get("/author/:author_name", postContoller.getAllPublishedPostsByAuthorName)
  .get("/category/:category_id", postContoller.getAllPublishedPostsByCategoryID)
  // .get("/:year", postContoller.getAllPublishedPostsByYear)
  .get("/:year/:month", postContoller.getAllPublishedPostsByMonth)
  .get("/:year/:month/:day", postContoller.getAllPublishedPostsByDay)
  .post("/", postContoller.createPost)
  // .post("/", auth.verifyAccessToken, role.isLevel_0_1, postContoller.createPost)
  .delete(
    "/id/:id",
    auth.verifyAccessToken,
    role.isLevel_0_1,
    postContoller.deletePostById
  )
  .patch("/:id", postContoller.updatePost);
module.exports = postRouter;
