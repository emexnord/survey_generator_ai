import { createUserDto } from "@/dtos/dto";
import { AppError } from "@/errors";
import { hashPassword } from "@/lib/utils";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createUser = async ({ name, email, password }: createUserDto) => {
  try {
    const new_user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword(password),
      },
    });
    return new_user;
  } catch (error: any) {
    if (error.code === "P2002") {
      throw new AppError("User with this email already exists", 400);
    }
    throw error;
  }
};

export const getUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user;
};
