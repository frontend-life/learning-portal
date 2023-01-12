import express from "express";
import path from "path";

import { Attachment } from "../models/attachment";
import { auth } from "../middleware/auth";
import { upload } from "../middleware/uploadMiddleware";
import { Resize } from "../service/resizer";
import { ROUTES } from "../utils";

const router = express.Router();

router.post(
  ROUTES.ATTACHMENT,
  auth,
  upload.single("file"),
  async (req, res) => {
    const imagePath = path.join(__dirname, "../../public/attachments");
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

export default router;
