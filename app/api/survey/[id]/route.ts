import { AppError } from "../../../../errors";
import { getSurveyById } from "../../../../utils/survey_service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const survey = await getSurveyById(id);

    return NextResponse.json(survey, { status: 200 });
  } catch (error: any) {
    const status = error instanceof AppError ? error.statusCode : 500;
    return NextResponse.json({ error: error.message }, { status });
  }
}
