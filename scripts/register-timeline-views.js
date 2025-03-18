#!/usr/bin/env node

/**
 * ╔═══════════════════════════════════════════════════════════════════╗
 * ║                 Timeline View Registration Script                  ║
 * ║                                                                   ║
 * ║ Registers timeline view components with the new modular system    ║
 * ║ Creates a beautiful visualization of time through various styles  ║
 * ╚═══════════════════════════════════════════════════════════════════╝
 * 
 * Usage: node scripts/register-timeline-views.js
 */

const { execSync } = require('child_process');

// ANSI color codes for beautiful terminal output
const COLORS = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  underscore: '\x1b[4m',
  blink: '\x1b[5m',
  reverse: '\x1b[7m',
  hidden: '\x1b[8m',
  
  black: '\x1b[30m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  
  bgBlack: '\x1b[40m',
  bgRed: '\x1b[41m',
  bgGreen: '\x1b[42m',
  bgYellow: '\x1b[43m',
  bgBlue: '\x1b[44m',
  bgMagenta: '\x1b[45m',
  bgCyan: '\x1b[46m',
  bgWhite: '\x1b[47m'
};

// Helper functions for beautiful visual outputs
const visual = {
  title: (text) => {
    const width = process.stdout.columns || 80;
    const padding = Math.max(0, Math.floor((width - text.length - 4) / 2));
    const line = '═'.repeat(width - 2);
    
    console.log(`${COLORS.blue}╔${line}╗${COLORS.reset}`);
    console.log(`${COLORS.blue}║${' '.repeat(padding)}${COLORS.bright}${COLORS.white}${text}${COLORS.reset}${COLORS.blue}${' '.repeat(width - text.length - padding - 2)}║${COLORS.reset}`);
    console.log(`${COLORS.blue}╚${line}╝${COLORS.reset}`);
  },
  
  sectionTitle: (text) => {
    console.log(`\n${COLORS.bright}${COLORS.yellow}⏱ ${text} ${COLORS.reset}`);
    console.log(`${COLORS.yellow}${'─'.repeat(text.length + 4)}${COLORS.reset}`);
  },
  
  info: (text) => console.log(`${COLORS.blue}ℹ ${text}${COLORS.reset}`),
  
  success: (text) => console.log(`${COLORS.green}✓ ${text}${COLORS.reset}`),
  
  warning: (text) => console.log(`${COLORS.yellow}⚠ ${text}${COLORS.reset}`),
  
  error: (text) => console.log(`${COLORS.red}✗ ${text}${COLORS.reset}`),
  
  showTimelineIcon: (index, name) => {
    const icons = ['⏰', '⌛', '🕰️', '📅', '🗓️', '⏳', '⌚', '🕙', '📆', '🗒️', '⏲️', '🕑', '🕗', '🕛', '🕕', '🕚'];
    const icon = icons[index % icons.length];
    console.log(`\n${COLORS.cyan}${icon} ${COLORS.bright}${name}${COLORS.reset}`);
  },
  
  progress: (current, total) => {
    const width = 40;
    const percent = Math.floor((current / total) * 100);
    const filledWidth = Math.floor((current / total) * width);
    const emptyWidth = width - filledWidth;
    
    const bar = `${COLORS.bgBlue}${' '.repeat(filledWidth)}${COLORS.reset}${COLORS.bgBlack}${' '.repeat(emptyWidth)}${COLORS.reset}`;
    
    process.stdout.write(`\r${COLORS.blue}[${bar}] ${percent}%${COLORS.reset}`);
    
    if (current === total) {
      process.stdout.write('\n');
    }
  },
  
  timelineAnimation: () => {
    const timeline = [
      `${COLORS.dim}╔══════[${COLORS.reset}${COLORS.bright}${COLORS.blue} Past ${COLORS.reset}${COLORS.dim}]══════[${COLORS.reset}${COLORS.bright}${COLORS.yellow} Present ${COLORS.reset}${COLORS.dim}]═════[${COLORS.reset}${COLORS.bright}${COLORS.green} Future ${COLORS.reset}${COLORS.dim}]════╗${COLORS.reset}`,
      `${COLORS.dim}║                                                            ║${COLORS.reset}`,
      `${COLORS.dim}║  ${COLORS.reset}${COLORS.blue}●───●───●───●${COLORS.reset}${COLORS.yellow}───◆${COLORS.reset}${COLORS.green}───○───○───○───○  ${COLORS.reset}${COLORS.dim}║${COLORS.reset}`,
      `${COLORS.dim}║                                                            ║${COLORS.reset}`,
      `${COLORS.dim}╚════════════════════════════════════════════════════════════╝${COLORS.reset}`
    ];
    
    timeline.forEach(line => console.log(line));
  }
};

// Define timeline views to register
const timelineViews = [
  {
    id: 4,
    name: "Vertical Scrolling Timeline",
    component: "VerticalScrollingTimeline",
    description: "Vertical orientation timeline showing progression of activities and sets over time",
    tags: "verticalscrolling,chronological"
  },
  {
    id: 6,
    name: "Circular Timeline",
    component: "CircularTimeline",
    description: "Circular visualization of time periods with sets arranged in a clock-like pattern",
    tags: "circular,radial,chronological"
  },
  {
    id: 7,
    name: "3D Timeline",
    component: "ThreeDTimeline",
    description: "Three-dimensional timeline with depth perception for layered time periods",
    tags: "3d,depth,interactive"
  },
  {
    id: 8,
    name: "Storytelling Timeline",
    component: "StorytellingTimeline",
    description: "Narrative-based timeline that presents practice history as a story",
    tags: "narrative,story,chronological"
  },
  {
    id: 9,
    name: "Interactive Timeline Slider",
    component: "InteractiveTimelineSlider",
    description: "Draggable slider interface for navigating through time periods and sets",
    tags: "interactive,slider,navigation"
  },
  {
    id: 10,
    name: "Metro Timeline",
    component: "MetroTimeline",
    description: "Subway map inspired timeline showing connections between sets over time",
    tags: "metro,subway,connections"
  },
  {
    id: 11,
    name: "Timeline Calendar",
    component: "TimelineCalendar",
    description: "Calendar-based visualization of sets and activities organized by date",
    tags: "calendar,dates,organization"
  },
  {
    id: 12,
    name: "Achievement Timeline",
    component: "AchievementTimeline",
    description: "Timeline highlighting major achievements and milestones in the learning journey",
    tags: "achievements,milestones,progress"
  },
  {
    id: 13,
    name: "Subject Color Coded Timeline",
    component: "SubjectColorCodedTimeline",
    description: "Timeline with color-coding by subject area for easy visual filtering",
    tags: "color-coded,subjects,visual"
  },
  {
    id: 14,
    name: "Minimalist Timeline",
    component: "MinimalistTimeline",
    description: "Clean simplified timeline focusing on key events without visual distractions",
    tags: "minimalist,clean,focused"
  },
  {
    id: 15,
    name: "Photo Timeline",
    component: "PhotoTimeline",
    description: "Visual timeline with image thumbnails representing content or progress",
    tags: "photos,visual,thumbnails"
  },
  {
    id: 16,
    name: "Progress Path",
    component: "ProgressPath",
    description: "Journey-based timeline showing the learning path with progress indicators",
    tags: "path,journey,progress"
  },
  {
    id: 17,
    name: "Flow Diagram",
    component: "FlowDiagram",
    description: "Timeline visualization showing the flow between activities and sets",
    tags: "flow,diagram,connections"
  },
  {
    id: 18,
    name: "Milestone Timeline",
    component: "MilestoneTimeline",
    description: "Timeline highlighting key milestones and achievements along the learning journey",
    tags: "milestones,achievements,key-points"
  },
  {
    id: 19,
    name: "Comparison Timeline",
    component: "ComparisonTimeline",
    description: "Parallel timelines allowing comparison between different time periods or subjects",
    tags: "comparison,parallel,analysis"
  },
  {
    id: 20,
    name: "Stream Graph",
    component: "StreamGraph",
    description: "Flowing area-based timeline showing volume and changes across time periods",
    tags: "stream,area,flow"
  }
];

// Display beautiful intro
visual.title('Timeline View Registration');
visual.info(`Registering ${timelineViews.length} timeline views...`);
visual.timelineAnimation();
console.log();

// Register each timeline view with visual indicators
timelineViews.forEach((view, index) => {
  visual.showTimelineIcon(index, view.name);
  visual.progress(index, timelineViews.length);
  
  try {
    const command = `node scripts/generate-variant.js timeline ${view.id} "${view.name}" ${view.component} "${view.description}" "${view.tags}"`;
    console.log(`${COLORS.dim}Executing: ${command}${COLORS.reset}`);
    execSync(command, { stdio: 'inherit' });
    visual.success(`Successfully registered ${view.name}`);
  } catch (error) {
    visual.error(`Error registering ${view.name}: ${error.message}`);
  }
});

visual.progress(timelineViews.length, timelineViews.length);

// Completion message with timeline visualization
console.log('\n');
visual.title('Timeline Registration Complete!');

console.log(`\n${COLORS.bright}${COLORS.blue}Time travel through your data is now possible with ${timelineViews.length} unique timeline views!${COLORS.reset}`);
console.log(`${COLORS.green}From past to present to future, visualize your learning journey in extraordinary ways.${COLORS.reset}\n`);
