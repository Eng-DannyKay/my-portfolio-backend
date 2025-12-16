"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactRepository = void 0;
const data_source_1 = require("../config/data-source");
const contact_entity_1 = require("../entities/contact.entity");
const contact_service_1 = require("../services/contact.service");
exports.contactRepository = new contact_service_1.ContactService(data_source_1.DB_Connection.getRepository(contact_entity_1.ContactEntity));
//# sourceMappingURL=contact.repository.js.map