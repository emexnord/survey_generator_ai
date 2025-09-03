import { createResponseDto } from "../../../dtos/dto";
import { AppError } from "../../../errors";
import {
  createResponse,
  getResponsesBySurveyId,
} from "../../../utils/response_service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const surveyId = req.nextUrl.searchParams.get("surveyId");
    const response = await getResponsesBySurveyId(surveyId);

    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    const status = error instanceof AppError ? error.statusCode : 500;
    return NextResponse.json({ error: error.message }, { status });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data: createResponseDto = await req.json();

    const io = (global as any).io;

    console.log("data", data);
    console.log("Socket.io instance:", io);
    io.on("connection", () => {
      console.log("A user connected");
    });

    const response = await createResponse({
      surveyId: data.surveyId,
      userEmail: data.userEmail,
      answers: data.answers,
    });

    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    const status = error instanceof AppError ? error.statusCode : 500;
    return NextResponse.json({ error: error.message }, { status });
  }
}
