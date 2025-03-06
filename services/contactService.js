const Contacts = require("../models/contacts");

// Fetch all contacts
const getAllContacts = async () => {
  return await Contacts.find();
};

// get a contact by Id
const getContactById = async(id) => {
  return await Contacts.findById(id);
}

// Create a new contact
const createContact = async (data) => {
  return await Contacts.create(data);
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
};
