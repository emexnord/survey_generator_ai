import { Question } from "@/src/types/question.type";

export interface GenerateSurveyDto {
  title: string;
}

export interface SurveyResponseDto {
  id: string;
  title: string;
  questions: Question[];
  createdAt: Date;
}

export interface createSurveyDto {
  title: string;
  questions: Question[];
}
