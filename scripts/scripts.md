# View Variant Automation Tools

This document provides comprehensive instructions for using the automation tools that help manage the modular view architecture. These tools make it easy to scale to 100+ view variants while maintaining clean code organization and component registration.

## Table of Contents

- [View Variant Automation Tools](#view-variant-automation-tools)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Introduction to the Modular Architecture](#introduction-to-the-modular-architecture)
  - [Generate Variant Script](#generate-variant-script)
    - [Purpose](#purpose)
    - [Usage](#usage)
    - [Parameters](#parameters)
    - [Examples](#examples)
    - [Output](#output)
  - [Register Existing Components Script](#register-existing-components-script)
    - [Purpose](#purpose-1)
    - [Usage](#usage-1)
    - [How It Works](#how-it-works)
    - [Examples](#examples-1)
  - [Development Workflow](#development-workflow)
    - [Creating New View Variants](#creating-new-view-variants)
    - [Bulk Migration Workflow](#bulk-migration-workflow)
    - [Best Practices](#best-practices)
  - [Troubleshooting](#troubleshooting)
    - [Common Issues](#common-issues)
    - [Debugging](#debugging)
  - [Extending the Scripts](#extending-the-scripts)
    - [Adding New Category Support](#adding-new-category-support)
    - [Customizing Metadata Inference](#customizing-metadata-inference)

## Prerequisites

To use these scripts, you need:

- Node.js installed (version 14.0 or higher)
- Access to the project repository
- Basic understanding of the modular view architecture
- Terminal or command prompt access

## Introduction to the Modular Architecture

Our application uses a modular architecture for view variants to support 100+ views while maintaining clean code. Key components:

1. **View Registry**: Central system for registering view metadata (`registry/viewRegistry.ts`)
2. **View Loaders**: Dynamic loaders for each category (`loaders/getXXXViewComponent.ts`)
3. **View Managers**: Components that handle rendering variants (`managers/XXXViewManager.tsx`)
4. **Variant Structure**: Individual variants in their own directories (`variant-X/index.ts`)

The automation tools help maintain this architecture by automating the creation and registration of variant files.

## Generate Variant Script

### Purpose

The `generate-variant.js` script creates new variant registration files in the correct location with proper structure. It ensures consistent formatting, proper metadata, and updates the registration imports in the appropriate registration file.

### Usage

```bash
node scripts/generate-variant.js [category] [id] [name] [component] [description] [tags]
```

### Parameters

| Parameter    | Required | Description                                          | Example                     |
|--------------|----------|------------------------------------------------------|----------------------------- |
| `category`   | Yes      | View category: `set`, `timeline`, or `question`       | `set`                        |
| `id`         | Yes      | Unique numeric identifier for the variant            | `15`                         |
| `name`       | Yes      | Display name for the view (shown in UI)              | `"Hexagonal Grid View"`      |
| `component`  | Yes      | Component name to import (should exist)              | `HexagonalView`              |
| `description`| No       | Detailed description of what the view shows          | `"Grid of hexagonal cells"`  |
| `tags`       | No       | Comma-separated list of tags for filtering           | `"grid,hexagonal,geometric"` |

### Examples

**Basic example (minimal parameters):**

```bash
node scripts/generate-variant.js question 20 "Word Cloud View" TagCloudView
```

**Complete example with all parameters:**

```bash
node scripts/generate-variant.js set 7 "Carousel View" CarouselView "Interactive carousel displaying practice sets with smooth transitions" "carousel,interactive,animation,swipe"
```

**Timeline view example:**

```bash
node scripts/generate-variant.js timeline 8 "Storytelling Timeline" StorytellingTimeline "Narrative-based timeline that presents practice history as a story" "narrative,story,chronological"
```

### Output

The script creates:

1. A directory at `src/components/review/[category]-view-variants/variant-[id]/`
2. An `index.ts` file in that directory with:
   - Import for the component
   - Registration with the view registry
   - Export of the component as default
3. Updates the import in the corresponding `registerAll[Category]Views.ts` file

Example output file structure:

```typescript
// src/components/review/set-view-variants/variant-7/index.ts
'use client'

import { CarouselView } from '../CarouselView'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 7,
  name: 'Carousel View',
  description: 'Interactive carousel displaying practice sets with smooth transitions',
  category: 'set',
  tags: ['carousel', 'interactive', 'animation', 'swipe'],
  isExperimental: false
})

// Export the component as default
export default CarouselView
```

## Register Existing Components Script

### Purpose

The `register-existing-components.js` script automates the registration of existing component files that haven't yet been registered in the modular system. It's useful when:

1. Migrating existing components to the new modular system
2. After creating multiple new component files that need registration
3. When adding components from external libraries or sources

### Usage

```bash
node scripts/register-existing-components.js
```

No parameters are required, as the script automatically:
1. Scans all three view variant directories (`set`, `question`, `timeline`)
2. Identifies unregistered components (ending with `View.tsx`)
3. Creates appropriate variant folders and registration files
4. Updates the corresponding registration collector files

### How It Works

1. **Component Discovery**: Searches for `.tsx` files in each variant directory
2. **Registration Check**: Determines if components are already registered
3. **Metadata Inference**: Analyzes component name to infer metadata (tags, description)
4. **ID Assignment**: Assigns the next available ID for each category
5. **File Generation**: Uses the `generate-variant.js` script to create registration files
6. **Import Updates**: Adds imports to the registration collector files

The script includes intelligent metadata inference:
- Converts CamelCase to spaced words for name
- Infers tags from naming patterns (e.g., "Dashboard" → analytics tag)
- Creates appropriate descriptions based on component name and category
- Avoids ID conflicts with already registered variants

### Examples

**Migrating existing components:**

If you have existing components like:
- `src/components/review/question-view-variants/HeatmapView.tsx`
- `src/components/review/question-view-variants/MatrixGridView.tsx`
- `src/components/review/question-view-variants/TagCloudView.tsx`

Running the script will create registration files for each unregistered component:

```bash
node scripts/register-existing-components.js
```

Output:
```
Found 15 question view components
Component HeatmapView is already registered, skipping
Executing: node scripts/generate-variant.js question 4 "Matrix Grid" MatrixGridView "Matrix Grid visualization for questions" "grid,questions,analysis"
Created directory: src/components/review/question-view-variants/variant-4
Created variant-4/index.ts for question view: Matrix Grid
Updated src/components/review/question-view-variants/registerAllQuestionViews.ts with import for variant-4
Successfully set up variant-4 for question view: Matrix Grid
Executing: node scripts/generate-variant.js question 5 "Tag Cloud" TagCloudView "Tag Cloud visualization for questions" "questions,analysis"
...
```

## Development Workflow

### Creating New View Variants

1. **Create the component file**: 
   ```
   src/components/review/[category]-view-variants/MyNewView.tsx
   ```

2. **Register the component**:
   ```bash
   node scripts/generate-variant.js [category] [id] "My New View" MyNewView "Description" "tag1,tag2"
   ```

3. **Update the view** (if needed)

### Bulk Migration Workflow

1. **Create multiple component files** in the appropriate variant directories

2. **Run the bulk registration script**:
   ```bash
   node scripts/register-existing-components.js
   ```

3. **Verify registrations** by checking the UI or console logs

### Best Practices

1. **Use consistent naming**: End component names with `View`, `Chart`, or similar suffix
2. **Keep IDs sequential** when possible
3. **Provide meaningful descriptions** that explain what the view shows
4. **Use relevant tags** to make views filterable in the UI
5. **Check for registration** when components aren't appearing in the UI

## Troubleshooting

### Common Issues

1. **View not appearing in UI**
   - Check that the component is registered (look for variant-X directory)
   - Ensure registerAll file has the import
   - Verify component is properly exported

2. **Script errors**
   - Check that component file exists before registering
   - Ensure unique IDs across categories
   - Fix any import errors in component files

3. **Runtime errors**
   - Check for errors in component implementation
   - Ensure props are properly typed and passed

### Debugging

- Set `NODE_ENV=development` to see registration logs
- Check browser console for registration confirmation
- Look for file creation errors in the terminal

## Extending the Scripts

### Adding New Category Support

To support a new category (beyond `set`, `timeline`, `question`):

1. Update the category validation in `generate-variant.js`:
   ```javascript
   if (!['set', 'timeline', 'question', 'newcategory'].includes(category)) {
     // ...
   }
   ```

2. Add the new category to the registry in `viewRegistry.ts`:
   ```typescript
   const registry: ViewRegistry = {
     set: {},
     timeline: {},
     question: {},
     newcategory: {}
   };
   ```

3. Create a `registerAllNewcategoryViews.ts` file
4. Add the category to the `categories` array in `register-existing-components.js`

### Customizing Metadata Inference

To modify how metadata is inferred from component names:

1. Update the `getMetadataFromComponentName` function in `register-existing-components.js`
2. Add new tag patterns or description formats based on naming conventions
