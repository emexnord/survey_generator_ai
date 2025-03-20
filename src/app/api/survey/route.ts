import { createSurvey } from "@/src/utils/api";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    if (!data.title || typeof data.title !== "string") {
      return NextResponse.json(
        { error: "Invalid title format" },
        { status: 400 }
      );
    }

    const survey = await createSurvey(data);
    return NextResponse.json(survey, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
