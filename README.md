# Syntax Learning Platform

## Overview

Syntax is a next-generation learning platform that provides advanced data visualization and analysis for educational content. The platform uses React 19, Next.js 15, and Tailwind CSS 4 to deliver a responsive and interactive user experience.

## Features

### Question View - General View

The General View provides a comprehensive matrix grid that organizes questions by topic and mastery level:

- **Data Distribution**: Questions are evenly distributed across all 6 mastery columns (Very Weak, Weak, Not Attempted, Emerging, Proficient, Mastered)
- **Challenge Icons**: Each cell includes a challenge icon that allows users to practice questions to improve their mastery level
- **Expandable Categories**: Clicking on main topics (e.g., "Algebra Fundamentals") expands to show subcategories for more detailed analysis
- **Visual Progress Indicators**: Color-coded cells and progress bars indicate mastery levels and performance metrics

## Technical Implementation

### App Router Architecture

This project exclusively uses the Next.js App Router for routing. The app router provides:

- Improved performance through React Server Components
- Built-in data loading capabilities
- Simplified API route creation
- Enhanced SEO functionality

### Component Structure

- `/src/components/review/` - Contains all review-related components
- `/src/components/review/enhanced-matrix/` - Contains the matrix grid components for the General View
  - `/components/` - UI components like MatrixCell, MatrixRow, etc.
  - `/hooks/` - Custom hooks for data management
  - `/utils/` - Utility functions for data processing
  - `/types/` - TypeScript type definitions

### Data Flow

1. Raw question data is processed through `useMatrixData` hook
2. Data is distributed across mastery levels using `distributeQuestionsAcrossMasteryLevels`
3. UI components render the data with interactive elements
4. Challenge system tracks user progress and updates mastery levels

## Development Guidelines

1. Only use App Router, not Page Router
2. Include descriptive comments for complex logic
3. Follow the existing component structure and naming conventions
4. Use Tailwind CSS for styling to maintain consistency
5. Test all interactive elements for proper functionality

## Technologies

- React 19
- Next.js 15.2.1
- TypeScript 5
- Tailwind CSS 4
- ESLint 9

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
