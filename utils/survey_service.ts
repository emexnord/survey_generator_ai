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
import { exclude } from "@/lib/utils";

export async function createSurvey(
  data: GenerateSurveyDto
): Promise<SurveyDto> {
  if (!data.title || !data.userId)
    throw new AppError("Title and userid is required", 400);

  // Generate questions using AI
  const questions = await generateSurveyQuestions(data.title);

  // Store in the database
  const survey = await createSurveyInDb({
    userId: data.userId,
    title: data.title,
    questions,
  });

  return {
    id: survey.id,
    owner: exclude(survey.owner, ["password"]),
    title: survey.title,
    questions: survey.questions as Question[],
    createdAt: survey.createdAt,
  };
}

export async function getAllSurveys(userId: string): Promise<SurveyDto[]> {
  // Fetch all surveys from the database
  const surveys = await getAllSurveysFromDb(userId);

  return surveys.map((survey) => ({
    id: survey.id,
    owner: exclude(survey.owner, ["password"]),
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
    owner: exclude(survey.owner, ["password"]),
    title: survey.title,
    questions: survey.questions as Question[],
    responses: survey.responses as Response[],
    createdAt: survey.createdAt,
  };
}
