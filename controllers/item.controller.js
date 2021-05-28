const db = require("../config/db");

const addItem = async (req, res, next) => {
  const store_id = parseInt(req.params.store_id);
  const category_id = parseInt(req.params.category_id);
  console.log(req.file);
  try {
    const name = req.body.name;
    const price = parseInt(req.body.price);
    const stock = parseInt(req.body.stock);
    let image = req.body.image;
    if (image === null) {
      image = "client/src/images/default.jpg";
      console.log("image not found");
    } else {
      console.log(image);
    }
    const result = await db("item").insert({
      name,
      image,
      price,
      stock,
      category_id,
      store_id,
    });
    const Item_id = result[0];
    res.json({
      msg: "successfully added",
      item: {
        id: Item_id,
        name,
        image,
        price,
        stock,
        category_id,
        store_id,
      },
    });
  } catch (err) {
    res.send(err.message);
  }
};
const deleteItem = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await db("item")
      .where({
        id,
      })
      .del();
    if (result === 0) {
      return res.json({
        errors: [
          {
            msg: "no Item found",
          },
        ],
      });
    }
    res.json(result);
  } catch (err) {
    res.send(err.message);
  }
};
const getItems = async (req, res) => {
  const store_id = parseInt(req.params.store_id);
  const category_id = parseInt(req.params.category_id);
  try {
    const result = await db
      .select("*")
      .from("Item")
      .where({
        category_id,
        store_id,
      })
      .orderBy("id", "desc");

    res.json({
      result,
      msg: "success",
    });
  } catch (err) {
    console.log(store_id);
    res.send(err.message);
  }
};
const updateItem = async (req, res) => {
  const name = req.body.name;
  const price = parseInt(req.body.price);
  const stock = parseInt(req.body.stock);
  const id = parseInt(req.params.id);
  let image = req.body.image;
  if (typeof req.file !== "undefined") image = req.file.path;

  try {
    const result = await db("item")
      .where({
        id,
      })
      .update({
        name,
        image,
        price,
        stock,
      });
    if (result === 0) {
      return res.json({
        errors: [
          {
            msg: "no Item found",
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
  addItem,
  deleteItem,
  getItems,
  updateItem,
};
