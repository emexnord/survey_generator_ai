import { Question } from "../types/question.type";

export async function generateSurveyQuestions(
  title: string
): Promise<Question[]> {
  const prompt = `Generate five engaging questions for a survey based on the topic: ${title}. 
  The questions should be a mix of:
  - Short paragraphs
  - Multiple choice (provide 3-4 options)
  - Checkboxes (provide 3-5 options)
  - Dropdown (provide 3-4 options)
  - Image upload (for relevant questions)`;

  // Mock AI API response (Replace with real AI integration)
  return [
    {
      id: "1",
      text: `What do you think about ${title}?`,
      type: "SHORT_PARAGRAPH",
      required: true,
    },
    {
      id: "2",
      text: `How often do you engage with ${title}?`,
      type: "DROPDOWN",
      options: ["Daily", "Weekly", "Monthly"],
      required: true,
    },
    {
      id: "3",
      text: `What features of ${title} do you like?`,
      type: "CHECKBOXES",
      options: ["Ease of use", "Features", "Speed", "Other"],
      required: false,
    },
    {
      id: "4",
      text: `Would you recommend ${title} to others?`,
      type: "MULTIPLE_CHOICE",
      options: ["Yes", "No", "Maybe"],
      required: true,
    },
    {
      id: "5",
      text: `Upload an image related to ${title}`,
      type: "IMAGE_UPLOAD",
      required: false,
    },
  ];
}
