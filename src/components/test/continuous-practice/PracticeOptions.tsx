'use client';

import { Sparkles, Settings } from "lucide-react";
import { PracticeOption } from "../shared/types";

// Define the practice options for continuous practice section
export const continuousPracticeOptions: PracticeOption[] = [
{
  title: "AI Recommended",
  description: "Get personalized question sets automatically tailored to your learning needs and performance history.",
  features: [
  "Smart question selection based on your weak areas",
  "Adapts difficulty as your skills improve",
  "Optimized for efficient learning",
  "Detailed performance analytics"],

  isPremium: true,
  href: "/test/continuous-practice/ai-recommended",
  icon: <Sparkles className="h-6 w-6" />,
  gradient: {
    from: "from-amber-400",
    to: "to-amber-600"
  },
  index: 0
},
{
  title: "Custom Practice",
  description: "Create your own practice sessions with control over subjects and difficulty levels.",
  features: [
  "Free users can only select subject area",
  "Limited to 7 hearts per day for free tier",
  "Premium users can choose specific units",
  "Inspired by Spotify's freemium model"],

  isFree: true,
  href: "/test/continuous-practice/custom",
  icon: <Settings className="h-6 w-6" />,
  gradient: {
    from: "from-indigo-500",
    to: "to-violet-600"
  },
  index: 1
}];