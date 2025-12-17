"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const pino_1 = __importDefault(require("pino"));
const isProd = process.env.NODE_ENV === 'production';
exports.logger = (0, pino_1.default)(Object.assign({ level: (_a = process.env.LOG_LEVEL) !== null && _a !== void 0 ? _a : 'info' }, (isProd
    ? {}
    : {
        transport: {
            target: 'pino-pretty',
            options: {
                colorize: true,
                translateTime: 'yyyy-mm-dd HH:MM:ss',
                ignore: 'pid,hostname',
            },
        },
    })));
//# sourceMappingURL=logger.js.map