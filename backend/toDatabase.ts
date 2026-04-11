import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

export const coreBase = {
	create: async (data: Prisma.CorebaseCreateInput) => {
		return await prisma.corebase.create({ data })
	},
	findAll: async () => {
		return await prisma.corebase.findMany({})
	},
	delete: async (id: number) => {
		return await prisma.corebase.delete({ where: { id } })
	},
}