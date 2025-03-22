"use client";

import { cn } from "@/lib/utils";
import { Answer } from "@/types/answer.type";
import { Question } from "@/types/question.type";
import { useState } from "react";
import { Button } from "./ui/button";

interface SurveyFormProps {
  questions: Question[];
  onSubmit: (responses: Answer[]) => void;
}

export default function SurveyForm({ questions, onSubmit }: SurveyFormProps) {
  const [responses, setResponses] = useState<Record<string, any>>({});

  const handleChange = (id: string, value: any) => {
    setResponses((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const responseArray = Object.entries(responses).map(([id, value]) => ({
      questionId: id,
      text: value,
    }));
    onSubmit(responseArray);
  };

  const handleClear = () => {
    setResponses([]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto mb-36">
      {questions.map((question) => (
        <div
          key={question.id}
          className={cn(
            "p-5 rounded",
            // light styles
            "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
            // dark styles
            "transform-gpu dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]"
          )}
        >
          <label className="font-medium block mb-2">
            {question.text}
            {question.required && <span className="text-red-500"> *</span>}
          </label>

          {question.type === "SHORT_PARAGRAPH" && (
            <input
              type="text"
              className="w-full p-2 border rounded-md shadow-sm focus:ring-1 focus:ring-gray-500"
              required={question.required}
              value={responses[question.id] || ""}
              onChange={(e) => handleChange(question.id, e.target.value)}
            />
          )}

          {question.type === "PARAGRAPH" && (
            <textarea
              className="w-full p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-gray-500"
              rows={4}
              required={question.required}
              value={responses[question.id] || ""}
              onChange={(e) => handleChange(question.id, e.target.value)}
            />
          )}

          {question.type === "DROPDOWN" && question.options && (
            <select
              className="w-full p-2 border "
              required={question.required}
              value={responses[question.id] || ""}
              onChange={(e) => handleChange(question.id, e.target.value)}
            >
              <option value="">Select an option</option>
              {question.options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}

          {question.type === "CHECKBOXES" && question.options && (
            <div className="space-y-2">
              {question.options.map((option, index) => (
                <label key={index} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={responses[question.id]?.includes(option) || false}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setResponses((prev) => ({
                        ...prev,
                        [question.id]: checked
                          ? [...(prev[question.id] || []), option]
                          : prev[question.id]?.filter(
                              (o: string) => o !== option
                            ),
                      }));
                    }}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          )}

          {question.type === "MULTIPLE_CHOICE" && question.options && (
            <div className="space-y-2">
              {question.options.map((option, index) => (
                <label key={index} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name={question.id}
                    value={option}
                    checked={responses[question.id] === option}
                    onChange={() => handleChange(question.id, option)}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          )}

          {question.type === "IMAGE_UPLOAD" && (
            <input
              type="file"
              accept="image/*"
              className="w-full p-2 border rounded-md shadow-sm"
              onChange={(e) => handleChange(question.id, e.target.files?.[0])}
            />
          )}
        </div>
      ))}

      {/* Buttons */}
      <div className="flex justify-between">
        <Button type="submit">Submit Form</Button>
        <Button variant={"ghost"} onClick={handleClear}>
          Clear Form
        </Button>
      </div>
    </form>
  );
}
