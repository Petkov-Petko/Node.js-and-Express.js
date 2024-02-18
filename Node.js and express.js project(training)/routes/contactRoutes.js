import express from "express";
const router = express.Router();
import { getContact, createContact, getContacts, updateContact, deleteContact } from "../controllers/contactControll.js";

router.route("/").get(getContacts);

router.route("/").post(createContact);

router.route("/:id").get(getContact);

router.route("/:id").put(updateContact);

router.route("/:id").delete(deleteContact);

export default router;
