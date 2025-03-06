const express = require("express");
const { getContacts, getContactById, createContacts } = require("../controllers/contactController");
const router = express.Router();

router.get("/contacts", getContacts);
router.get("/contacts/:id", getContactById);
router.post("/contacts", createContacts);

module.exports = router;