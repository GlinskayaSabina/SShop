require(`dotenv`).config();
const jwt = require("jsonwebtoken");
module.exports = function (req, res, next) {
  if (req.method == "OPTIONS") {
    next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1]; // Bearer dfghjkjhgfdsdghj
    if (!token) {
      return res.status(401).json({ message: "user is not authorized1" });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({ message: e.message });
  }
};
