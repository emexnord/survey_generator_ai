import { AppError } from "@/errors";
import { handleGoogleUser } from "@/utils/user_service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const token = req.nextUrl.searchParams.get("token");
    if (!token) {
      throw new AppError("Token is required", 400);
    }
    const result = await handleGoogleUser(token as string);
    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    const status = error instanceof AppError ? error.statusCode : 500;
    return NextResponse.json({ error: error.message }, { status });
  }
}
