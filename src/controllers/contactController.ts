import {Request,Response} from 'express'
import {contactRepository} from '../repository/contact.repository'

export class ContactController { 

    static async createContact(req:Request, res:Response) {
        const data = req.body;
        const result = await contactRepository.createContact(data);
        res.status(201).send(result);
    }

   static async getAllContacts(req: Request, res: Response) { 
        const result = await contactRepository.getAllContacts();
        res.status(200).json(result);
    }
    static async deleteContact(req: Request, res: Response) { 
        const id = req.params.id;
        if (!id) { 
            res.status(400).send({message: "Contact id is required"});
            return;
        } else {
          const result = await contactRepository.deleteContactInfo(id);   
          res.status(200).send(result);
        }
    }


}