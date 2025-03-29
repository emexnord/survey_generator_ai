import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { SHA256 as sha256 } from "crypto-js";
import { User } from "@/types/user.type";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const hashPassword = (code: string) => {
  return sha256(code).toString();
};

// Function to exclude user password returned from prisma
export function exclude(user: User, keys: (keyof User)[]): Partial<User> {
  for (const key of keys) {
    delete user[key];
  }
  return user;
}
