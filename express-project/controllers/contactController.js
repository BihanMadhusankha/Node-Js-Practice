const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');

//@desc Get all contacts
//@route GET /api/contacts
//@access private
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({ user_id: req.user.id });
    res.status(200).json(contacts);
})

//@desc Create New contacts
//@route Post /api/contacts
//@access private
const createContacts = asyncHandler(async (req, res) => {
    console.log("The request body", req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    });
    res.status(200).json(contact);
})

//@desc Get contacts
//@route Get /api/contacts/:id
//@access private
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
})

//@desc Update contacts
//@route Put /api/contacts/:id
//@access private
const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    if (contact.user_id.toString()!== req.user.id.toString()) {
        res.status(403);
        throw new Error("You are not authorized to update this contact");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.status(200).json(updatedContact);
})

//@desc Delete contacts
//@route Delete /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
  
    if (!contact) {
      res.status(404);
      throw new Error("Contact not found");
    }
  
    if (contact.user_id.toString() !== req.user.id.toString()) {
      res.status(403);
      throw new Error("You are not authorized to delete this contact");
    }
  
    try {
      await Contact.deleteOne({ _id: req.params.id }); // Use deleteOne with specific filter
      res.status(200).json({ message: "Contact deleted successfully" }); // Informative response
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).json({ message: "Error deleting contact" }); // Handle potential errors
    }
  });
  

module.exports = {
    getContacts: getContacts,
    createContacts: createContacts,
    getContact: getContact,
    updateContact: updateContact,
    deleteContact: deleteContact
};