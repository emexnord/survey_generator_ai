import { PrismaClient } from "@prisma/client";
import { createSurveyDto } from "../dtos/dto";

const prisma = new PrismaClient();

export const createSurvey = async ({ title, questions }: createSurveyDto) => {
  const new_survey = await prisma.survey.create({
    data: {
      title,
      questions,
    },
  });
  return new_survey;
};

export const getAllSurveys = async () => {
  const surveys = await prisma.survey.findMany({
    include: {
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
    },
  });
  return survey;
};
