import { AppError } from "@/errors";
import { login } from "@/utils/user_service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = await login(body);
    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    const status = error instanceof AppError ? error.statusCode : 500;
    return NextResponse.json({ error: error.message }, { status });
  }
}
