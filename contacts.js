const { randomUUID } = require("crypto");

const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    // console.table(contacts);
    return contacts;
  } catch (error) {
    console.error(error);
  }
}

async function getContactById(contactId) {
  const stringifiedId = contactId.toString();
  try {
    const contacts = await listContacts();
    const contact = contacts.find((c) => c.id === stringifiedId);
    console.log(contact);
  } catch (error) {
    console.error(error);
  }
}

async function removeContact(contactId) {
  const stringifiedId = contactId.toString();
  try {
    const contacts = await listContacts();
    const newContacts = contacts.filter((c) => c.id !== stringifiedId);
    await fs.writeFile(contactsPath, JSON.stringify(newContacts), "utf-8");
  } catch (error) {
    console.error(error);
  }
}

async function addContact(name, email, phone) {
  const id = randomUUID();
  const newContact = {
    id,
    name,
    email,
    phone,
  };
  try {
    const contacts = await listContacts();
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts), "utf-8");
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
