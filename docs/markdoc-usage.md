# Markdoc Usage Guide

This document explains how Markdoc is used within the Syntax project, particularly for rendering documentation pages under `/src/app/docs`.

*(This documentation is currently under development.)*

## Table of Contents

- [Markdoc Usage Guide](#markdoc-usage-guide)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Installation and Setup](#installation-and-setup)
  - [Writing Content](#writing-content)
    - [Basic Markdown](#basic-markdown)
    - [Markdoc Tags](#markdoc-tags)
    - [Custom Tags](#custom-tags)
    - [Nodes](#nodes)
  - [Configuration (`src/markdoc/`)](#configuration-srcmarkdoc)
    - [`tags.js`](#tagsjs)
    - [`nodes.js`](#nodesjs)
    - [`search.mjs`](#searchmjs)
  - [Rendering Process](#rendering-process)
    - [Parsing Content](#parsing-content)
    - [Transformation](#transformation)
    - [Rendering Components](#rendering-components)
  - [Custom Components for Markdoc](#custom-components-for-markdoc)
    - [`Fence`](#fence)
    - [`Callout`](#callout)
  - [Adding New Documentation Pages](#adding-new-documentation-pages)
  - [Troubleshooting](#troubleshooting)

---

## Overview

Markdoc is used to power the documentation section of the Syntax application. It allows writing content in Markdown with the added power of custom tags and nodes, enabling richer, component-driven documentation pages.

## Installation and Setup

*(Explain if any specific setup beyond standard Next.js/Markdoc integration was needed.)*

## Writing Content

### Basic Markdown

Standard Markdown syntax is supported.

### Markdoc Tags

Markdoc extends Markdown with tags using the `{% %}` syntax.

**Example:**
```markdoc
{% callout type="warning" title="Important Note" %}
This is a warning callout.
{% /callout %}
```

### Custom Tags

Custom tags are defined in `src/markdoc/tags.js` and allow embedding React components or complex logic within Markdown files.

*(List and explain key custom tags used in the project, e.g., `QuickLink`, `Hero`, etc.)*

### Nodes

Custom nodes, defined in `src/markdoc/nodes.js`, allow customizing the rendering of standard Markdown elements (like headings, paragraphs, code fences).

*(Explain any custom node overrides, e.g., custom heading rendering for anchor links, custom code block rendering.)*

## Configuration (`src/markdoc/`)

### `tags.js`

Defines the schema and render components for custom Markdoc tags.

### `nodes.js`

Defines the schema and render components for custom Markdoc nodes.

### `search.mjs`

*(Explain the purpose of this file, likely related to generating search index data from Markdoc content.)*

## Rendering Process

*(Briefly explain how `.md` files in `/src/app/docs` are processed and rendered, likely involving a dynamic route handler that parses Markdoc and renders using configured components.)*

### Parsing Content

*(Mention Markdoc parsing steps)*

### Transformation

*(Mention Markdoc transformation steps)*

### Rendering Components

*(Mention how the transformed content tree is rendered using React components)*

## Custom Components for Markdoc

Several React components are specifically designed to be used with or render Markdoc content:

### `Fence`

Located at `src/components/Fence.tsx`. Used for rendering code blocks, potentially with syntax highlighting (PrismJS).

### `Callout`

Located at `src/components/Callout.tsx`. Renders styled callout boxes (info, warning, danger).

*(List other relevant components like Prose, DocsLayout, TableOfContents, etc., and explain their role in rendering Markdoc pages.)*

## Adding New Documentation Pages

*(Provide steps for adding a new `.md` file to the `/src/app/docs` structure.)*

## Troubleshooting

*(Common issues and solutions when working with Markdoc in this project.)*
