const express = require("express");
const router = express.Router();

const {
  videoPost,
  videoGet,
  videoPut,
  videoDelete,
} = require("../controllers/videoController.js");

router.post("/video", videoPost);
router.get("/video", videoGet);
router.put("/video", videoPut);
router.patch("/video", videoPut);
router.delete("/video", videoDelete);

module.exports = router;