import { Request, Response } from 'express';
import { Contact } from '../model/contact.model';
import { EmailService } from '../services/emailService';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const sanitizeInput = (input: string): string => {
  return input.trim().replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
};

export class ContactController {
  static async createContact(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, subject, message } = req.body;

      if (!name || !email || !subject || !message) {
        res.status(400).json({ 
          message: "All fields are required"
        });
        return;
      }

      if (name.length > 100 || subject.length > 200 || message.length > 2000) {
        res.status(400).json({ 
          message: "Input exceeds maximum length"
        });
        return;
      }

      if (!emailRegex.test(email)) {
        res.status(400).json({ 
          message: "Invalid email format"
        });
        return;
      }

      const sanitizedName = sanitizeInput(name);
      const sanitizedSubject = sanitizeInput(subject);
      const sanitizedMessage = sanitizeInput(message);
      const sanitizedEmail = email.toLowerCase().trim();

      const newContact = new Contact({
        name: sanitizedName,
        email: sanitizedEmail,
        subject: sanitizedSubject,
        message: sanitizedMessage
      });

      await newContact.save();

      const emailData = {
        name: sanitizedName,
        email: sanitizedEmail,
        subject: sanitizedSubject,
        message: sanitizedMessage
      };

      const [notificationResult, confirmationResult] = await Promise.allSettled([
        EmailService.sendContactNotification(emailData),
        EmailService.sendConfirmationEmail(emailData)
      ]);

      if (notificationResult.status === 'rejected') {
        console.error('Failed to send notification email:', notificationResult.reason);
      }

      if (confirmationResult.status === 'rejected') {
        console.error('Failed to send confirmation email:', confirmationResult.reason);
      }

      res.status(201).json({
        message: "Your message sent successfully",
        data: {
          id: newContact._id,
          name: newContact.name,
          subject: newContact.subject,
          createdAt: newContact.createdAt
        }
      });
      return;
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
      return;
    }
  }

  static async getAllContacts(req: Request, res: Response): Promise<void> {
    try {
      const apiKey = req.headers['x-api-key'];
      
      if (apiKey !== process.env.ADMIN_API_KEY) {
        res.status(403).json({ message: "Unauthorized access" });
        return;
      }

      const contacts = await Contact.find().sort({ createdAt: -1 });
      
      res.status(200).json({
        message: "Contacts retrieved successfully",
        count: contacts.length,
        data: contacts
      });
      return;
    } catch (error: any) {
      console.error('Error getting contacts:', error);
      res.status(500).json({ 
        message: "Failed to get contacts",
        error: process.env.NODE_ENV === 'production' ? 'Server error' : error.message
      });
      return;
    }
  }

  static async deleteContact(req: Request, res: Response): Promise<void> {
    try {
      const apiKey = req.headers['x-api-key'];
      
      if (apiKey !== process.env.ADMIN_API_KEY) {
        res.status(403).json({ message: "Unauthorized access" });
        return;
      }

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
      return;
    } catch (error: any) {
      console.error('Error deleting contact:', error);
      res.status(500).json({ 
        message: "Failed to delete contact",
        error: process.env.NODE_ENV === 'production' ? 'Server error' : error.message
      });
      return;
    }
  }
}
