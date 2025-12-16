import { Router } from "express";
import { ContactController } from "../controllers/contactController";

const contactRoutes = Router();

contactRoutes.post("/contact", ContactController.createContact);
contactRoutes.get("/contacts", ContactController.getAllContacts);
contactRoutes.delete("/contacts/:id", ContactController.deleteContact);

export default contactRoutes;