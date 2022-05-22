require(`dotenv`).config();
require("./webSocket/index");
const express = require("express");
const sequelize = require("./db");
const models = require("./models/models");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const router = require("./routes/index");
const errorHandler = require("./middleware/errorHandlingMiddleware");
const path = require("path");
const https = require("https");
const fs = require("fs");

const PORT = process.env.PORT || 3000;

const app = express();

const options = {
  key: fs.readFileSync("./mkcert-install/localhost-key.pem"), // Replace with the path to your key
  cert: fs.readFileSync("./mkcert-install/localhost.pem"), // Replace with the path to your certificate
};

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static")));
app.use(fileUpload({}));
app.use("/api", router);

//Error Handler
app.use(errorHandler);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    https.createServer(options, app).listen(PORT, () => {
      console.log("Server listening on port " + PORT);
    });
    //app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};
start();
