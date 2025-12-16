"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contactController_1 = require("../controllers/contactController");
const contactRoutes = (0, express_1.Router)();
contactRoutes.post("/contact", contactController_1.ContactController.createContact);
contactRoutes.get("/contacts", contactController_1.ContactController.getAllContacts);
contactRoutes.delete("/contacts/:id", contactController_1.ContactController.deleteContact);
exports.default = contactRoutes;
//# sourceMappingURL=contact.routes.js.map