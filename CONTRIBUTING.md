# Contributing to Syntax

Thank you for your interest in contributing to the Syntax education platform! We welcome contributions that improve the platform and its features. Please take a moment to review these guidelines to ensure a smooth contribution process.

## Table of Contents

- [Contributing to Syntax](#contributing-to-syntax)
  - [Table of Contents](#table-of-contents)
  - [Code of Conduct](#code-of-conduct)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Running the Development Server](#running-the-development-server)
  - [Development Workflow](#development-workflow)
    - [Creating a Branch](#creating-a-branch)
    - [Making Changes](#making-changes)
    - [Code Style](#code-style)
    - [Testing](#testing)
  - [Submitting Changes](#submitting-changes)
    - [Commit Messages](#commit-messages)
    - [Pull Requests](#pull-requests)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Enhancements](#suggesting-enhancements)

## Code of Conduct

This project adheres to a Code of Conduct. By participating, you are expected to uphold this code. (Note: Link to a Code of Conduct file should be added here if one exists or is created).

## Getting Started

### Prerequisites

- Node.js (Version specified in `.nvmrc` or `package.json`, typically latest LTS)
- npm (comes with Node.js)
- Git

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd syntax
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Running the Development Server

To start the Next.js development server:

```bash
npm run dev
```

This will typically start the server on `http://localhost:3000`.

## Development Workflow

### Creating a Branch

Create a new branch for your feature or bug fix:

```bash
git checkout -b <branch-name>
```

Use a descriptive branch name, like `feat/add-profile-settings` or `fix/hydration-error-dashboard`.

### Making Changes

- Write clean, maintainable, and well-documented code.
- Follow the project's architecture and patterns. Refer to the documentation in the `/docs` directory.
- Ensure your changes work correctly in both light and dark modes.
- Test your changes thoroughly.

### Code Style

- This project uses Prettier and ESLint for code formatting and linting.
- Run `npm run lint` to check for linting issues.
- Run `npm run format` to automatically format your code before committing.
- Adhere to the established coding conventions found in the existing codebase.
- Use Tailwind CSS for styling; avoid custom CSS files unless absolutely necessary.
- Follow React and Next.js best practices (e.g., using Server Components where possible, proper Client Component usage, adhering to Rules of Hooks).

### Testing

- Add tests for new features or bug fixes where applicable. (Note: Specify testing framework and commands if set up, e.g., Jest, Cypress).
- Ensure all existing tests pass before submitting your changes.
- Run tests using: `npm run test` (Adjust command if different).

## Submitting Changes

### Commit Messages

- Follow conventional commit message standards (e.g., `feat: ...`, `fix: ...`, `docs: ...`, `style: ...`, `refactor: ...`, `test: ...`, `chore: ...`).
- Write clear and concise commit messages explaining the *what* and *why* of your changes.

### Pull Requests

1.  Push your branch to the remote repository:
    ```bash
    git push origin <branch-name>
    ```
2.  Open a Pull Request (PR) against the `main` branch (or the designated development branch).
3.  Provide a clear title and description for your PR, explaining the changes and linking to any relevant issues.
4.  Ensure all automated checks (linting, testing, builds) pass.
5.  Respond to any feedback or review comments promptly.

## Reporting Bugs

If you find a bug, please open an issue on the project's issue tracker. Include:

- A clear and descriptive title.
- Steps to reproduce the bug.
- Expected behavior.
- Actual behavior.
- Screenshots or screen recordings, if helpful.
- Environment details (OS, Browser, Node version).

## Suggesting Enhancements

If you have an idea for a new feature or improvement, please open an issue to discuss it first. This allows for feedback and ensures alignment with the project's goals before significant development effort is invested. Provide:

- A clear and descriptive title.
- A detailed explanation of the proposed enhancement.
- The motivation or use case for the enhancement.
- Any potential implementation ideas.

Thank you for contributing!
