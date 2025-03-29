import { PrismaClient } from "@prisma/client";
import { createSurveyDto } from "../dtos/dto";

const prisma = new PrismaClient();

export const createSurvey = async ({
  userId,
  title,
  questions,
}: createSurveyDto) => {
  const new_survey = await prisma.survey.create({
    data: {
      ownerId: userId,
      title,
      questions,
    },
    include: {
      owner: true,
    },
  });
  return new_survey;
};

export const getAllSurveys = async (userId: string) => {
  const surveys = await prisma.survey.findMany({
    where: {
      ownerId: userId,
    },
    include: {
      owner: true,
      responses: true,
    },
  });
  return surveys;
};

export const getSurveyById = async (id: string) => {
  const survey = await prisma.survey.findUnique({
    where: {
      id,
    },
    include: {
      responses: true,
      owner: true,
    },
  });
  return survey;
};
