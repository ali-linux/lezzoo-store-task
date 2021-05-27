const db = require("../config/db");

const addStore = async (req, res, next) => {
  try {
    const { name, email, logo } = req.body;
    const result = await db("store").insert({
      name,
      email: email.toLowerCase(),
      logo,
    });
    const id = result[0];
    res.json({
      msg: "successfully added",
      store: {
        id,
        name,
        email: email.toLowerCase(),
        logo,
      },
    });
  } catch (err) {
    res.send(err.message);
  }
};

const deleteStore = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await db("store")
      .where({
        id,
      })
      .del();
    res.json(result);
  } catch (err) {
    res.send(err.message);
  }
};
const getStores = async (req, res) => {
  try {
    const result = await db.from("store").select("*");
    res.json({
      result,
      msg: "success",
    });
  } catch (err) {
    res.send(err.message);
  }
};

const getSingleStore = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await db
      .from("store")
      .select("*")
      .where("id", "=", id)
      .first();
    if (!result) {
      res.json({
        errors: [
          {
            msg: "no store found",
          },
        ],
      });
    }
    res.json(result);
  } catch (err) {
    res.send(err.message);
  }
};

const updateStore = async (req, res) => {
  id = req.params.id;
  try {
    const { name, email, logo } = req.body;
    const result = await db("store")
      .where({
        id,
      })
      .update({
        name,
        email,
        logo,
      });
    if (result === 0) {
      return res.json({
        errors: [
          {
            msg: "no store found",
          },
        ],
      });
    }
    res.json({ msg: "updated successfully", result });
  } catch (err) {
    res.send(err.message);
  }
};
module.exports = {
  addStore,
  deleteStore,
  getStores,
  getSingleStore,
  updateStore,
};
