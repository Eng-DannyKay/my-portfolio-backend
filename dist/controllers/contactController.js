"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactController = void 0;
const contact_repository_1 = require("../repository/contact.repository");
class ContactController {
    static async createContact(req, res) {
        const data = req.body;
        const result = await contact_repository_1.contactRepository.createContact(data);
        res.status(201).send(result);
    }
    static async getAllContacts(req, res) {
        const result = await contact_repository_1.contactRepository.getAllContacts();
        res.status(200).json(result);
    }
    static async deleteContact(req, res) {
        const id = req.params.id;
        if (!id) {
            res.status(400).send({ message: "Contact id is required" });
            return;
        }
        else {
            const result = await contact_repository_1.contactRepository.deleteContactInfo(id);
            res.status(200).send(result);
        }
    }
}
exports.ContactController = ContactController;
//# sourceMappingURL=contactController.js.map