import { AppError } from "@/errors";
import { authenticateRequest, generateTokens } from "@/utils/jwt";
import { login } from "@/utils/user_service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const user = await authenticateRequest(req, true);
    const { accessToken } = generateTokens(user.id, user.email);
    return NextResponse.json(accessToken, { status: 200 });
  } catch (error: any) {
    const status = error instanceof AppError ? error.statusCode : 500;
    return NextResponse.json({ error: error.message }, { status });
  }
}
