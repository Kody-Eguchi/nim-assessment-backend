const MenuItems = require("../db/models/menuItems.js");

const getAll = async (req, res) => {
  try {
    const menu = await MenuItems.getAll();
    res.send(menu);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getOne = async (req, res) => {
  try {
    const menu = await MenuItems.getOne(req.params.id);
    res.send(menu);
  } catch (error) {
    res.status(500).send(error);
  }
};

const create = async (req, res) => {
  try {
    const menu = await MenuItems.create(req.body);
    res.send(menu);
  } catch (error) {
    res.status(500).send(error);
  }
};

const update = async (req, res) => {
  try {
    const updatedMenu = await MenuItems.update(req.params.id, req.body);

    res.send(updatedMenu);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteMenu = async (req, res) => {
  try {
    const deletedMenu = await MenuItems.deleteMenu(req.params.id);

    res.send(deletedMenu.id);
  } catch (error) {
    res.status(500).send(error);
  }
};

const searchMenu = async (req, res) => {
  try {
    const { q } = req.query;
    const menuItems = await MenuItems.searchMenu(q);

    res.send(menuItems);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { getAll, getOne, create, update, searchMenu, deleteMenu };
