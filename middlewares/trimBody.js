exports.trim = (req, res, next) => {
  if ((req.body && req.method === "POST") || req.method === "PATCH") {
    obj = req.body;
    if (Object.keys(obj).length === 0) {
      return res.status(400).json("invalid body");
    }
    for (const key in obj) {
      if (typeof obj[key] === "string") {
        obj[key] = obj[key].trim();
      }
    }
    req.body = obj;
  }
  next();
  // return;
};
