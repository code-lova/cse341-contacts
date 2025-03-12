const express = require("express");
const {
  getContacts,
  getContactById,
  createContacts,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");
const router = express.Router();
const authenticateAPIKey = require("../utils/apiKeyMiddleware");


router.post("/contacts", authenticateAPIKey, createContacts);
router.get("/contacts", authenticateAPIKey, getContacts);
router.get("/contacts/:id", authenticateAPIKey, getContactById);
router.put("/contacts/:id", authenticateAPIKey, updateContact);
router.delete("/contacts/:id", authenticateAPIKey, deleteContact);

module.exports = router;
