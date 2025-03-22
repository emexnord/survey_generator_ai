"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import SurveyForm from "@/components/SurveyForm";
import GridPattern from "@/components/ui/animted-grid";
import { Answer } from "@/types/answer.type";
import { Question } from "@/types/question.type";
import toast from "react-hot-toast";

export default function SurveyPage() {
  const { surveyId } = useParams();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [surveyTitle, setSurveyTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fetch survey questions when component mounts
  useEffect(() => {
    if (typeof surveyId === "string") {
      fetchSurvey(surveyId);
    }
  }, [surveyId]);

  async function fetchSurvey(surveyId: string) {
    setLoading(true);
    setError(false);
    try {
      const response = await fetch(`/api/survey/${surveyId}`);
      if (!response.ok) {
        throw new Error("Survey not found");
      }
      const data = await response.json();
      setQuestions(data.questions);
      setSurveyTitle(data.title);
    } catch (error) {
      console.error("Error fetching survey:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  async function handleSurveySubmit(responses: Answer[]) {
    console.log(
      "Survey Submitted:",
      JSON.stringify({
        surveyId,
        answers: responses,
      })
    );
    try {
      const response = await fetch("/api/response", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          surveyId,
          answers: responses,
        }),
      });

      if (response.ok) {
        toast.success("Responses submitted successfully!", {
          position: "top-center",
        });
      } else {
        toast.error("Failed to submit responses. Please try again.", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Error submitting responses:", error);
      toast.error("An error occurred while submitting responses.", {
        position: "top-center",
      });
    }
  }

  if (loading) {
    return (
      <div className="h-full w-full">
        <div className="relative w-full h-full">
          <GridPattern width={70} height={70} />
          <div className="flex flex-col items-center justify-center h-screen text-center z-10 relative">
            Loading...
          </div>
        </div>
      </div>
    );
  }

  if (error || !questions.length) {
    return (
      <div className="h-full w-full">
        <div className="relative w-full h-full">
          <GridPattern width={70} height={70} />
          <div className="flex flex-col items-center justify-center h-screen text-center z-10 relative">
            <h2 className="text-3xl font-semibold text-gray-700 dark:text-gray-300">
              No form exists with this URL.
            </h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full">
      <div className="relative w-full h-full">
        <GridPattern width={70} height={70} />
        <div className="w-full h-screen z-10 relative">
          <div className="p-6 max-w-2xl mx-auto">
            <div className="p-5 rounded mb-10 bg-white dark:bg-black border border-gray-300 dark:border-gray-700">
              <h1 className="text-2xl font-bold">Title</h1>
              <h1 className="text-xl">{surveyTitle}</h1>
            </div>
            <SurveyForm questions={questions} onSubmit={handleSurveySubmit} />
          </div>
        </div>
      </div>
    </div>
  );
}
