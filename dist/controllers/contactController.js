"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactController = void 0;
const contact_repository_1 = require("../repository/contact.repository");
class ContactController {
    static createContact(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const result = yield contact_repository_1.contactRepository.createContact(data);
            res.status(201).send(result);
        });
    }
    static getAllContacts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield contact_repository_1.contactRepository.getAllContacts();
            res.status(200).json(result);
        });
    }
    static deleteContact(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            if (!id) {
                res.status(400).send({ message: "Contact id is required" });
                return;
            }
            else {
                const result = yield contact_repository_1.contactRepository.deleteContactInfo(id);
                res.status(200).send(result);
            }
        });
    }
}
exports.ContactController = ContactController;
//# sourceMappingURL=contactController.js.map