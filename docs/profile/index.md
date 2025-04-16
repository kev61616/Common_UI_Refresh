# Profile Section Documentation

This document provides an overview of the Profile section in the Syntax application, with links to detailed documentation for each tab and component.

## Introduction

The Profile section provides students with comprehensive insights into their performance across various subjects. It was introduced in the April 2, 2025 update and features a tabbed interface with four main views:

1. [Overview Tab](./overview-tab/index.md) - A customizable dashboard with draggable cards
2. [Reading Tab](./reading-tab/index.md) - Reading-specific performance metrics
3. [Writing Tab](./writing-tab/index.md) - Writing-specific performance metrics
4. [Math Tab](./math-tab/index.md) - Math-specific performance metrics

## Key Features

- **Tabbed Interface**: Easily switch between different views of performance data
- **Customizable Dashboard**: Drag-and-drop card system in the Overview tab
- **Subject-Specific Analysis**: Detailed breakdowns for Reading, Writing, and Math
- **Progress Tracking**: Visual representations of improvement over time
- **Skills Assessment**: Granular analysis of specific skills within each subject area

## Navigation Structure

The Profile section contains the following routes:

- `/profile` - Main Profile page with tabbed interface
- `/profile/achievements` - Detailed view of all achievements *(planned)*
- `/profile/mastery` - Tag mastery map visualization *(planned)*
- `/profile/timeline` - Learning journey timeline *(planned)*
- `/profile/settings` - Profile customization options *(planned)*

## Component Architecture

The Profile section uses a consistent component architecture:

- **Page Components**: Top-level components for each route
- **Tab Components**: Components for each tab in the main interface
- **Card Components**: Reusable card components for displaying metrics
- **Visualization Components**: Charts, graphs, and visual representations of data

For detailed implementation documentation, see:

- [Card System Documentation](./overview-tab/card-system.md)
- [Drag and Drop System](./overview-tab/drag-and-drop.md)

## Data Sources and Flow

*(Explain where the data for the profile comes from (API, database, calculations) and how it flows through the components.)*

## Future Enhancements

*(List any planned improvements or future features for the Profile section.)*
