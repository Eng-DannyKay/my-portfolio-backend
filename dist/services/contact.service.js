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
exports.ContactService = void 0;
class ContactService {
    constructor(contactRepository) {
        this.contactRepository = contactRepository;
    }
    createContact(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newContact = this.contactRepository.create(data);
            yield this.contactRepository.save(newContact);
            return { message: "Your Message sent successfully" };
        });
    }
    getAllContacts() {
        return __awaiter(this, void 0, void 0, function* () {
            const allContactInfo = yield this.contactRepository.find();
            return allContactInfo;
        });
    }
    deleteContactInfo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const contactToDelete = yield this.contactRepository.findOne({ where: { id } });
            if (!contactToDelete) {
                return { message: "Contact not found" };
            }
            else {
                yield this.contactRepository.remove(contactToDelete);
                return { message: "Contact deleted successfully" };
            }
        });
    }
}
exports.ContactService = ContactService;
//# sourceMappingURL=contact.service.js.map