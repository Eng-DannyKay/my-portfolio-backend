import { Repository } from "typeorm";
import { ContactEntity } from "../entities/contact.entity";
import { MessageRes } from "../dtos/contact.dto";

export class ContactService { 
    constructor(private contactRepository : Repository<ContactEntity>){}

    async createContact(data: ContactEntity): Promise<MessageRes> { 
        const newContact = this.contactRepository.create(data);
        await this.contactRepository.save(newContact);
        return {message: "Your Message sent successfully"};
    }
    async getAllContacts(): Promise<ContactEntity[]> {
        const allContactInfo = await this.contactRepository.find();
    return allContactInfo;
    }
    
    async deleteContactInfo(id: string): Promise<void | MessageRes> {
        const contactToDelete = await this.contactRepository.findOne({ where: { id } });
        if (!contactToDelete) { 
           return {message: "Contact not found"};
        } else {
            await this.contactRepository.remove(contactToDelete);
            return {message: "Contact deleted successfully"};
        }
    }

}