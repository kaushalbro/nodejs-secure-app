//level 0 == superAdmin;
//level 1 == editor;
//level 2 == normal users;

exports.isLevel_0 = (req, res, next) => {
  if (req.token_user.user_level !== 0) {
    return res
      .status(403)
      .json({ message: "Unauthorized: SuperAdmin Required" });
  }
  next();
};

exports.isLevel_1 = (req, res, next) => {
  if (req.token_user.user_level !== 1) {
    return res.status(403).json({ message: "Unauthorized" });
  }
  next();
};

exports.isLevel_2 = (req, res, next) => {
  if (req.token_user.user_level !== 2) {
    return res.status(403).send({ message: "Unauthorized" });
  }
  next();
};

exports.isLevel_0_1 = (req, res, next) => {
  console.log(req.token_user.user_level);
  if (!req.token_user.user_level === 0 || !req.token_user.user_level === 1) {
    return res
      .status(403)
      .json({ message: "Unauthorized: SuperAdmin or Editor role Required" });
  }
  next();
};
