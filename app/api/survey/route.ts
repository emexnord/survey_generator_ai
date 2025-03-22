import { AppError } from "../../../errors";
import { createSurvey, getAllSurveys } from "../../../utils/survey_service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const survey = await createSurvey(data);
    return NextResponse.json(survey, { status: 201 });
  } catch (error: any) {
    const status = error instanceof AppError ? error.statusCode : 500;
    return NextResponse.json({ error: error.message }, { status });
  }
}

export async function GET() {
  try {
    const surveys = await getAllSurveys();
    return NextResponse.json(surveys);
  } catch (error: any) {
    const status = error instanceof AppError ? error.statusCode : 500;
    return NextResponse.json({ error: error.message }, { status });
  }
}
