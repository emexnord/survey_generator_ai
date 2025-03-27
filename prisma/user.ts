import { createUserDto } from "@/dtos/dto";
import { hashPassword } from "@/lib/utils";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createUser = async ({ name, email, password }: createUserDto) => {
  const new_user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashPassword(password),
    },
  });
  return new_user;
};

export const getUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user;
};
