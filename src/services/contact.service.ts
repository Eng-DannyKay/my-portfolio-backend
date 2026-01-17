import { Repository } from "typeorm";
import { ContactEntity } from "../entities/contact.entity";
import { MessageRes } from "../dtos/contact.dto";

export class ContactService { 
    constructor(private readonly contactRepository: Repository<ContactEntity>) {}

    async createContact(data: ContactEntity): Promise<MessageRes> {
        try {
            const newContact = this.contactRepository.create(data);
            await this.contactRepository.save(newContact);
            return { message: "Your message sent successfully" };
        } catch (error) {
            console.error('Service error creating contact:', error);
            throw new Error(`Failed to create contact: ${error}`);
        }
    }

    async getAllContacts(): Promise<ContactEntity[]> {
        try {
            const allContactInfo = await this.contactRepository.find();
            return allContactInfo;
        } catch (error) {
            console.error('Service error getting contacts:', error);
            throw new Error(`Failed to get contacts: ${error}`);
        }
    }
    
    async deleteContactInfo(id: string): Promise<MessageRes> {
        try {
            const contactToDelete = await this.contactRepository.findOne({ where: { id } });
            
            if (!contactToDelete) { 
                return { message: "Contact not found" };
            }
            
            await this.contactRepository.remove(contactToDelete);
            return { message: "Contact deleted successfully" };
        } catch (error) {
            console.error('Service error deleting contact:', error);
            throw new Error(`Failed to delete contact: ${error}`);
        }
    }
}