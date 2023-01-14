import { Attachment } from "./../models/attachment";
import { auth } from "./../middleware/auth";
import { ReqBodySpacePut } from "./../../../shared/commonParts";
import { ROUTES } from "./../utils";
import { getSignedUrl } from "../service/aws_do";
import express from "express";

const router = express.Router();

router.post(ROUTES.SPACE, auth, async (req, res) => {
  const user = req.user;
  const { file_name, file_type } = req.body as ReqBodySpacePut;

  const signedUrl = getSignedUrl(file_name, file_type);

  try {
    const attachment = new Attachment({
      user_id: user._id,
      name: file_name,
      path: signedUrl,
    });

    await attachment.save();
  } catch {
    console.log(
      "Attachment from space path save have error " +
        file_name +
        " " +
        signedUrl
    );
    return res.status(500).send("Attachment from space path save have error");
  }

  if (!signedUrl) {
    return res.status(404).send();
  }

  return res.json({ signedUrl });
});

export default router;
