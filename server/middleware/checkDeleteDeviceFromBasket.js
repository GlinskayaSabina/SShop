const { Basket, BasketItem } = require("./../models/models");
const jwt = require("jsonwebtoken");

module.exports = async function (req, res, next) {
  try {
    const { id } = req.params;
    const user = req.user;
    const userBasket = await Basket.findOne({ where: { userId: user.id } });
    const itemItem = await BasketItem.findOne({
      where: { basketId: userBasket.id, itemId: id },
    });

    if (itemItem) {
      return next();
    }
    return res.json("Device didn't find in basket of user");
  } catch (e) {
    res.json(e);
  }
};
