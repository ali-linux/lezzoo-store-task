const jwt = require("jsonwebtoken");
const config = require("config");

/*
  @desc sets jwt token to the header
*/

module.exports = (req, res, next) => {
  // GET THE TOKEN FROM THE HEADER
  const token = req.header("x-auth-token");
  // CHECK IF NO TOKEN
  if (!token) {
    return res.status(401).json({ msg: "no token, authorization denied" });
  }
  // VERIFY TOKEN
  try {
    const decoded = jwt.verify(token, config.get("jwtToken"));
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "TOKEN IS NOT VALID" });
  }
};
