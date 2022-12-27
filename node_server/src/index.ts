// import { telegram, T_METHODS, setOffset, getOffset } from "./service/axios";
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

// setInterval(() => {
//   telegram
//     .post(T_METHODS.GET_UPDATES, {
//       offset: getOffset(),
//     })
//     .then((res) => {
//       const updates = res?.data?.result || [];
//       if (updates.length === 0) {
//         console.log(updates);
//         return;
//       }
//       const offset = updates[updates.length - 1].update_id + 1;
//       setOffset(offset);
//       console.log(updates);
//     });
// }, 5000);

app.get("*", (res, req) => {
  if (!isProd()) {
    return req.status(404).send();
  }
  const url = "../public/index.html";
  req.sendFile(path.join(__dirname, url));
});

const port = process.env.PORT || (isProd() ? 3000 : 3001);

app.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
