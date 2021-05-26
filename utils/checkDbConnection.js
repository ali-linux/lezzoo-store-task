const db = require("../config/db");

module.exports = async (req, res, next) => {
  try {
    await db.raw("select 1+1 as result");
    console.log("DB is Connected");
    next();
  } catch (err) {
    console.log("DB is not Connected!");
    return res.status(500).json({
      errors: [
        {
          msg: "database issue please try again later",
        },
      ],
    });
  }
};
