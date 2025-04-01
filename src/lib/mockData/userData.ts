// Mock user data - In a real app, this would come from an API
export const userData = {
  streakDays: 5,
  lastCompletedAt: "2025-04-01",
  heartCount: 4, // remaining hearts for free tier
  recentProgress: [20, 35, 42, 65, 58, 72, 80], // last 7 days progress percentage
  knowledgeAreas: [
    { name: "Reading", progress: 72 },
    { name: "Writing", progress: 45 },
    { name: "Math - No Calc", progress: 68 },
    { name: "Math - Calc", progress: 54 }
  ],
  recommendedTopics: ["Quadratic Equations", "Evidence-Based Reading", "Grammar Rules"]
};
