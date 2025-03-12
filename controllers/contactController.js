require("dotenv").config();
const contactService = require("../services/contactService");

//Create new contact
exports.createContacts = async (req, res) => {
  /*
    #swagger.tags = ['Contacts']
    #swagger.summary = 'Create a new contact'
    #swagger.description = 'Creates a new contact detail'
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Contact details',
      required: true,
      schema: { $ref: '#/definitions/ContactInput' }
    }
  */

  const { firstName, lastName, email, favoriteColor, birthday } = req.body;

  // Validate required fields
  if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  const data = { firstName, lastName, email, favoriteColor, birthday };

  try {
    const newContact = await contactService.createContact(data);
    if (!newContact) {
      return res.status(500).json({ message: "Failed to create new contact" });
    }
    return res.status(201).json(newContact);
  } catch (error) {
    console.error(error); // Logs error for debugging
    return res.status(500).json({ message: "Internal server error", error });
  }
};

// Fetch all contact details
exports.getContacts = async (req, res) => {
  /*
    #swagger.tags = ['Contacts']
    #swagger.summary = 'Retrieve all contacts'
    #swagger.description = 'Fetches all stored contact details from the database.'
    #swagger.responses[200] = {
      description: 'List of contacts retrieved successfully',
      schema: [{ 
        id: "12345",
        firstName: "John",
        lastName: "Doe",
        email: "johndoe@example.com",
        favoriteColor: "Blue",
        birthday: "1985-09-23"
      }]
    }
    #swagger.responses[404] = { description: 'No contact data found' }
    #swagger.responses[500] = { description: 'Server error' }
  */
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
  /*
    #swagger.tags = ['Contacts']
    #swagger.summary = 'Retrieve a contact by ID'
    #swagger.description = 'Fetches contact details based on a provided ID.'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'ID of the contact to retrieve',
      required: true,
      type: 'string'
    }
    #swagger.responses[200] = {
      description: 'Contact details retrieved successfully',
      schema: {
        id: "12345",
        firstName: "John",
        lastName: "Doe",
        email: "johndoe@example.com",
        favoriteColor: "Blue",
        birthday: "1985-09-23"
      }
    }
    #swagger.responses[404] = { description: 'Contact not found' }
    #swagger.responses[500] = { description: 'Failed to fetch contact details' }
  */
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
  /*
    #swagger.tags = ['Contacts']
    #swagger.summary = 'Update contact by ID'
    #swagger.description = 'Updates an existing contact'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'Contact ID',
      required: true,
      type: 'string'
    }
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Updated contact details',
      required: true,
      schema: { $ref: '#/definitions/ContactInput' }
    }
  */
  const id = req.params.id;

  const { firstName, lastName, email, favoriteColor, birthday } = req.body;

  if (!firstName && !lastName && !email && !favoriteColor && !birthday) {
    return res
      .status(400)
      .json({ message: "At least one field is required for update!" });
  }

  try {
    const updatedContact = await contactService.updateContact(id, req.body);
    if (!updatedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    return res.json({
      updatedContact,
      message: "Contact updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to update contact",
      error,
    });
  }
};

exports.deleteContact = async (req, res) => {
  /*
    #swagger.tags = ['Contacts']
    #swagger.summary = 'Delete a contact'
    #swagger.description = 'Deletes a contact from the database based on the provided ID.'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'ID of the contact to delete',
      required: true,
      type: 'string'
    }
    #swagger.responses[200] = { description: 'Contact deleted successfully' }
    #swagger.responses[404] = { description: 'Contact not found' }
    #swagger.responses[500] = { description: 'Failed to delete contact' }
  */
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
