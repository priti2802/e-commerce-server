const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const cors = require("cors");
const path = require("path");
const clc = require("cli-color");

const { serverUtils } = require("./utils");
const { loggerMiddleware } = require("./middleware/auth.middleware");
const connectDB = require("./config/db");
const router = require("./routes");

const app = express();

app.use(cors());
app.use(express.json({ limit: "500000mb", extended: true }));
app.use(express.urlencoded({ limit: "5000000mb", extended: true }));
app.use(loggerMiddleware);
app.use("/public", express.static(path.join(__dirname, "../public")));
require("dotenv").config();

app.use("/api", router);

const PORT = serverUtils.normalizePort(
  process.env["PORT_" + process.env.RUN_MODE] || "3010"
);

connectDB()
  .then(() => {
    server = http.createServer(app);
    server.listen(PORT, () => {
      console.log(
        `============= Your Application running on ${clc.magenta.underline(
          PORT
        )} in ${clc.magenta.underline(
          process.env.RUN_MODE
        )} Enviourment =============`
      );
    });

    server.on("error", (error) => serverUtils.onError(error, port));
    server.on("listening", () => serverUtils.onListening(server));
  })
  .catch((err) => {
    console.error(
      `Database Connection Error \nApp starting error:${err.message}`
    );
  });
