import { ObjectId } from "mongodb";
import { createUserDto, loginDto } from "../dtos/dto";
import { createUser as createUserInDb, getUserByEmail } from "@/prisma/user";
import { AppError } from "../errors";
import { exclude, hashPassword } from "@/lib/utils";
import { User } from "@/types/user.type";
import { generateTokens } from "./jwt";
import { OAuth2Client } from "google-auth-library";

export async function createUser(data: createUserDto): Promise<Partial<User>> {
  if (!data.name || !data.email || !data.password) {
    throw new AppError("Name, email and password are required", 400);
  }

  const user = await createUserInDb({
    name: data.name,
    email: data.email,
    password: data.password,
  });

  return exclude(user, ["password"]);
}

export async function login(data: loginDto): Promise<{
  user: Partial<User>;
  tokens: { accessToken: string; refreshToken: string };
}> {
  if (!data.email || !data.password) {
    throw new AppError("Email and password are required", 400);
  }

  const user = await getUserByEmail(data.email);
  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (!user.password || user.password !== hashPassword(data.password)) {
    throw new AppError("Invalid password", 401);
  }

  const tokens = generateTokens(user.id, user.email);
  return { user: exclude(user, ["password"]), tokens };
}

export async function handleGoogleUser(token: string): Promise<{
  user: Partial<User>;
  tokens: { accessToken: string; refreshToken: string };
}> {
  try {
    const googleClient = new OAuth2Client(process.env.AUTH_GOOGLE_ID);
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, username } = payload as any;

    let user = await getUserByEmail(email);

    if (!user) {
      // Create new user without password
      user = await createUserInDb({ name: username, email, password: "" });
    }

    const tokens = generateTokens(user.id, user.email);
    return { user: exclude(user, ["password"]), tokens };
  } catch (error) {
    console.error("Error in verifying google token:", error);
    throw new AppError("Error in verifying google token", 500);
  }
}
