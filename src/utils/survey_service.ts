import { GenerateSurveyDto, SurveyResponseDto } from "../dtos/dto";
import { createSurvey as createSurveyInDb } from "../prisma/survey";
import { Question } from "../types/question.type";
import { generateSurveyQuestions } from "./ai";

export async function createSurvey(
  data: GenerateSurveyDto
): Promise<SurveyResponseDto> {
  if (!data.title) throw new Error("Title is required");

  // Generate questions using AI
  const questions = await generateSurveyQuestions(data.title);

  // Store in the database
  const survey = await createSurveyInDb({ title: data.title, questions });

  return {
    id: survey.id,
    title: survey.title,
    questions: survey.questions as Question[],
    createdAt: survey.createdAt,
  };
}
