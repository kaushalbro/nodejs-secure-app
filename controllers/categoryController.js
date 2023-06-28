const db = require("../db/sqlquery");
const category = "category";
const bodyChecker = require("../helpers/bodyFieldcheck");

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//@                                                                                                                           @
//@                                                                                                                           @
//@                                                       GET METHOD                                                          @
//@                                                                                                                           @
//@                                                                                                                           @
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

exports.getCategory = async (req, res) => {
  //   db.query();
  const allcat = await db.getall(category);
  return res.status(200).json(allcat);
};

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//@                                                                                                                           @
//@                                                                                                                           @
//@                                                       POST METHOD                                                         @
//@                                                                                                                           @
//@                                                                                                                           @
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

exports.create = async (req, res) => {
  try {
    const new_cat = req.body;
    const cat_value = Object.values(new_cat);
    const { name, about } = new_cat;
    if (name === undefined || about === undefined) {
      return res.status(400).json("make name or about field's name correct");
    }
    // //checking if any supplie field in request is empty or not
    var isEmpty = bodyChecker.isEmpty(new_cat);
    //if all field has value
    if (isEmpty) {
      return res.status(400).json(isEmpty);
    }
    const cat = await db.getWhere(category, "name", name);
    if (cat.length > 0) {
      return res.status(400).json("category already exists.");
    }
    await db.query("insert into category (name , about) values (?) ", [
      cat_value,
    ]);
    return res.send("insert successfully");
  } catch (error) {
    res.status(400).json(error);
  }
};

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//@                                                                                                                           @
//@                                                                                                                           @
//@                                                       PATCH METHOD                                                        @
//@                                                                                                                           @
//@                                                                                                                           @
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

exports.update = async (req, res) => {
  const body = req.body;
  const id = req.params.id;
  try {
    const cat = await db.getWhere(category, "id", id);
    if (cat.length === 0) {
      return res.status(404).json("no category found of this id.");
    }
    const update = await db.updateOneWhereClause(category, "id", id, body);
    if (update.changedRows === 0) {
      return res.status(400).json("no field updated...");
    }
    return res.status(200).json("updated succesfully.");
  } catch (error) {
    console.log(error);
    return res
      .status(200)
      .json("error while updating record. check field name");
  }
};

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//@                                                                                                                           @
//@                                                                                                                           @
//@                                                       DELETE METHOD                                                       @
//@                                                                                                                           @
//@                                                                                                                           @
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    const cat = await db.getWhere(category, "id", id);
    if (cat.length === 0) {
      return res.status(404).json("no category found of this id.");
    }
    await db.deleteByOne(category, "id", id);
    return res.status(200).json("deleted succefully..");
  } catch (error) {
    return res.status(400).json(error);
  }
};
