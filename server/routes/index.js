const Router = require("express");
const basketRouter = require("./basketRouter");
const router = new Router();
const brandRouter = require("./brandRouter");
const itemRouter = require("./itemRouter");
const typeRouter = require("./typeRourer");
const userRouter = require("./userRouter");

router.use("/user", userRouter);
router.use("/type", typeRouter);
router.use("/brand", brandRouter);
router.use("/item", itemRouter);
router.use("/basket", basketRouter);

module.exports = router;
