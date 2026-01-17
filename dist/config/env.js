"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var required = function (value, name) {
    if (!value) {
        throw new Error("Missing environment variable: ".concat(name));
    }
    return value;
};
exports.env = {
    db: {
        host: required(process.env.DB_HOST, 'DB_HOST'),
        username: required(process.env.DB_USER, 'DB_USER'),
        password: required(process.env.DB_PASSWORD, 'DB_PASSWORD'),
        name: required(process.env.DB_NAME, 'DB_NAME'),
        port: Number((_a = process.env.DB_PORT) !== null && _a !== void 0 ? _a : 5432),
    },
};
//# sourceMappingURL=env.js.map