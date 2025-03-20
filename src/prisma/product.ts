import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()


export const createProduct = async (title, price ){
    const product = await prisma.product.create({
        data: {
            title,
            price
        }
    })
    return product
}