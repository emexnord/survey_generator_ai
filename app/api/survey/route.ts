import { authenticateRequest } from "@/utils/jwt";
import { AppError } from "../../../errors";
import { createSurvey, getAllSurveys } from "../../../utils/survey_service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const user = await authenticateRequest(req); // Authenticate the request
    const data = await req.json();

    const survey = await createSurvey({ ...data, userId: user.id }); // Attach user info if needed
    return NextResponse.json(survey, { status: 201 });
  } catch (error: any) {
    const status = error instanceof AppError ? error.statusCode : 500;
    return NextResponse.json({ error: error.message }, { status });
  }
}

export async function GET(req: NextRequest) {
  try {
    const user = await authenticateRequest(req); // Authenticate the request
    const surveys = await getAllSurveys(user.id);
    return NextResponse.json(surveys);
  } catch (error: any) {
    const status = error instanceof AppError ? error.statusCode : 500;
    return NextResponse.json({ error: error.message }, { status });
  }
}
