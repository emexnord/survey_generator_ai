import { createUserDto } from "@/dtos/dto";
import { AppError } from "@/errors";
import { createUser, login } from "@/utils/user_service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body: createUserDto = await req.json();
    const user = await createUser(body);
    const result = await login({
      email: user.email || "",
      password: body.password,
    });
    return NextResponse.json(result, { status: 201 });
  } catch (error: any) {
    const status = error instanceof AppError ? error.statusCode : 500;
    return NextResponse.json({ error: error.message }, { status });
  }
}
