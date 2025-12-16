"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactService = void 0;
class ContactService {
    constructor(contactRepository) {
        this.contactRepository = contactRepository;
    }
    async createContact(data) {
        const newContact = this.contactRepository.create(data);
        await this.contactRepository.save(newContact);
        return { message: "Your Message sent successfully" };
    }
    async getAllContacts() {
        const allContactInfo = await this.contactRepository.find();
        return allContactInfo;
    }
    async deleteContactInfo(id) {
        const contactToDelete = await this.contactRepository.findOne({ where: { id } });
        if (!contactToDelete) {
            return { message: "Contact not found" };
        }
        else {
            await this.contactRepository.remove(contactToDelete);
            return { message: "Contact deleted successfully" };
        }
    }
}
exports.ContactService = ContactService;
//# sourceMappingURL=contact.service.js.map