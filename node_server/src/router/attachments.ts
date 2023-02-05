import express from "express";
import path from "path";
import fs from "fs";

import { Attachment } from "../models/attachment";
import { auth } from "../middleware/auth";
import { upload } from "../middleware/uploadMiddleware";
import { Resize } from "../service/resizer";
import { isProd, ROUTES } from "../utils";

const router = express.Router();

router.post(
  ROUTES.ATTACHMENT,
  auth,
  upload.single("file"),
  async (req, res) => {
    const imagePath = isProd()
      ? "/var/www/html/learning-portal/node_server/public/attachments"
      : path.join(__dirname, "../../public/attachments");
    const fileUpload = new Resize(imagePath);
    // @ts-ignore
    if (!req.file) {
      res.status(401).json({ error: "Please provide an image" });
    }
    try {
      // @ts-ignore
      const filename = await fileUpload.save(req.file.buffer);
      const attachDB = new Attachment({
        name: filename,
        path: fileUpload.filepath(filename),
      });
      const attach = await attachDB.save();
      return res.status(200).json({ attach });
    } catch (error) {
      return res.status(500).send();
    }
  }
);

router.get(ROUTES.ATTACHMENT, auth, async (req, res) => {
  try {
    return res.status(200).send();
  } catch (error) {
    return res.status(500).send();
  }
});

router.post(ROUTES.CODE_FILE, upload.single("file"), async (req, res) => {
  // @ts-ignore
  const { file } = req;
  const string = String(file.buffer);
  const checingString = "<html";
  if (string.includes(checingString)) {
    return res.status(200).send(`Checked ${checingString}`);
  } else {
    return res.status(200).send("Error in " + checingString);
  }

  return res.status(500).send();
});

export default router;
