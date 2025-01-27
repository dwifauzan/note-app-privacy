import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const baseNote = {
    create: async (data) => {
        return await prisma.databaseNote.create({
            data
        });
    }
};
