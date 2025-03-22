import { getSurveyById } from "./survey_service";
import {
  createResponse as createResponseInDb,
  getResponsesBySurveyId as getResponsesBySurveyIdFromDb,
  getResponseById as getResponseByIdFromDb,
} from "../prisma/response";
import { AppError } from "../errors";
import { createResponseDto } from "../dtos/dto";
import { Response } from "../types/response.type";
import { Answer } from "../types/answer.type";
import { ObjectId } from "mongodb";

export async function createResponse({
  surveyId,
  userEmail,
  answers,
}: createResponseDto) {
  if (!surveyId || !answers) {
    throw new AppError(
      "surveyId and answers are required to give response",
      400
    );
  }

  const survey = await getSurveyById(surveyId);

  if (!survey) {
    throw new AppError(`Survey with id ${surveyId} not found`, 404);
  }

  // check if all required questions are answered
  survey.questions.forEach((question) => {
    const answer = answers.find((answer) => answer.questionId === question.id);
    if (question.required && !answer) {
      throw new AppError(`Answer for question ${question.id} is required`, 400);
    }
  });

  const new_response = await createResponseInDb({
    surveyId,
    userEmail,
    answers,
  });

  return {
    id: new_response.id,
    surveyId: new_response.surveyId,
    userEmail: new_response.userEmail,
    answers: new_response.answers as Answer[],
    createdAt: new_response.createdAt,
  };
}

export async function getResponsesBySurveyId(
  surveyId: string | null
): Promise<Response[]> {
  if (!surveyId) {
    throw new AppError("Survey ID is required", 400);
  }

  const survey = await getSurveyById(surveyId);
  if (!survey) {
    throw new AppError(`Survey with id ${surveyId} not found`, 404);
  }
  const responses = await getResponsesBySurveyIdFromDb(surveyId);

  return responses.map((response) => ({
    id: response.id,
    surveyId: response.surveyId,
    userEmail: response.userEmail,
    answers: response.answers as Answer[],
    createdAt: response.createdAt,
  }));
}

export async function getResponseById(id: string | null): Promise<Response> {
  if (!id) {
    throw new AppError("Response ID is required", 400);
  }

  if (!ObjectId.isValid(id)) {
    throw new AppError("Invalid Response ID format", 400);
  }

  const response = await getResponseByIdFromDb(id);
  if (!response) {
    throw new AppError(`Response with id ${id} not found`, 404);
  }

  return {
    id: response.id,
    surveyId: response.surveyId,
    userEmail: response.userEmail,
    answers: response.answers as Answer[],
    createdAt: response.createdAt,
  };
}
