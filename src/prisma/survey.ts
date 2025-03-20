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
