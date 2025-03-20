import { GenerateSurveyDto, SurveyResponseDto } from "../app/api/survey/dto";
import { generateSurveyQuestions } from "./ai";

export async function createSurvey(
  data: GenerateSurveyDto
): Promise<SurveyResponseDto> {
  if (!data.title) throw new Error("Title is required");

  // Generate questions using AI
  const questions = await generateSurveyQuestions(data.title);

  // Store in the database
  const survey = await saveSurvey({ title: data.title, questions });

  return {
    id: survey.id,
    title: survey.title,
    questions: survey.questions,
    createdAt: survey.createdAt,
  };
}
