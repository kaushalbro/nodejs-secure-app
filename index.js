const express = require("express");
const dotenv = require("./configs/dotenv_config");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/userRouter");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// set the view engine to ejs
app.set("view engine", "ejs");

// use res.render to load up an ejs view file

// index/home page
app.get("/", (req, res) => {
  //   res.send("get root");
  res.render("./home");
});

app.use(authRouter);
app.use(userRouter);

app.listen(dotenv.port, () => {
  console.log("server is running at port 3000");
});
