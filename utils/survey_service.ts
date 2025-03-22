import { ObjectId } from "mongodb";
import { GenerateSurveyDto, SurveyDto } from "../dtos/dto";
import { AppError } from "../errors";
import {
  createSurvey as createSurveyInDb,
  getAllSurveys as getAllSurveysFromDb,
  getSurveyById as getSurveyByIdFromDb,
} from "../prisma/survey";
import { Question } from "../types/question.type";
import { Response } from "../types/response.type";
import { generateSurveyQuestions } from "./ai";

export async function createSurvey(
  data: GenerateSurveyDto
): Promise<SurveyDto> {
  if (!data.title) throw new AppError("Title is required", 400);

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

export async function getAllSurveys(): Promise<SurveyDto[]> {
  // Fetch all surveys from the database
  const surveys = await getAllSurveysFromDb();

  return surveys.map((survey) => ({
    id: survey.id,
    title: survey.title,
    questions: survey.questions as Question[],
    responses: survey.responses as Response[],
    createdAt: survey.createdAt,
  }));
}

export async function getSurveyById(id: string): Promise<SurveyDto> {
  if (!id) throw new AppError("Survey ID is required", 400);

  if (!ObjectId.isValid(id)) {
    throw new AppError("Invalid Survey ID format", 400);
  }
  const survey = await getSurveyByIdFromDb(id);
  if (!survey) throw new AppError("Survey not found", 404);

  return {
    id: survey.id,
    title: survey.title,
    questions: survey.questions as Question[],
    responses: survey.responses as Response[],
    createdAt: survey.createdAt,
  };
}
