import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

import {getGoal} from "./contracts/Goal"

import getWeb3 from "./getWeb3";

const w3 = await getWeb3();

export async function getContacts(query) {

  //get hard coded goals
    let g = await getGoal(w3, '0x4d56dCF8F1983b0fECFF9B38E45fEd1B11B2F2D0')
    console.log(g);
    let gg = await getGoal(w3, '0xeD02C019724637232cd55940c78B90354a4D1B60')
    
    return [g, gg];
//   await fakeNetwork(`getContacts:${query}`);
//   let contacts = await localforage.getItem("contacts");
//   if (!contacts) contacts = [];
//   if (query) {
//     contacts = matchSorter(contacts, query, { keys: ["first", "last"] });
//   }
//   return contacts.sort(sortBy("last", "createdAt"));
}

export async function createContact() {
//   await fakeNetwork();
//   let id = Math.random().toString(36).substring(2, 9);
//   let contact = { id, createdAt: Date.now() };
//   let contacts = await getContacts(w3);
//   contacts.unshift(contact);
//   await set(contacts);
  return await getGoal(w3, '0x4d56dCF8F1983b0fECFF9B38E45fEd1B11B2F2D0');
}

export async function getContact(address) {
    return await getGoal(w3, address)
//     await fakeNetwork(`contact:${id}`);
//   let contacts = await localforage.getItem("contacts");
//   let contact = contacts.find(contact => contact.id === id);
//   return contact ?? null;
}

export async function updateContact(id, updates) {
  await fakeNetwork();
  let contacts = await localforage.getItem("contacts");
  let contact = contacts.find(contact => contact.id === id);
  if (!contact) throw new Error("No contact found for", id);
  Object.assign(contact, updates);
  await set(contacts);
  return contact;
}

export async function deleteContact(id) {
  let contacts = await localforage.getItem("contacts");
  let index = contacts.findIndex(contact => contact.id === id);
  if (index > -1) {
    contacts.splice(index, 1);
    await set(contacts);
    return true;
  }
  return false;
}

function set(contacts) {
  return localforage.setItem("contacts", contacts);
}

// fake a cache so we don't slow down stuff we've already seen
let fakeCache = {};

async function fakeNetwork(key) {
  if (!key) {
    fakeCache = {};
  }

  if (fakeCache[key]) {
    return;
  }

  fakeCache[key] = true;
  return new Promise(res => {
    setTimeout(res, Math.random() * 800);
  });
}