const express = require("express");
const router = express.Router();
const {
  createLabel,
  getLabels,
  updateLabel,
  deleteLabel,
  assignLabel,
} = require("../controller/labelController");

router.post("/labels", createLabel);
router.get("/labels", getLabels);
router.put("/labels", updateLabel);
router.delete("/labels/:id", deleteLabel);
router.post("/labels/assign", assignLabel);

module.exports = router;
