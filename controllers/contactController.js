const contactService = require("../services/contactService");

// Fetch all contact details
exports.getContacts = async (req, res) => {
  try {
    const contacts = await contactService.getAllContacts();
    if (!contacts) {
      return res.status(404).json({ message: "No contact data found" });
    }
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// fetch contact by id
exports.getContactById = async (req, res) => {
  const id = req.params.id;
  try {
    const contact = await contactService.getContactById(id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.json(contact);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch contact details",
      error,
    });
  }
};

//Create new contact
exports.createContacts = async (req, res) => {
  const data = req.body;
  try {
    const newContact = await contactService.createContact(data);
    if (newContact) {
      res.status(201).json(newContact);
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to create new contact", error });
  }
};
