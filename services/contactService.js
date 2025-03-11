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

// Update a contact detail
const updateContact = async (id, data) => {
  return await Contacts.findByIdAndUpdate(id, data, { new: true });
};

// Delete a contact
const deleteContact = async (id) => {
  return await Contacts.findByIdAndDelete(id);
};

module.exports = {
  createContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact
};
