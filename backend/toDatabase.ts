import { PrismaClient, Corebase } from "@prisma/client";

const prisma = new PrismaClient()

export const coreBase = {
    create: async (data: any) => {
        return await prisma.corebase.create({data})
    }
}
