import { Router } from 'express';
import { ContactController } from '../controllers/contactController';

const router = Router();

router.post('/contact', ContactController.createContact);
router.get('/contact', ContactController.getAllContacts);
router.delete('/contact/:id', ContactController.deleteContact);

export default router;