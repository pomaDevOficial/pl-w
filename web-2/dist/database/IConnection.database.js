"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../generate/client/index");
const prisma = new index_1.PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL,
        }
    }
});
exports.default = prisma;
