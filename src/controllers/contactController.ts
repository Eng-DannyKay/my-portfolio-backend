import { Request, Response } from 'express';
import { Contact } from '../model/contact.model';


export class ContactController {
  static async createContact(req: Request, res: Response) {
    try {
      const { name, email, subject, message } = req.body;

      if (!name || !email || !subject || !message) {
        res.status(400).json({ 
          message: "All fields are required",
          fields: { name, email, subject, message }
        });
        return;
      }

      const newContact = new Contact({
        name,
        email,
        subject,
        message
      });

      await newContact.save();

      res.status(201).json({
        message: "Your message sent successfully",
        data: newContact
      });
    } catch (error: any) {
      console.error('Error creating contact:', error);
      
      if (error.name === 'ValidationError') {
        res.status(400).json({ 
          message: "Validation error",
          errors: Object.values(error.errors).map((e: any) => e.message)
        });
        return;
      }

      res.status(500).json({ 
        message: "Failed to send message",
        error: process.env.NODE_ENV === 'production' ? 'Server error' : error.message
      });
    }
  }

  static async getAllContacts(req: Request, res: Response) {
    try {
      const contacts = await Contact.find().sort({ createdAt: -1 });
      
      res.status(200).json({
        message: "Contacts retrieved successfully",
        count: contacts.length,
        data: contacts
      });
    } catch (error: any) {
      console.error('Error getting contacts:', error);
      res.status(500).json({ 
        message: "Failed to get contacts",
        error: process.env.NODE_ENV === 'production' ? 'Server error' : error.message
      });
    }
  }

  static async deleteContact(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({ message: "Contact id is required" });
        return;
      }

      const deletedContact = await Contact.findByIdAndDelete(id);

      if (!deletedContact) {
        res.status(404).json({ message: "Contact not found" });
        return;
      }

      res.status(200).json({
        message: "Contact deleted successfully",
        data: deletedContact
      });
    } catch (error: any) {
      console.error('Error deleting contact:', error);
      res.status(500).json({ 
        message: "Failed to delete contact",
        error: process.env.NODE_ENV === 'production' ? 'Server error' : error.message
      });
    }
  }
}