import { Question } from "@/types/question.type";

export const mock_response: Question[] = [
  {
    id: "1",
    text: "Briefly describe your current level of experience with AI in prompt engineering. Have you used AI tools to generate, refine, or evaluate prompts?  (e.g., beginner, intermediate, expert)",
    type: "SHORT_PARAGRAPH",
    required: true,
  },
  {
    id: "2",
    text: "What are the biggest challenges you face when trying to design effective prompts? Explain in detail, including specific examples if possible.",
    type: "PARAGRAPH",
    required: true,
  },
  {
    id: "3",
    text: "Which tool do you find to be the most useful for generating prompts?",
    type: "DROPDOWN",
    options: [
      "OpenAI Playground",
      "Bard",
      "Other (please specify in the next question)",
      "None",
    ],
    required: true,
  },
  {
    id: "4",
    text: "How do you typically evaluate the effectiveness of a prompt?",
    type: "MULTIPLE_CHOICE",
    options: [
      "Subjective evaluation of the response quality.",
      "Measuring specific metrics (e.g., accuracy, relevance, fluency).",
      "Comparing the AI's output to a ground truth or gold standard.",
      "All of the above",
    ],
    required: true,
  },

  {
    id: "5",
    text: "Imagine you're trying to create a prompt that will generate a specific type of image (e.g., a photorealistic landscape).  If you have an example image you want to base the prompt on, please upload it here. If not, you can skip this question.",
    type: "IMAGE_UPLOAD",
    required: false,
  },
];
