import { ReqBodySpacePut } from "./../../../shared/commonParts";
import { ROUTES } from "./../utils";
import { getSignedUrl } from "../service/aws_do";
import express from "express";

const router = express.Router();

router.post(ROUTES.SPACE, (req, res) => {
  const { file_name, file_type } = req.body as ReqBodySpacePut;

  const signedUrl = getSignedUrl(file_name, file_type);

  if (!signedUrl) {
    return res.status(404).send();
  }

  return res.json({ signedUrl });
});

export default router;
