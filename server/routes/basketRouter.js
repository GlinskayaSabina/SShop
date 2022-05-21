const Router = require("express");
const router = new Router();
const BasketController = require("./../controllers/basketController");
const authMiddleware = require("./../middleware/authMiddleware");
const checkDeleteDeviceFromBasket = require("./../middleware/checkDeleteDeviceFromBasket");

router
  .post("/", authMiddleware, BasketController.addItem)
  .get("/", authMiddleware, BasketController.getItem)
  .delete(
    "/:id",
    authMiddleware,
    checkDeleteDeviceFromBasket,
    BasketController.deleteItem
  )
  .delete("/all", authMiddleware, BasketController.deleteAll);

module.exports = router;
