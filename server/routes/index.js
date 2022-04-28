const Router = require("express");
const router = new Router();
const brandRouter = require("./brandRouter");
const itemRouter = require("./itemRouter");
const typeRouter = require("./typeRourer");
const userRouter = require("./userRouter");

router.use("/user", userRouter);
router.use("/type", typeRouter);
router.use("/brand", brandRouter);
router.use("/item", itemRouter);

module.exports = router;
