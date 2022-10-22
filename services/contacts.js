const { Contact } = require("../schemas/contactSchema");

const listContacts = async (id, skip, limit) => {
  const data = await Contact.find(
    { owner: id, favorite: favorite || { $in: [true, false] } },
    "",
    {
      skip,
      limit,
    }
  ).populate("owner", "id email");
  return data;
};

const getContactById = async (contactId) => {
  const data = await Contact.findById(contactId);
  return data;
};

const removeContact = async (contactId) => {
  const data = await Contact.findByIdAndRemove(contactId);
  return data;
};

const addContact = async (name, email, phone, favorite, id) => {
  const data = await Contact.create({
    name,
    email,
    phone,
    favorite,
    owner: id,
  });
  return data;
};

const updateContact = async (contactId, body) => {
  const data = await Contact.findByIdAndUpdate(contactId, body, { new: true });
  return data;
};

const updateStatusContact = async (contactId, body) => {
  const data = await Contact.findByIdAndUpdate(contactId, body, { new: true });
  return data;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
