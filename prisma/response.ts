import { PrismaClient } from "@prisma/client";
import { Answer } from "../types/answer.type";
import { AppError } from "../errors";

const prisma = new PrismaClient();

export const createResponse = async ({
  surveyId,
  userEmail,
  answers,
}: {
  surveyId: string;
  userEmail?: string;
  answers: Answer[];
}) => {
  const new_response = await prisma.response.create({
    data: {
      surveyId,
      userEmail,
      answers,
    },
  });
  return new_response;
};

export const getResponsesBySurveyId = async (surveyId: string) => {
  const responses = await prisma.response.findMany({
    where: {
      surveyId,
    },
  });
  return responses;
};

export const getResponseById = async (id: string) => {
  const response = await prisma.response.findUnique({
    where: {
      id,
    },
  });
  return response;
};
