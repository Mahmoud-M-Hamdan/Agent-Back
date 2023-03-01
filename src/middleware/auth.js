const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
  try {
    console.log("i am in");
    const token = req.header('Authorization').replace('Bearer ', '');
    console.log("token", token);
    const decoded = jwt.verify(token, "thisismynewcourse");
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    console.log("user", user);
    // console.log('token',);
    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    console.log("koko");
    console.log(e);
    res.status(401).send({ error: "Please authenticate." });
  }
};

module.exports = auth;
