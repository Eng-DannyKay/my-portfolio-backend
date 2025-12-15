import { DB_Connection } from "../config/data-source";
import { ContactEntity } from "../entities/contact.entity";

const contactRepository = DB_Connection.getRepository(ContactEntity);