import { AppError } from "../../../../errors";
import { getResponseById } from "../../../../utils/response_service";
import { NextRequest, NextResponse } from "next/server";

type idParam = Promise<{ id: string }>;

export async function GET(req: NextRequest, { params }: { params: idParam }) {
  try {
    const { id } = await params;
    console.log(id);
    const response = await getResponseById(id);

    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    const status = error instanceof AppError ? error.statusCode : 500;
    return NextResponse.json({ error: error.message }, { status });
  }
}
