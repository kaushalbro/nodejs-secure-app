const { createEmailVerifyToken } = require("../configs/utils/JWT");
const { sendMailToSubscriber } = require("../configs/utils/mailSender");
const db = require("../db/sqlquery");
const { isEmpty } = require("../helpers/bodyFieldcheck");
const subs_tbl = "subscribers";
const { isEmail } = require("../helpers/helper");

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//@                                                                                                                           @
//@                                                                                                                           @
//@                                                       GET METHOD                                                          @
//@                                                                                                                           @
//@                                                                                                                           @
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

exports.getSubscriber = async (req, res) => {
  //   db.query();
  try {
    const allSubs = await db.getall(subs_tbl);
    return res.status(200).json(allSubs);
  } catch (error) {
    return res.status(400).json(error);
  }
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
    const subs = req.body;
    const subs_value = Object.values(subs);
    const { email } = subs;
    if (email === undefined) {
      return res.status(422).json("email field is undefined");
    }
    // //checking if any supplie field in request is empty or not
    if (isEmpty(subs)) {
      return res.status(422).json(isEmpty(subs));
    }
    if (!isEmail(email)) {
      return res.status(422).json("please provide a valid email");
    }
    const subcriber = await db.getWhere(subs_tbl, "email", email);
    if (subcriber.length > 0 && subcriber[0].verified === 1) {
      return res.status(409).json("This email already exists..");
    }
    if (subcriber.length > 0 && subcriber[0].verified === 0) {
      const subs_email_verification_token = await createEmailVerifyToken(email);
      sendMailToSubscriber(
        email,
        "http://localhost:3000/api/verify_email/" +
          subs_email_verification_token
      );
      return res
        .status(400)
        .json(
          "This email already exists! but not verified: Please visit mail(gmail) box to verify email OR if not recevied mail yet re-signup for newsLetter .."
        );
    }
    const email_verification_token = await createEmailVerifyToken(email);
    sendMailToSubscriber(
      email,
      "http://localhost:3000/api/verify_email/" + email_verification_token
    );
    await db.query(
      "insert into  " + subs_tbl + "(email) values ( ? ) ",
      subs_value
    );
    return res
      .status(200)
      .json(
        "Registered: Please visit mail(gmail) box to verify email OR if not recevied mail yet re-signup for newsLetter."
      );
  } catch (error) {
    res.status(400).json(error.sqlMessage);
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
  const subs = req.body;
  const id = req.params.id;
  const { email } = subs;
  if (email === undefined) {
    return res.status(400).json("email field is undefined");
  }
  // //checking if any supplie field in request is empty or not
  if (isEmpty(subs)) {
    return res.status(400).json(isEmpty(subs));
  }
  if (!isEmail(email)) {
    return res.status(400).json("please provide a valid email");
  }
  try {
    const subs_ = await db.getWhere(subs_tbl, "id", id);
    if (subs_.length === 0) {
      return res.status(404).json("no subscriber found of this id.");
    }
    const update = await db.updateOneWhereClause(subs_tbl, "id", id, subs);
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
    const subscriber = await db.getWhere(subs_tbl, "id", id);
    if (subscriber.length === 0) {
      return res.status(404).json("no subscriber found of this id.");
    }
    await db.deleteByOne(subs_tbl, "id", id);
    return res.status(200).json("deleted succefully..");
  } catch (error) {
    return res.status(400).json(error);
  }
};
