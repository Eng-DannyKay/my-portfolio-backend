"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_Connection = void 0;
const typeorm_1 = require("typeorm");
const logger_1 = require("../utils/logger");
const env_1 = require("./env");
const contact_entity_1 = require("../entities/contact.entity");
exports.DB_Connection = new typeorm_1.DataSource({
    type: "postgres",
    host: env_1.env.db.host,
    port: env_1.env.db.port,
    username: env_1.env.db.username,
    password: env_1.env.db.password,
    database: env_1.env.db.name,
    synchronize: true,
    ssl: false,
    entities: [contact_entity_1.ContactEntity],
});
exports.DB_Connection.initialize()
    .then(() => {
    logger_1.logger.info("Data Source has been initialized!");
})
    .catch((error) => {
    logger_1.logger.info("Error during Data Source initialization:", error);
});
//# sourceMappingURL=data-source.js.map