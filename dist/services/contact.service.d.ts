import { Repository } from "typeorm";
import { ContactEntity } from "../entities/contact.entity";
import { MessageRes } from "../dtos/contact.dto";
export declare class ContactService {
    private contactRepository;
    constructor(contactRepository: Repository<ContactEntity>);
    createContact(data: ContactEntity): Promise<MessageRes>;
    getAllContacts(): Promise<ContactEntity[]>;
    deleteContactInfo(id: string): Promise<void | MessageRes>;
}
//# sourceMappingURL=contact.service.d.ts.map