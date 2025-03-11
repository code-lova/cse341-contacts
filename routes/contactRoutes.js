const express = require("express");
const {
  getContacts,
  getContactById,
  createContacts,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");
const router = express.Router();

router.get("/contacts", getContacts);
router.get("/contacts/:id", getContactById);
router.post("/contacts", createContacts);
router.put("/contacts/:id", updateContact);
router.delete("/contacts/:id", deleteContact);

module.exports = router;
