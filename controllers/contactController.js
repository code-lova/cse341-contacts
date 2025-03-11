const contactService = require("../services/contactService");

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

//Update a contact detail
exports.updateContact = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  const id = req.params.id;
  const data = req.body;

  try {
    const updatedContact = await contactService.updateContact(id, data);
    if (!updatedContact) {
      return res(404).json({ message: "Contact not Found" });
    }
    res.json({
      updatedContact,
      message: "Contact updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update contact",
      error,
    });
  }
};

exports.deleteContact = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedContact = await contactService.deleteContact(id);
    if (!deletedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete contact", error });
  }
};
