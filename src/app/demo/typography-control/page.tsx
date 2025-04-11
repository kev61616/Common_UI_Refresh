"use client";

import { useState } from "react";
import { Typography } from "@/components/ui/typography";
import * as typographyConfig from "../../../config/typography.mjs";

// Define TypeScript interfaces for the typography configuration
interface FontSize {
  size: string;
  lineHeight: string;
  weight?: number;
}

interface TypographyVariant {
  base: string;
  size: string;
  lineHeight: string;
  weight: string;
  tracking?: string;
  [key: string]: any;
}

interface ControlOption {
  key: string;
  label: string;
  options: { value: string; label: string }[];
  defaultValue: string;
}

// Typography presets
interface TypographyPreset {
  name: string;
  description: string;
  values: {
    fontFamily: string;
    fontSize: string;
    fontWeight: string;
    lineHeight: string;
    letterSpacing: string;
    textColor: string;
  };
  sampleText: string;
  variant: string;
}

export default function TypographyControlDemo() {
  // Text sample options for preview
  const sampleTextOptions = [
    "The quick brown fox jumps over the lazy dog.",
    "Typography is what language looks like. Good typography sets the tone of your written message.",
    "Almost all sans serif typefaces work well on screen, while many serif typefaces don't. But at larger sizes, both are fine.",
    "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz 1234567890",
    "The five boxing wizards jump quickly. Pack my box with five dozen liquor jugs.",
  ];
  
  // Preset typography styles
  const presets: TypographyPreset[] = [
    {
      name: "Enhanced Clarity",
      description: "Larger Inter font with improved readability and clarity",
      values: {
        fontFamily: "font-sans",
        fontSize: "text-lg", // Increased from base
        fontWeight: "font-medium", // Slightly heavier for better clarity
        lineHeight: "leading-relaxed", // More spacious line height
        letterSpacing: "tracking-wide", // Wider letter spacing for clarity
        textColor: "text-foreground"
      },
      sampleText: "This preset uses the Inter font with increased size and optimized spacing for maximum readability and clarity.",
      variant: "p"
    },
    {
      name: "Modern",
      description: "Clean, minimal style with comfortable reading experience",
      values: {
        fontFamily: "font-sans",
        fontSize: "text-base",
        fontWeight: "font-normal",
        lineHeight: "leading-7",
        letterSpacing: "tracking-normal",
        textColor: "text-foreground"
      },
      sampleText: "Modern typography emphasizes clarity and efficiency with clean sans-serif fonts and balanced spacing.",
      variant: "p"
    },
    {
      name: "Classic",
      description: "Traditional style with emphasis on readability",
      values: {
        fontFamily: "font-serif",
        fontSize: "text-lg",
        fontWeight: "font-medium",
        lineHeight: "leading-relaxed",
        letterSpacing: "tracking-tight",
        textColor: "text-foreground"
      },
      sampleText: "Classic typography draws on centuries of tradition with elegant proportions and reliable readability.",
      variant: "p"
    },
    {
      name: "Technical",
      description: "Precise style for technical content and documentation",
      values: {
        fontFamily: "font-mono",
        fontSize: "text-sm",
        fontWeight: "font-normal",
        lineHeight: "leading-normal",
        letterSpacing: "tracking-wide",
        textColor: "text-foreground"
      },
      sampleText: "Technical typography focuses on precision and structure, often using monospaced fonts for code and specifications.",
      variant: "p"
    },
    {
      name: "Headline",
      description: "Bold, attention-grabbing style for headers",
      values: {
        fontFamily: "font-sans",
        fontSize: "text-4xl",
        fontWeight: "font-bold",
        lineHeight: "leading-tight",
        letterSpacing: "tracking-tight",
        textColor: "text-primary"
      },
      sampleText: "Headlines Demand Attention",
      variant: "h2"
    },
    {
      name: "Minimal",
      description: "Subtle, understated style with focus on content",
      values: {
        fontFamily: "font-sans",
        fontSize: "text-sm",
        fontWeight: "font-normal",
        lineHeight: "leading-relaxed",
        letterSpacing: "tracking-wide",
        textColor: "text-muted-foreground"
      },
      sampleText: "Minimal typography steps back, letting the content speak for itself through subtle design choices.",
      variant: "p"
    },
    {
      name: "Editorial",
      description: "Refined style for long-form content",
      values: {
        fontFamily: "font-serif",
        fontSize: "text-base",
        fontWeight: "font-normal",
        lineHeight: "leading-loose",
        letterSpacing: "tracking-normal",
        textColor: "text-foreground"
      },
      sampleText: "Editorial typography creates a comfortable reading experience for extended text, with generous line height and thoughtful spacing.",
      variant: "p"
    }
  ];

  // State for current sample text
  const [sampleText, setSampleText] = useState(sampleTextOptions[0]);
  const [selectedSampleText, setSelectedSampleText] = useState(0);

  // Font controls
  const fontFamilyOptions = [
    { value: "font-sans", label: "Sans Serif (Inter)" },
    { value: "font-serif", label: "Serif" },
    { value: "font-mono", label: "Mono" },
  ];

  const fontSizeOptions = Object.entries(typographyConfig.fontSizes)
    .filter(([key]) => !["h1", "h2", "h3", "h4", "h5", "h6", "p1", "p2", "p3", "p4", "2xs"].includes(key))
    .map(([key, value]) => ({
      value: `text-${key}`,
      label: `${key} (${value.size})`,
    }));

  const fontWeightOptions = [
    { value: "font-normal", label: "Normal (400)" },
    { value: "font-medium", label: "Medium (500)" },
    { value: "font-semibold", label: "Semibold (600)" },
    { value: "font-bold", label: "Bold (700)" },
  ];

  const lineHeightOptions = [
    { value: "leading-none", label: "None (1)" },
    { value: "leading-tight", label: "Tight (1.25)" },
    { value: "leading-snug", label: "Snug (1.375)" },
    { value: "leading-normal", label: "Normal (1.5)" },
    { value: "leading-relaxed", label: "Relaxed (1.625)" },
    { value: "leading-loose", label: "Loose (2)" },
    { value: "leading-7", label: "7 (1.75rem)" },
  ];

  const letterSpacingOptions = [
    { value: "tracking-tighter", label: "Tighter (-0.05em)" },
    { value: "tracking-tight", label: "Tight (-0.025em)" },
    { value: "tracking-normal", label: "Normal (0)" },
    { value: "tracking-wide", label: "Wide (0.025em)" },
    { value: "tracking-wider", label: "Wider (0.05em)" },
    { value: "tracking-widest", label: "Widest (0.1em)" },
  ];

  const textColorOptions = [
    { value: "text-foreground", label: "Foreground (Default)" },
    { value: "text-muted-foreground", label: "Muted" },
    { value: "text-primary", label: "Primary" },
    { value: "text-primary-foreground", label: "Primary Foreground" },
    { value: "text-secondary", label: "Secondary" },
    { value: "text-secondary-foreground", label: "Secondary Foreground" },
    { value: "text-accent", label: "Accent" },
    { value: "text-accent-foreground", label: "Accent Foreground" },
  ];

  // Current preset
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);
  
  const controls: ControlOption[] = [
    {
      key: "fontFamily",
      label: "Font Family",
      options: fontFamilyOptions,
      defaultValue: "font-sans",
    },
    {
      key: "fontSize",
      label: "Font Size",
      options: fontSizeOptions,
      defaultValue: "text-base",
    },
    {
      key: "fontWeight",
      label: "Font Weight",
      options: fontWeightOptions,
      defaultValue: "font-normal",
    },
    {
      key: "lineHeight",
      label: "Line Height",
      options: lineHeightOptions,
      defaultValue: "leading-7",
    },
    {
      key: "letterSpacing",
      label: "Letter Spacing",
      options: letterSpacingOptions,
      defaultValue: "tracking-normal",
    },
    {
      key: "textColor",
      label: "Text Color",
      options: textColorOptions,
      defaultValue: "text-foreground",
    },
  ];

  // State for selected values
  const [selectedValues, setSelectedValues] = useState<Record<string, string>>(
    controls.reduce((acc, control) => {
      acc[control.key] = control.defaultValue;
      return acc;
    }, {} as Record<string, string>)
  );

  // Export options
  const [showExportPanel, setShowExportPanel] = useState(false);
  
  // Combined class for preview
  const previewClass = Object.values(selectedValues).join(" ");

  // Typography variant controls
  const [selectedVariant, setSelectedVariant] = useState<string>("p");
  const variants = Object.keys(typographyConfig.typographyVariants);
  
  // Function to apply a preset
  const applyPreset = (index: number) => {
    const preset = presets[index];
    setSelectedPreset(index);
    setSampleText(preset.sampleText);
    setSelectedVariant(preset.variant);
    
    // Apply all the preset values
    setSelectedValues({
      fontFamily: preset.values.fontFamily,
      fontSize: preset.values.fontSize,
      fontWeight: preset.values.fontWeight,
      lineHeight: preset.values.lineHeight,
      letterSpacing: preset.values.letterSpacing,
      textColor: preset.values.textColor,
    });
  };
  
  // Generate CSS for export
  const generateCSS = () => {
    const fontSizeValue = selectedValues.fontSize.replace('text-', '');
    const fontWeightValue = selectedValues.fontWeight.replace('font-', '');
    const lineHeightValue = selectedValues.lineHeight.replace('leading-', '');
    const letterSpacingValue = selectedValues.letterSpacing.replace('tracking-', '');
    
    return `.custom-typography {
  font-family: ${selectedValues.fontFamily === 'font-sans' ? 'Inter, sans-serif' : 
                selectedValues.fontFamily === 'font-serif' ? 'serif' : 
                'monospace'};
  font-size: var(--${fontSizeValue});
  font-weight: ${fontWeightValue === 'normal' ? '400' : 
                fontWeightValue === 'medium' ? '500' : 
                fontWeightValue === 'semibold' ? '600' : '700'};
  line-height: ${lineHeightValue === '7' ? '1.75rem' : 
                lineHeightValue === 'tight' ? '1.25' : 
                lineHeightValue === 'snug' ? '1.375' : 
                lineHeightValue === 'normal' ? '1.5' : 
                lineHeightValue === 'relaxed' ? '1.625' : 
                lineHeightValue === 'loose' ? '2' : '1.5'};
  letter-spacing: ${letterSpacingValue === 'tighter' ? '-0.05em' : 
                  letterSpacingValue === 'tight' ? '-0.025em' : 
                  letterSpacingValue === 'normal' ? '0' : 
                  letterSpacingValue === 'wide' ? '0.025em' : 
                  letterSpacingValue === 'wider' ? '0.05em' : '0.1em'};
  color: var(--${selectedValues.textColor.replace('text-', '')});
}`;
  };

  return (
    <div className="container py-10 max-w-6xl">
      <Typography variant="h1" className="mb-2">
        Typography Control Panel
      </Typography>
      <Typography variant="lead" className="mb-10">
        Modify typography settings to preview how they look in real-time
      </Typography>

      {/* Presets Row */}
      <div className="mb-10 bg-card rounded-lg border overflow-hidden">
        <div className="bg-muted p-4 border-b">
          <Typography variant="h4">Typography Presets</Typography>
          <Typography variant="small">Select a preset to quickly apply predefined typography styles</Typography>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {presets.map((preset, index) => (
              <div 
                key={preset.name}
                onClick={() => applyPreset(index)}
                className={`border rounded-lg p-4 hover:border-primary cursor-pointer transition-all ${
                  selectedPreset === index ? 'border-primary bg-primary/5' : ''
                }`}
              >
                <Typography variant="h5" className="mb-1">{preset.name}</Typography>
                <Typography variant="small" className="text-muted-foreground mb-3 block">{preset.description}</Typography>
                <div 
                  className={`p-3 rounded bg-background/80 ${preset.values.fontFamily} ${preset.values.fontSize} ${preset.values.fontWeight} ${preset.values.lineHeight} ${preset.values.letterSpacing} ${preset.values.textColor}`}
                  style={{
                    minHeight: '60px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {preset.sampleText}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-[1fr_1.5fr] gap-8">
        {/* Control Panel */}
        <div className="space-y-8 border p-6 rounded-lg bg-card">
          <div>
            <Typography variant="h3" className="mb-4">
              Controls
            </Typography>

            {/* Sample Text Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Sample Text
              </label>
              <div className="space-y-2">
                <select
                  className="w-full p-2 border rounded-md"
                  value={selectedSampleText}
                  onChange={(e) => {
                    const idx = parseInt(e.target.value);
                    setSelectedSampleText(idx);
                    setSampleText(sampleTextOptions[idx]);
                  }}
                >
                  {sampleTextOptions.map((text, idx) => (
                    <option key={idx} value={idx}>
                      {text.length > 60 ? text.substring(0, 60) + "..." : text}
                    </option>
                  ))}
                </select>
                <textarea
                  value={sampleText}
                  onChange={(e) => setSampleText(e.target.value)}
                  className="w-full p-2 border rounded-md min-h-[80px]"
                  placeholder="Type custom text here..."
                />
              </div>
            </div>

            {/* Typography Variant Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Typography Variant
              </label>
              <select
                className="w-full p-2 border rounded-md"
                value={selectedVariant}
                onChange={(e) => setSelectedVariant(e.target.value)}
              >
                {variants.map((variant) => (
                  <option key={variant} value={variant}>
                    {variant}
                  </option>
                ))}
              </select>
              <p className="text-xs text-muted-foreground mt-1">
                Predefined variants with set styles from typography.js
              </p>
            </div>

            {/* Individual Controls */}
            {controls.map((control) => (
              <div key={control.key} className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  {control.label}
                </label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={selectedValues[control.key]}
                  onChange={(e) => {
                    setSelectedValues({
                      ...selectedValues,
                      [control.key]: e.target.value,
                    });
                  }}
                >
                  {control.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            ))}

            {/* Export Panel Toggle */}
            <div className="mt-6 pt-6 border-t space-y-4">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium">
                  Generated Tailwind Classes
                </label>
                <button 
                  onClick={() => setShowExportPanel(!showExportPanel)}
                  className="text-xs px-2 py-1 bg-muted hover:bg-muted/80 rounded text-muted-foreground"
                >
                  {showExportPanel ? "Hide Export" : "Show Export Options"}
                </button>
              </div>
              <pre className="bg-slate-100 dark:bg-slate-800 p-3 rounded-md text-xs overflow-x-auto">
                {previewClass}
              </pre>
              
              {/* Export Panel */}
              {showExportPanel && (
                <div className="mt-4 pt-4 border-t space-y-4">
                  <Typography variant="h5">Export Options</Typography>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">CSS</label>
                    <pre className="bg-slate-100 dark:bg-slate-800 p-3 rounded-md text-xs overflow-x-auto whitespace-pre-wrap">
                      {generateCSS()}
                    </pre>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(generateCSS());
                        alert("CSS copied to clipboard!");
                      }}
                      className="mt-2 text-xs px-3 py-1.5 bg-primary text-primary-foreground rounded-md"
                    >
                      Copy CSS
                    </button>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Tailwind Config</label>
                    <pre className="bg-slate-100 dark:bg-slate-800 p-3 rounded-md text-xs overflow-x-auto whitespace-pre-wrap">
{`// in tailwind.config.js
extend: {
  typography: {
    custom: {
      css: {
        fontSize: '${selectedValues.fontSize.replace("text-", "")}',
        fontWeight: '${selectedValues.fontWeight.replace("font-", "")}',
        lineHeight: '${selectedValues.lineHeight.replace("leading-", "")}',
        letterSpacing: '${selectedValues.letterSpacing.replace("tracking-", "")}',
        fontFamily: '${selectedValues.fontFamily.replace("font-", "")}'
      }
    }
  }
}`}
                    </pre>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(`// in tailwind.config.js
extend: {
  typography: {
    custom: {
      css: {
        fontSize: '${selectedValues.fontSize.replace("text-", "")}',
        fontWeight: '${selectedValues.fontWeight.replace("font-", "")}',
        lineHeight: '${selectedValues.lineHeight.replace("leading-", "")}',
        letterSpacing: '${selectedValues.letterSpacing.replace("tracking-", "")}',
        fontFamily: '${selectedValues.fontFamily.replace("font-", "")}'
      }
    }
  }
}`);
                        alert("Tailwind config copied to clipboard!");
                      }}
                      className="mt-2 text-xs px-3 py-1.5 bg-primary text-primary-foreground rounded-md"
                    >
                      Copy Tailwind Config
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="space-y-6">
          <div className="border rounded-lg bg-card overflow-hidden">
            <div className="bg-muted p-2 border-b">
              <Typography variant="small" className="font-medium">Custom Style Preview</Typography>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <div className={`py-4 ${previewClass} border-b pb-4`}>{sampleText}</div>
                <p className="text-xs text-muted-foreground mt-2">
                  Above text uses manually applied Tailwind classes
                </p>
              </div>
              
              {/* Paragraph demo */}
              <div className="mb-2">
                <span className="text-xs text-muted-foreground block mb-1">Paragraph sample:</span>
                <div className={`${previewClass}`}>
                  <p className="mb-3">Typography is a fundamental aspect of design that can make or break user experience. Good typography enhances readability and creates visual hierarchy.</p>
                  <p>When used effectively, typography helps guide users through content while establishing the right mood and tone for your product or brand.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border rounded-lg bg-card overflow-hidden">
            <div className="bg-muted p-2 border-b">
              <Typography variant="small" className="font-medium">Typography Component Preview</Typography>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <Typography variant={selectedVariant as any} className="py-4 border-b pb-4">
                  {sampleText}
                </Typography>
                <p className="text-xs text-muted-foreground mt-2">
                  Above text uses the Typography component with variant={'"'}
                  {selectedVariant}
                  {'"'}
                </p>
              </div>
              
              {/* Multi-component demo */}
              <div>
                <span className="text-xs text-muted-foreground block mb-1">Component hierarchy sample:</span>
                <div className="border-l-4 border-primary pl-4 py-2">
                  <Typography variant="h4">Section Title</Typography>
                  <Typography variant="lead" className="mb-2">This lead paragraph introduces the section content and provides context.</Typography>
                  <Typography variant="p" className="mb-2">Regular paragraph text continues the discussion with more detailed information about the topic.</Typography>
                  <Typography variant="small">Additional notes in smaller text provide supplementary information.</Typography>
                </div>
              </div>
            </div>
          </div>

          <div className="border rounded-lg bg-card overflow-hidden">
            <div className="bg-muted p-2 border-b">
              <Typography variant="small" className="font-medium">Typography Scale</Typography>
            </div>
            <div className="p-6">
              <div className="grid gap-3 md:grid-cols-2">
                <div className="space-y-3">
                  <Typography variant="p" weight="medium" className="border-b pb-1">Standard Scale</Typography>
                  {Object.entries(typographyConfig.fontSizes)
                    .filter(([key]) => !key.includes("xs") && !["h1", "h2", "h3", "h4", "h5", "h6", "p1", "p2", "p3", "p4"].includes(key))
                    .map(([key, value]) => (
                      <div key={key} className="flex items-baseline">
                        <span className="w-16 text-xs text-muted-foreground">
                          {key}:
                        </span>
                        <span
                          style={{
                            fontSize: value.size,
                            lineHeight: value.lineHeight,
                          }}
                        >
                          {key === "base" ? "Base Text" : key}
                        </span>
                      </div>
                    ))}
                </div>
                
                <div className="space-y-3">
                  <Typography variant="p" weight="medium" className="border-b pb-1">Legacy Named Scale</Typography>
                  {Object.entries(typographyConfig.fontSizes)
                    .filter(([key]) => ["h1", "h2", "h3", "h4", "h5", "h6", "p1", "p2", "p3", "p4"].includes(key))
                    .map(([key, value]) => {
                      // Type assertion to handle optional weight property
                      const fontSizeVal = value as any;
                      return (
                        <div key={key} className="flex items-baseline">
                          <span className="w-16 text-xs text-muted-foreground">
                            {key}:
                          </span>
                          <span
                            style={{
                              fontSize: fontSizeVal.size,
                              lineHeight: fontSizeVal.lineHeight,
                              fontWeight: fontSizeVal.weight,
                            }}
                          >
                            {key}
                          </span>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 p-6 border rounded-lg">
        <Typography variant="h2" className="mb-4">
          Current Configuration
        </Typography>
        <Typography variant="p" className="mb-4">
          The current typography configuration is defined in{" "}
          <code className="px-1 py-0.5 bg-slate-100 dark:bg-slate-800 rounded">
            src/config/typography.mjs
          </code>
          . Edit this file to make system-wide changes to typography.
        </Typography>

        <Typography variant="h4" className="mt-6 mb-2">
          How to modify the configuration:
        </Typography>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          <li>
            Navigate to{" "}
            <code className="px-1 py-0.5 bg-slate-100 dark:bg-slate-800 rounded">
              src/config/typography.mjs
            </code>
          </li>
          <li>Edit the appropriate section (fontSizes, fontFamilies, etc.)</li>
          <li>Save the file to see changes take effect across the application</li>
        </ol>

        <Typography variant="muted" className="mt-4">
          See the{" "}
          <a href="/docs/typography-control" className="text-primary underline">
            Typography Control documentation
          </a>{" "}
          for more details.
        </Typography>
      </div>
    </div>
  );
}
