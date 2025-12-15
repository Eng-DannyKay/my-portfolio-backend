import { Repository } from "typeorm";
import { ContactEntity } from "../entities/contact.entity";

export class ContactService { 
    constructor(private contactRepository : Repository<ContactEntity>){}

    async createContact(data: ContactEntity): Promise<void> { 
        const newContact = this.contactRepository.create(data);
        await this.contactRepository.save(newContact);
    }
    async getAllContacts(): Promise<ContactEntity[]> {
        const allContactInfo = await this.contactRepository.find();
    return allContactInfo;
    }
    
    async deleteContactInfo(id: string): Promise<void| {message: string}> {
        const contactToDelete = await this.contactRepository.findOne({ where: { id } });
        if (!contactToDelete) { 
           return {message: "Contact not found"};
        } else {
            await this.contactRepository.remove(contactToDelete);
            return {message: "Contact deleted successfully"};
        }
    }

}