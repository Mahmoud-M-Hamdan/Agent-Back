const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const itemRouter = require("./routers/item");

const app = express();
var cors = require("cors");
app.use(cors());
require("dotenv").config();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(userRouter);
app.use(itemRouter);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});


