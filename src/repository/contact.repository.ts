import { ContactEntity } from "../entities/contact.entity";
import { ContactService } from "../services/contact.service";
import { DB_Connection } from "../config/data-source";

const getContactService = async () => {
  const dataSource = await DB_Connection;
  const repository = dataSource.getRepository(ContactEntity);
  return new ContactService(repository);
};

export const contactRepository = {
  createContact: async (data: ContactEntity) => {
    const service = await getContactService();
    return service.createContact(data);
  },
  getAllContacts: async () => {
    const service = await getContactService();
    return service.getAllContacts();
  },
  deleteContactInfo: async (id: string) => {
    const service = await getContactService();
    return service.deleteContactInfo(id);
  },
};