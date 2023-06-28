//routers
const authRouter = require("./routes/auth");
const userRouter = require("./routes/userRouter");
const refreshTokenRouter = require("./routes/refereshToken");
const postRouter = require("./routes/postRouter");
const catRouter = require("./routes/categoryRouter");
const adsRouter = require("./routes/advertisementRouter");
const adminRouter = require("./routes/adminRouter");
const subsRouter = require("./routes/subscriberRouter");
const emailVerifyRouter = require("./routes/emailVerifyRouter");

//routers
const bodyParser = require("body-parser");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("./configs/dotenv_config");
const trim_body = require("./middlewares/trimBody");
var path = require("path");

const app = express();
app.use(cors());
//can also use bodyparser()
app.use(bodyParser.json());

// app.use(
//   express.json({
//     verify: (req, res, buf, encoding) => {
//       try {
//         JSON.parse(buf);
//       } catch (e) {
//         return res.status(404).json("invalid JSON");
//       }
//     },
//   })
// );
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
// set the view engine to ejs
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/views/public"));

// use res.render to load up an ejs view file

// use the middleware function with app.use()
app.use(trim_body.trim);

///get admin page login page

// index/home page

app.use("/admin/", adminRouter);

// show alert after every 5 seconds
app.use("/api/refereshToken/", refreshTokenRouter);
app.use("/api/auth/", authRouter);

//users router gateway
app.use("/api/users/", userRouter);

//posts router gateways
app.use("/api/posts/", postRouter);

//category router gateway
app.use("/api/category/", catRouter);

//category router gateway
app.use("/api/ads/", adsRouter);

//subscriber router geteway
app.use("/api/subscribers/", subsRouter);

//subscriber router geteway
app.use("/api/verify_email/", emailVerifyRouter);

app.listen(dotenv.port, () => {
  console.log("server is running at port 3000");
});
