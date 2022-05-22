const Router = require("express");
const router = new Router();
const BasketController = require("./../controllers/basketController");
const authMiddleware = require("./../middleware/authMiddleware");
const checkDeleteDeviceFromBasket = require("./../middleware/checkDeleteDeviceFromBasket");

router
  .post("/all", authMiddleware, BasketController.deleteAll)
  .post("/", authMiddleware, BasketController.addItem)
  .get("/", authMiddleware, BasketController.getItem)
  .delete(
    "/:id",
    authMiddleware,
    checkDeleteDeviceFromBasket,
    BasketController.deleteItem
  );

module.exports = router;
