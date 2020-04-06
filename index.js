require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const visitRoutes = require("./routes/visit");
const placeRoutes = require("./routes/place");

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB connected");
  })
  .catch((error) => {
    console.log(error);
  });

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", placeRoutes);
app.use("/api", visitRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Hello",
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
