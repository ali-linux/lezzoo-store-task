const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

//GET USER INFO
const getUserInfo = async (req, res, next) => {
  try {
    const result = await db
      .from("user")
      .select("*")
      .where("email", "=", req.user.email)
      .first();
    res.json(result);
  } catch (err) {
    res.send(err.message);
  }
};

//LOGIN
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await db
      .from("user")
      .select("*")
      .where("email", "=", email)
      .first();
    if (!result)
      return res.status(400).json({
        errors: [
          {
            msg: "INVALID CREDENTIALS",
          },
        ],
      });
    const isMatch = await bcrypt.compare(password, result.password);
    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "INVALID CREDENTIALS" }] });
    }
    const payload = {
      user: {
        name: result.name,
      },
    };
    const userInfo = payload.user;
    jwt.sign(
      payload,
      config.get("jwtToken"),
      { expiresIn: 36000 },
      (err, token) => {
        if (err) throw err;
        res.json({
          token,
          userInfo,
        });
      }
    );
  } catch (err) {
    res.send(err.message);
  }
};

// REGISTER
const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userExist = await db
      .select("email")
      .from("user")
      .where({ email })
      .first();
    if (userExist)
      return res.status(400).json({
        errors: [
          {
            msg: "user already exist with that email address",
          },
        ],
      });
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);
    const result = await db("user").insert({
      name,
      email,
      password: encryptedPassword,
    });
    res.json({
      msg: "successfully registered",
      result: result[0],
    });
  } catch (err) {
    res.json(err.message);
  }
};

module.exports = {
  login,
  register,
  getUserInfo,
};
