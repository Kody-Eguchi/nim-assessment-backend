const mongoose = require("../db.js");

const menuItemsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String
  }
});
menuItemsSchema.set("toJSON", {
  virtuals: true
});
// menu model
const MenuItems = mongoose.model("MenuItems", menuItemsSchema);

const getAll = async () => {
  try {
    const menuItems = await MenuItems.find();
    return menuItems;
  } catch (error) {
    return error;
  }
};

const getOne = async (id) => {
  try {
    const menuItem = await MenuItems.findById(id);
    return menuItem;
  } catch (error) {
    return error;
  }
};

const create = async (body) => {
  try {
    const menuItem = await MenuItems.create(body);
    return menuItem;
  } catch (error) {
    return error;
  }
};

const update = async (id, body) => {
  try {
    const updatedMenu = await MenuItems.findByIdAndUpdate(
      id,
      { ...body, updatedAt: new Date() },
      { new: true }
    );

    return updatedMenu;
  } catch (error) {
    return error;
  }
};

const deleteMenu = async (id) => {
  try {
    const deletedMenu = await MenuItems.findByIdAndRemove(id);

    if (!deletedMenu) {
      throw new Error("Menu item not found");
    }

    return deletedMenu;
  } catch (error) {
    return error;
  }
};

const searchMenu = async (query) => {
  try {
    const filter = {
      $or: [
        { name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } }
      ]
    };
    const menuItems = await MenuItems.find(filter);
    return menuItems;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  deleteMenu,
  searchMenu,
  MenuItems
};
