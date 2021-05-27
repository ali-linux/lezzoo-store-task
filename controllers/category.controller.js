const db = require("../config/db");

// BEGIN;
// INSERT INTO category (category_name, store_id)
//   VALUES('','', '');
// INSERT INTO category_store (store_id, category_id)
//   VALUES('','', '');
// COMMIT;

const addCategory = async (req, res, next) => {
  const store_id = parseInt(req.params.id);
  try {
    const { name } = req.body;
    const result = await db("category").insert({
      name,
    });
    const category_id = result[0];
    await db("store_category").insert({
      store_id,
      category_id,
    });
    res.json({
      msg: "successfully added",
      Category: {
        id: category_id,
        name,
        store_id,
      },
    });
  } catch (err) {
    res.send(err.message);
  }
};

const deleteCategory = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await db("category")
      .where({
        id,
      })
      .del();
    if (result === 0) {
      return res.json({
        errors: [
          {
            msg: "no category found",
          },
        ],
      });
    }
    res.json(result);
  } catch (err) {
    res.send(err.message);
  }
};
const getCategories = async (req, res) => {
  const store_id = parseInt(req.params.id);
  try {
    const result = await db
      .select("*")
      .from("category")
      .join("store_category", function () {
        this.on(function () {
          this.on("category.id", "=", "store_category.category_id");
          this.andOn("store_category.store_id", "=", store_id);
        });
      });
    // const result = knex("category")
    //   .join("store", "category.id", "=", "contacts.user_id")
    //   .select("category.id", "contacts.phone");
    res.json({
      result,
      msg: "success",
    });
  } catch (err) {
    console.log(store_id);
    res.send(err.message);
  }
};

const getSingleCategory = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await db
      .from("category")
      .select("*")
      .where("id", "=", id)
      .first();
    if (!result) {
      res.json({
        errors: [
          {
            msg: "no Category found",
          },
        ],
      });
    }
    res.json(result);
  } catch (err) {
    res.send(err.message);
  }
};

const updateCategory = async (req, res) => {
  const id = req.params.id;
  try {
    const name = req.body.name;
    const result = await db("category")
      .where({
        id,
      })
      .update({
        name,
      });
    if (result === 0) {
      return res.json({
        errors: [
          {
            msg: "no category found",
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
  addCategory,
  deleteCategory,
  getCategories,
  getSingleCategory,
  updateCategory,
};
