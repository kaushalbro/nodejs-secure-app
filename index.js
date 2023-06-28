//routers
const authRouter = require("./routes/auth");
const userRouter = require("./routes/userRouter");
const refreshTokenRouter = require("./routes/refereshToken");
const postRouter = require("./routes/postRouter");
const catRouter = require("./routes/categoryRouter");
const adsRouter = require("./routes/advertisementRouter");
<<<<<<< HEAD
const adminRouter = require("./routes/adminRouter");
=======
const adminViewController = require("./controllers/adminViewController");

>>>>>>> d8823b6f3a29c279c492b7aaba34be9f0765266e
const subsRouter = require("./routes/subscriberRouter");
const emailVerifyRouter = require("./routes/emailVerifyRouter");

//routers
const bodyParser = require("body-parser");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("./configs/dotenv_config");
const trim_body = require("./middlewares/trimBody");
<<<<<<< HEAD
var path = require("path");
=======
>>>>>>> d8823b6f3a29c279c492b7aaba34be9f0765266e

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
<<<<<<< HEAD
// set the view engine to ejs
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/views/public"));

=======
// app.use(express.static("views"));
// // set the view engine to ejs
// app.set("view engine", "ejs");
>>>>>>> d8823b6f3a29c279c492b7aaba34be9f0765266e
// use res.render to load up an ejs view file

// use the middleware function with app.use()
app.use(trim_body.trim);

///get admin page login page

// index/home page

<<<<<<< HEAD
app.use("/admin/", adminRouter);
=======
// app.get("/admin/", (req, res) => {
//   res.render("./home");
// });

app.use("/admin", adminViewController);
>>>>>>> d8823b6f3a29c279c492b7aaba34be9f0765266e

// show alert after every 5 seconds
app.use("/api/refereshToken/", refreshTokenRouter);
app.use("/api/auth/", authRouter);

//users router gateway
app.use("/api/users/", userRouter);

<<<<<<< HEAD
//posts router gateways
=======
//posts router gateway
>>>>>>> d8823b6f3a29c279c492b7aaba34be9f0765266e
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
