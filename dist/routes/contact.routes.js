"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var contactController_1 = require("../controllers/contactController");
var router = (0, express_1.Router)();
router.post('/contact', contactController_1.ContactController.createContact);
router.get('/contact', contactController_1.ContactController.getAllContacts);
router.delete('/contact/:id', contactController_1.ContactController.deleteContact);
exports.default = router;
//# sourceMappingURL=contact.routes.js.map