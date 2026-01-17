import { Request, Response } from 'express';
import { contactRepository } from '../repository/contact.repository';

export class ContactController { 

    static async createContact(req: Request, res: Response) {
        try {
            const data = req.body;
            
            if (!data.name || !data.email || !data.message) {
                res.status(400).json({ message: "Missing required fields" });
                return;
            }
            
            const result = await contactRepository.createContact(data);
            res.status(201).json(result);
        } catch (error) {
            console.error('Error creating contact:', error);
            res.status(500).json({ message: "Failed to create contact", error: String(error) });
        }
    }

    static async getAllContacts(req: Request, res: Response) {
        try {
            const result = await contactRepository.getAllContacts();
            res.status(200).json(result);
        } catch (error) {
            console.error('Error getting contacts:', error);
            res.status(500).json({ message: "Failed to get contacts", error: String(error) });
        }
    }

    static async deleteContact(req: Request, res: Response) {
        try {
            const id = req.params.id;
            
            if (!id) { 
                res.status(400).json({ message: "Contact id is required" });
                return;
            }
            
            const result = await contactRepository.deleteContactInfo(id);
            res.status(200).json(result);
        } catch (error) {
            console.error('Error deleting contact:', error);
            res.status(500).json({ message: "Failed to delete contact", error: String(error) });
        }
    }
}