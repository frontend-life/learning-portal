require("dotenv").config();
import express from "express";
import cors from "cors";

import path from "path";
import apiRouter from "./router";
import { isProd } from "./utils";

import("./db/mongoose");

declare global {
  namespace Express {
    interface Request {
      user: any;
    }
  }
}

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
app.use(express.static("public"));

app.use("/api", apiRouter);

app.get("*", (req, res) => {
  if (!isProd()) {
    return res.status(404).send();
  }
  const indexHTML =
    "/var/www/html/learning-portal/node_server/public/index.html";
  res.sendFile(indexHTML);
});

const port = process.env.PORT || (isProd() ? 3000 : 3001);

app.listen(port, () => {
  console.log(`Server is up and works on ${port}`);
});
