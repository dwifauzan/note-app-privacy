import { PrismaClient, databaseNote } from "@prisma/client";

const prisma = new PrismaClient()

export const baseNote =  {
    create: async (
        data: Omit<databaseNote, 'id' | 'createdAt' | 'updatedAt'>
    ) => {
        return await prisma.databaseNote.create({
            data
        })
    }
}