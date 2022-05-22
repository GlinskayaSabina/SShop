const {
  Basket,
  BasketItem,
  Item,
  ItemInfo,
  User,
} = require("./../models/models");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const sendWebSocketMessage = require("../webSocket");

class BasketController {
  async addItem(req, res) {
    try {
      const { id } = req.body;
      console.log(id);
      const token = req.headers.authorization.split(" ")[1];
      const user = jwt.verify(token, process.env.SECRET_KEY);
      const basket = await Basket.findOne({ where: { userId: user.id } });
      await BasketItem.create({ basketId: basket.id, itemId: id });
      return res.json("Product added in card");
    } catch (e) {
      console.error(e);
    }
  }

  async getItem(req, res) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const user = jwt.verify(token, process.env.SECRET_KEY);

      const { id } = await Basket.findOne({ where: { userId: user.id } });

      const basket = await BasketItem.findAll({ where: { basketId: id } });

      const basketArr = [];
      for (let i = 0; i < basket.length; i++) {
        const basketItem = await Item.findOne({
          where: {
            id: basket[i].itemId,
          },
          include: {
            model: ItemInfo,
            as: "info",
            where: {
              itemId: basket[i].itemId,
              [Op.or]: [
                {
                  itemId: {
                    [Op.not]: null,
                  },
                },
              ],
            },
            required: false,
          },
        });
        basketArr.push(basketItem);
      }

      return res.json(basketArr);
    } catch (e) {
      console.error(e);
    }
  }

  async deleteItem(req, res) {
    try {
      const { id } = req.params;
      const user = req.user;

      await Basket.findOne({ where: { userId: user.id } }).then(
        async (userBasket) => {
          if (userBasket.userId === user.id) {
            await BasketItem.destroy({
              where: { basketId: userBasket.id, itemId: id },
            });
          }
          return res.json(
            `You haven't access for delete the device(${id}) from basket that didn't belong to you`
          );
        }
      );
      return res.json("Product deleted form your card");
    } catch (e) {
      console.error(e);
    }
  }
  async deleteAll(req, res) {
    const user = req.user;
    const usermodel = await User.findOne({ where: { id: user.id } });
    let sum = 0;
    await Basket.findOne({ where: { userId: user.id } }).then(
      async (basket) => {
        const { id } = basket;
        BasketItem.destroy({ where: { basketId: id } });
      }
    );
    sendWebSocketMessage(`${usermodel.email} совершил покупку.`);
    return res.status(204).send("buy");
  }
}

module.exports = new BasketController();
