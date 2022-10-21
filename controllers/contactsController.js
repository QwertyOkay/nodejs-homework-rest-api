const RequestError = require("../helpers/RequestError");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../services/contacts");

const getContacts = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;
  const contacts = await listContacts(_id, skip, +limit, favorite);
  res.status(200).json({ status: "success", code: 200, data: { contacts } });
};

const getById = async (req, res) => {
  const { id } = req.params;

  const contact = await getContactById(id);
  if (!contact) {
    throw RequestError(404);
  }
  res.status(200).json({ status: "success", code: 200, data: { contact } });
};

const deleteContact = async (req, res) => {
  const { id } = req.params;

  const result = await removeContact(id);
  if (!result) {
    throw RequestError(404);
  }
  res.status(200).json({ message: "contact deleted" });
};

const changeContact = async (req, res) => {
  const { id } = req.params;

  const result = await updateContact(id, req.body);
  if (!result) {
    throw RequestError(404);
  }
  res.status(201).json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

const createContact = async (req, res) => {
  const { name, email, phone, favorite = false } = req.body;
  const { _id } = req.user;

  const newContact = await addContact(name, email, phone, favorite, _id);
  res.status(201).json({ status: "success", code: 201, data: { newContact } });
};

const updateStatus = async (req, res) => {
  const { id } = req.params;

  const updateContact = await updateStatusContact(id, req.body);

  if (!updateContact) {
    return res.status(404).json({ message: "Not found" });
  }
  res.json({ status: "success", code: 200, data: { updateContact } });
};

module.exports = {
  getContacts,
  getById,
  changeContact,
  createContact,
  deleteContact,
  updateStatus,
};
