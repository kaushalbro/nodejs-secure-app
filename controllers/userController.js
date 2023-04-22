const User = require("../models/User");

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//@                                                                                                                           @
//@                                                                                                                           @
//@                                                       GET METHOD                                                          @
//@                                                                                                                           @
//@                                                                                                                           @
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

exports.getAlluser = async (req, res) => {
  let users = await User.All();
  res.status(200).json(users);
};
exports.getUserById = async (req, res) => {
  const param_user_id = parseInt(req.params.id);
  const token_user_id = req.token_user.user_id;
  const token_user_level = req.token_user.user_level;
  // level 1 user can only seen his profile not others
  if (token_user_level === 1) {
    if (param_user_id !== token_user_id) {
      return res.status(401).json({ message: "Invalid token" });
    }
  }
  let user = await User.oneByID(token_user_id);
  res.status(200).json(user);
};
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//@                                                                                                                           @
//@                                                                                                                           @
//@                                                       POST METHOD                                                         @
//@                                                                                                                           @
//@                                                                                                                           @
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

exports.create = async (req, res) => {
  const new_user = req.body;
  console.log(new_user);
};

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//@                                                                                                                           @
//@                                                                                                                           @
//@                                                       UPDATE METHOD                                                       @
//@                                                                                                                           @
//@                                                                                                                           @
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

exports.update = async (req, res) => {
  const user_id = req.params.id;
  const fields_to_update = req.body;
  try {
    const updatePost = await User.updateUser(user_id, fields_to_update);
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
//@                                                       DELETE METHOD                                                       @
//@                                                                                                                           @
//@                                                                                                                           @
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

exports.deleteUser = async (req, res) => {
  const user_id = req.params.id;
  try {
    const user = await User.oneByID(user_id);
    if (user.length === 0) {
      return res.status(404).json("user not found of this id.");
    }
    await User.deleteUser(user_id);
    return res.status(200).json("user deleted successfully.");
  } catch (error) {
    console.log(error);
    return res.status(200).json("error occured: please contact IT team");
  }
};
