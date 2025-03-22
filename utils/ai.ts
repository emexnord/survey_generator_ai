import { mock_response } from "@/data/mock_ai_response";
import { Question } from "../types/question.type";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

export async function generateSurveyQuestions(
  title: string
): Promise<Question[]> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.error("Gemini API key not found");
    return mock_response;
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

  const prompt = `Generate five engaging questions for a survey based on the topic: ${title}. 
      The questions should be a mix of:
      - Short paragraphs
      - paragraphs
      - Multiple choice (provide 3-4 options)
      - Checkboxes (provide 3-5 options)
      - Dropdown (provide 3-4 options)
      - Image upload (for relevant questions)
      
      Return the response as a valid JSON array of question objects, following this TypeScript interface:

      \`\`\`typescript
      export type Question = {
        id: string; // incremental starting from 1
        text: string;
        type: QuestionType;
        options?: string[]; // Required for MULTIPLE_CHOICE, CHECKBOXES, and DROPDOWN
        required: boolean;
      };

      export type QuestionType =
        | "SHORT_PARAGRAPH"
        | "PARAGRAPH"
        | "MULTIPLE_CHOICE"
        | "CHECKBOXES"
        | "DROPDOWN"
        | "IMAGE_UPLOAD"; // for example,in social media reporting
      \`\`\`
      
      Example of the desired output:
      
      [
        {
          "id": "1",
          "text": "Please provide a short summary of your experience.",
          "type": "SHORT_PARAGRAPH",
          "required": true
        },
        {
          "id": "2",
          "text": "Describe your overall satisfaction in detail.",
          "type": "PARAGRAPH",
          "required": true
        },
        {
          "id": "3",
          "text": "Which option best describes your preference?",
          "type": "MULTIPLE_CHOICE",
          "options": ["Option A", "Option B", "Option C"],
          "required": true
        },
        {
           "id": "4",
           "text": "Select all that apply",
           "type":"CHECKBOXES",
           "options":["Option 1", "Option 2","Option 3", "Option 4"],
           "required": true
        },
        {
           "id":"5",
           "text":"Select an option from the dropdown",
           "type":"DROPDOWN",
           "options": ["Option 1", "Option 2","Option 3"],
           "required": true
        }

      ]
      
      Return ONLY a valid JSON array, without any additional text, markdown, or formatting. Do NOT wrap it in code blocks, make sure
      the response is  directly parsable into the Question[] array.
      `;

  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const result = await chatSession.sendMessage(prompt);
  const responseText = result.response
    .text()
    .replace(/```json|```/g, "")
    .trim();

  try {
    const questions: Question[] = JSON.parse(responseText);
    return questions;
  } catch (error) {
    console.error("Error parsing JSON response:", error);
    console.log("Response from AI:", responseText);
    return mock_response;
  }
}
