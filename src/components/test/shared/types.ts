import { ReactNode } from "react";

// General practice option type used in both continuous practice and full test
export interface PracticeOption {
  title: string;
  description: string;
  features: string[];
  isPremium?: boolean;
  isFree?: boolean;
  href: string;
  icon: ReactNode;
  gradient: {
    from: string;
    to: string;
  };
  index: number;
}

// Knowledge area type for the progress bars
export interface KnowledgeArea {
  name: string;
  progress: number;
}
