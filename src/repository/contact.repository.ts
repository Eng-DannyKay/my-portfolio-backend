import { DB_Connection } from "../config/data-source";
import { ContactEntity } from "../entities/contact.entity";
import { ContactService } from "../services/contact.service";


export const contactRepository  = new ContactService(
    DB_Connection.getRepository(ContactEntity)
)