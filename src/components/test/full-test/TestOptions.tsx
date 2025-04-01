'use client';

import { Calculator, FileText } from "lucide-react";
import { PracticeOption } from "../shared/types";

// Options for full test practice
export const fullTestOptions = [
  {
    title: "Practice Test 1",
    description: "Standard mock test covering all sections with official-level questions",
    features: [
      "Complete 3-hour test experience",
      "Covers Reading, Writing, and Math sections",
      "Official-level difficulty",
      "Detailed score report"
    ],
    href: "/test/full-test/practice-1",
    icon: <FileText className="h-6 w-6" />,
    gradient: {
      from: "from-blue-500",
      to: "to-indigo-600"
    },
    index: 0
  },
  {
    title: "Practice Test 2",
    description: "Slightly more challenging test with emphasis on advanced concepts",
    features: [
      "Advanced difficulty level",
      "Focus on challenging concepts",
      "Comprehensive coverage of all sections",
      "Detailed performance analytics"
    ],
    href: "/test/full-test/practice-2",
    icon: <Calculator className="h-6 w-6" />,
    gradient: {
      from: "from-emerald-500",
      to: "to-teal-600"
    },
    index: 1
  },
  {
    title: "Official Test Simulation",
    description: "Simulation based on recent official test patterns and difficulty levels",
    features: [
      "Based on recent test patterns",
      "Most accurate simulation experience",
      "Precise timing of all sections",
      "Score prediction with college readiness metrics"
    ],
    href: "/test/full-test/official-simulation",
    icon: <FileText className="h-6 w-6" />,
    gradient: {
      from: "from-purple-500",
      to: "to-indigo-600"
    },
    index: 2
  }
];
