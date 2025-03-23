"use client";

import SurveyForm from "@/components/SurveyForm";
import GridPattern from "@/components/ui/animted-grid";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Answer } from "@/types/answer.type";
import { Survey } from "@/types/survey.type";
import { useSearchParams } from "next/navigation";
import React from "react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoSend, IoShareSocial } from "react-icons/io5";

export default function SurveyPage() {
  const searchParams = useSearchParams();
  const [title, setTitle] = useState("");
  // const [questions, setQuestions] = useState<Question[]>([]);
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [questionLoading, setQuestionLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch questions when title is present

  async function fetchSurvey(title: string) {
    setSurvey(null);
    setQuestionLoading(true);

    try {
      const response = await fetch(`/api/survey`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });
      const data = await response.json();
      setSurvey(data);
      setTitle(data.title);
      // setQuestions(data.questions);
    } catch (error) {
      console.error("Error fetching survey:", error);
    } finally {
      setQuestionLoading(false);
    }
  }

  const copyLinkToClipboard = () => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const surveyLink = `${baseUrl}/survey/${survey?.id}`;
    navigator.clipboard.writeText(surveyLink).then(() => {
      toast.success("Share link copied!");
    });
  };

  async function handleSurveySubmit(responses: Answer[]) {
    try {
      const response = await fetch("/api/response", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          surveyId: survey?.id,
          answers: responses,
        }),
      });

      if (response.ok) {
        toast.success("Responses submitted successfully!");
      } else {
        toast.error("Failed to submit responses. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting responses:", error);
      toast.error("An error occurred while submitting responses.", {
        position: "top-center",
      });
    }
  }

  function handleSubmit() {
    if (!title.trim()) return;
    fetchSurvey(title);
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent default Enter behavior (form submission or newline)
      handleSubmit();
    }
  };

  useEffect(() => {
    const title = searchParams.get("title");

    if (title) {
      fetchSurvey(title);
    }
    setLoading(false);
  }, [searchParams]);

  if (loading) {
    return (
      <div className="h-full w-full">
        <div className="relative w-full h-full">
          <GridPattern width={70} height={70} />
          <div className="flex flex-col items-center justify-center h-screen text-center z-10 relative">
            Loading
          </div>
        </div>
      </div>
    );
  }

  if (questionLoading) {
    return (
      <div className="h-full w-full">
        <div className="relative w-full h-full">
          <GridPattern width={70} height={70} />
          <div className="p-6 max-w-2xl mx-auto h-screen relative z-10">
            <div className="p-5 rounded mb-10 bg-white dark:bg-black border border-gray-300 dark:border-gray-700 flex justify-between w-full">
              <div>
                <h1 className="text-2xl font-bold">Title:</h1>
                <h1 className="text-xl">{title}</h1>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center p-6">
              <div className="h-4 w-48 bg-gray-300 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
              <div className="h-4 w-64 bg-gray-300 dark:bg-gray-700 rounded animate-pulse mb-2"></div>

              <p className="text-gray-500 mt-4 flex items-center gap-1">
                Generating survey
                <span className="animate-bounce">.</span>
                <span className="animate-bounce delay-200">.</span>
                <span className="animate-bounce delay-400">.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full">
      <div className="relative w-full h-full">
        <GridPattern width={70} height={70} />
        <div className="w-full h-full z-10 relative">
          {survey ? (
            <div className="p-6 max-w-2xl mx-auto">
              <div className="p-5 rounded mb-10 bg-white dark:bg-black border border-gray-300 dark:border-gray-700 flex justify-between w-full">
                <div>
                  <h1 className="text-2xl font-bold">Title:</h1>
                  <h1 className="text-xl">{title}</h1>
                </div>
                <Button
                  onClick={copyLinkToClipboard}
                  className="px-2 py-1 w-auto rounded-sm"
                  aria-label="Share link"
                  variant={"outline"}
                >
                  Publish
                  <IoShareSocial className="text-lg text-gray-700 dark:text-white" />
                </Button>
              </div>

              <SurveyForm
                questions={survey.questions}
                onSubmit={handleSurveySubmit}
              />

              {/* new survey generator */}
              <div
                className={cn(
                  "p-5 rounded fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50  w-full max-w-[700px] px-5 py-10 border border-gray-300 dark:border-gray-600 rounded-sm mt-12",
                  // light styles
                  "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
                  // dark styles
                  "transform-gpu dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]"
                )}
              >
                <div className="relative">
                  <input
                    type="text"
                    value={title}
                    onKeyDown={handleKeyDown}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter a title to generate survey..."
                    className="w-full px-4 py-3 "
                  />
                  <button
                    onClick={handleSubmit}
                    className="absolute right-2 top-1/2 -translate-y-1/2  w-10 h-10 rounded-full transition flex items-center justify-center"
                    disabled={questionLoading}
                  >
                    <IoSend
                      className="text-neutral-700 dark:text-neutral-300"
                      size={20}
                    />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-screen text-center">
              <h2 className="text-4xl font-semibold mb-4">Good morning,</h2>
              <h2 className="text-4xl font-semibold mb-4 max-w-lg mx-auto">
                what title are you planning to generate a survey for?
              </h2>
              <div className="relative w-full max-w-[550px] px-5 py-10">
                <div className="relative">
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter a title to generate survey..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-full shadow-sm focus:ring-2 focus:ring-gray-500 focus:outline-none peer text-gray-900 dark:text-white dark:border-gray-600 "
                  />
                  <button
                    onClick={handleSubmit}
                    className="absolute right-2 top-1/2 -translate-y-1/2  w-10 h-10 rounded-full transition flex items-center justify-center"
                    disabled={questionLoading}
                  >
                    <IoSend
                      className="text-neutral-700 dark:text-neutral-300"
                      size={20}
                    />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
