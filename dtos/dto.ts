import { Question } from "../types/question.type";
import { Response } from "../types/response.type";
import { Answer } from "../types/answer.type";

export interface GenerateSurveyDto {
  title: string;
}

export interface SurveyDto {
  id: string;
  title: string;
  questions: Question[];
  responses?: Response[];
  createdAt: Date;
}

export interface createSurveyDto {
  title: string;
  questions: Question[];
}

export interface createResponseDto {
  surveyId: string;
  userEmail?: string;
  answers: Answer[];
}

export interface createUserDto {
  name: string;
  email: string;
  password: string;
}

export interface userDto {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

export interface loginDto {
  email: string;
  password: string;
}
