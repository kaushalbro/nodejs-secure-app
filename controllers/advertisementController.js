const db = require("../db/sqlquery");
const ads_tbl = "advertisements";
const bodyChecker = require("../helpers/bodyFieldcheck");
const columns =
  "(title,description,image,image_url,video_url,advertiser_name,start_date,end_date,advertisement_position,advertisement_status)";

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//@                                                                                                                           @
//@                                                                                                                           @
//@                                                       GET METHOD                                                          @
//@                                                                                                                           @
//@                                                                                                                           @
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

exports.getAds = async (req, res) => {
  //   db.query();
  const all_ads = await db.getall(ads_tbl);
  return res.status(200).json(all_ads);
};

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//@                                                                                                                           @
//@                                                                                                                           @
//@                                                      POST METHOD                                                          @
//@                                                                                                                           @
//@                                                                                                                           @
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

exports.create = async (req, res) => {
  const ads = req.body;
  const ads_value = Object.values(ads);
  const is_empty = bodyChecker.isEmpty(ads);
  if (is_empty) {
    return res.status(400).json(is_empty);
  }
  try {
    const ads_avilable = await db.getWhere(ads_tbl, "title", ads.title);
    if (ads_avilable.length !== 0) {
      return res
        .status(200)
        .json({ message: "Ads with this title already exists." });
    }
    await db.query(
      "insert into " + ads_tbl + columns + " values ( ? ) ",
      ads_value
    );
    return res.status(200).json("Ads added sccessfully");
  } catch (error) {
    if (error.sqlMessage) {
      return res.status(400).json(error.sqlMessage);
    }
    return res.status(400).json(error);
  }
};

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//@                                                                                                                           @
//@                                                                                                                           @
//@                                                     PATCH METHOD                                                          @
//@                                                                                                                           @
//@                                                                                                                           @
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

//update ok
exports.update = async (req, res) => {
  const id = req.params.id;
  var ads_body = req.body;
  try {
    const ads = await db.getWhere(ads_tbl, "id", id);
    if (ads.length === 0) {
      return res.status(404).json("No ads found of this id.");
    }
    const update = await db.updateOneWhereClause(ads_tbl, "id", id, ads_body);
    if (update.changedRows === 0) {
      return res.status(400).json("No field updated...");
    }
    return res.status(200).json("Updated succesfully.");
  } catch (error) {
    return res.status(200).json(error);
  }
};

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//@                                                                                                                           @
//@                                                                                                                           @
//@                                                    DELETE METHOD                                                          @
//@                                                                                                                           @
//@                                                                                                                           @
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    const cat = await db.getWhere(ads_tbl, "id", id);
    if (cat.length === 0) {
      return res.status(404).json("no category found of this id.");
    }
    await db.deleteByOne(ads_tbl, "id", id);
    return res.status(200).json("deleted succefully..");
  } catch (error) {
    return res.status(400).json(error);
  }
};
