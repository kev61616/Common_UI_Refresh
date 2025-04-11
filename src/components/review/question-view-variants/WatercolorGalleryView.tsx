'use client';

import { useState, useEffect, useRef } from 'react';
import { QuestionViewProps } from './types';

/**
 * WatercolorGalleryView - An artistic gallery showcasing questions as watercolor paintings
 * Visually stunning display with artistic paint effects and categorization by subject
 */
export function WatercolorGalleryView({ practiceSets, onSelectSet, selectedSetId }: QuestionViewProps) {
  const [selectedSubject, setSelectedSubject] = useState<string | 'all'>('all');
  const [filterDifficulty, setFilterDifficulty] = useState<string | 'all'>('all');
  const canvasRefs = useRef<Record<string, HTMLCanvasElement | null>>({});

  // Get all unique subjects for the filter
  const subjects = Array.from(new Set(practiceSets.map((set) => set.subject)));

  // Filter practice sets based on selected subject
  const filteredSets = practiceSets.filter((set) =>
  (selectedSubject === 'all' || set.subject === selectedSubject) && (
  filterDifficulty === 'all' || set.questions.some((q) => q.difficulty === filterDifficulty))
  );

  // Sort sets by performance (accuracy) for color intensity
  const sortedSets = [...filteredSets].sort((a, b) => b.accuracy - a.accuracy);

  // Group sets by subject for gallery wall organization
  const setsBySubject = sortedSets.reduce<Record<string, typeof practiceSets>>((acc, set) => {
    if (!acc[set.subject]) {
      acc[set.subject] = [];
    }
    acc[set.subject].push(set);
    return acc;
  }, {});

  // Generate a color palette based on a subject name (for consistency)
  const getSubjectColorPalette = (subject: string) => {
    // Hash the subject name to get a stable hue
    const hash = subject.split('').reduce((h, c) => (h << 5) - h + c.charCodeAt(0), 0);
    const hue = Math.abs(hash % 360);

    // Return a harmonious palette with consistent colors for each subject
    return {
      primary: `hsl(${hue}, 70%, 60%)`,
      secondary: `hsl(${(hue + 30) % 360}, 60%, 70%)`,
      accent: `hsl(${(hue + 60) % 360}, 80%, 85%)`,
      dark: `hsl(${hue}, 70%, 25%)`,
      light: `hsl(${hue}, 30%, 95%)`
    };
  };

  // Draw watercolor effect on canvases
  useEffect(() => {
    Object.entries(canvasRefs.current).forEach(([id, canvas]) => {
      if (!canvas) return;

      const set = practiceSets.find((s) => s.id === id);
      if (!set) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Get color palette for this subject
      const palette = getSubjectColorPalette(set.subject);

      // Calculate color intensity based on accuracy
      const intensity = set.accuracy / 100;

      // Draw background watercolor effect
      drawWatercolorBackground(ctx, canvas.width, canvas.height, palette, intensity);

      // Draw watercolor spatter effects
      drawWatercolorSpatters(ctx, canvas.width, canvas.height, palette, set.accuracy);
    });
  }, [filteredSets, practiceSets]);

  // Draw watercolor background
  const drawWatercolorBackground = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  palette: Record<string, string>,
  intensity: number) =>
  {
    // Create radial gradient for main wash
    const gradient = ctx.createRadialGradient(
      width * 0.5,
      height * 0.5,
      0,
      width * 0.5,
      height * 0.5,
      width * 0.7
    );

    // Adjust color with intensity
    gradient.addColorStop(0, adjustColorOpacity(palette.accent, 0.8 * intensity));
    gradient.addColorStop(0.6, adjustColorOpacity(palette.secondary, 0.6 * intensity));
    gradient.addColorStop(1, adjustColorOpacity(palette.primary, 0.4 * intensity));

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Create watercolor edge effect - uneven edges with transparency
    ctx.globalCompositeOperation = 'destination-out';

    // Draw random organic shapes around the edges for texture
    const edgePoints = 12;
    const edgeVariation = width * 0.15;

    ctx.beginPath();
    for (let i = 0; i < edgePoints; i++) {
      const angle = i / edgePoints * Math.PI * 2;
      const radius = width * 0.55 + (Math.random() * edgeVariation - edgeVariation * 0.5);
      const x = width * 0.5 + Math.cos(angle) * radius;
      const y = height * 0.5 + Math.sin(angle) * radius;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        // Use bezier curves for organic shapes
        const prevAngle = (i - 1) / edgePoints * Math.PI * 2;
        const cx = width * 0.5 + Math.cos(prevAngle + (angle - prevAngle) * 0.5) * (radius * 1.1);
        const cy = height * 0.5 + Math.sin(prevAngle + (angle - prevAngle) * 0.5) * (radius * 1.1);
        ctx.quadraticCurveTo(cx, cy, x, y);
      }
    }
    ctx.closePath();

    // Create another gradient for texture edge
    const edgeGradient = ctx.createRadialGradient(
      width * 0.5, height * 0.5, width * 0.3,
      width * 0.5, height * 0.5, width * 0.6
    );
    edgeGradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
    edgeGradient.addColorStop(1, 'rgba(255, 255, 255, 0.9)');

    ctx.fillStyle = edgeGradient;
    ctx.fill();

    // Reset composite operation
    ctx.globalCompositeOperation = 'source-over';
  };

  // Draw spatters and watercolor details
  const drawWatercolorSpatters = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  palette: Record<string, string>,
  accuracy: number) =>
  {
    // Add watercolor splatters for texture
    const spatterCount = Math.floor(5 + accuracy / 10); // More spatters for higher accuracy

    for (let i = 0; i < spatterCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const size = 5 + Math.random() * 15;

      // Vary opacity for more natural look
      const opacity = 0.1 + Math.random() * 0.2;

      // Choose random color from palette
      const colors = [palette.primary, palette.secondary, palette.accent];
      const color = adjustColorOpacity(colors[Math.floor(Math.random() * colors.length)], opacity);

      // Draw spatter
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();

      // Add small drops around the main spatter
      const droplets = Math.floor(Math.random() * 5);
      for (let j = 0; j < droplets; j++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = size * (1 + Math.random());
        const dropX = x + Math.cos(angle) * distance;
        const dropY = y + Math.sin(angle) * distance;
        const dropSize = size * 0.2 * Math.random();

        ctx.beginPath();
        ctx.arc(dropX, dropY, dropSize, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      }
    }

    // Add pigment separation effect around edges
    ctx.globalCompositeOperation = 'multiply';

    // Draw pigment separation lines
    const separationLines = Math.floor(2 + accuracy / 20);
    for (let i = 0; i < separationLines; i++) {
      const startX = Math.random() * width * 0.3 + width * 0.35;
      const startY = Math.random() * height * 0.3 + height * 0.35;
      const length = 10 + Math.random() * 30;
      const angle = Math.random() * Math.PI * 2;

      const endX = startX + Math.cos(angle) * length;
      const endY = startY + Math.sin(angle) * length;

      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.strokeStyle = adjustColorOpacity(palette.primary, 0.1);
      ctx.lineWidth = 1 + Math.random() * 2;
      ctx.stroke();
    }

    // Reset composite operation
    ctx.globalCompositeOperation = 'source-over';
  };

  // Helper to adjust color opacity
  const adjustColorOpacity = (color: string, opacity: number) => {
    if (color.startsWith('hsl')) {
      return color.replace(')', `, ${opacity})`).
      replace('hsl', 'hsla');
    }
    return color;
  };

  // Generate frame style based on set properties
  const getFrameStyle = (set: (typeof practiceSets)[0]) => {
    // Style frame based on difficulty
    let frameStyle = 'border-slate-300 dark:border-slate-600';
    let shadowStyle = 'shadow-md';

    const avgDifficulty = set.questions.reduce((sum, q) => {
      if (q.difficulty === 'Hard') return sum + 3;
      if (q.difficulty === 'Medium') return sum + 2;
      return sum + 1;
    }, 0) / set.questions.length;

    if (avgDifficulty > 2.5) {
      frameStyle = 'border-stone-700 dark:border-stone-800';
      shadowStyle = 'shadow-lg';
    } else if (avgDifficulty > 1.5) {
      frameStyle = 'border-stone-500 dark:border-stone-700';
      shadowStyle = 'shadow';
    }

    // Selected item gets special frame
    if (set.id === selectedSetId) {
      frameStyle = 'border-amber-500 dark:border-amber-600';
      shadowStyle = 'shadow-lg shadow-amber-200/20 dark:shadow-amber-900/30';
    }

    return `border-8 ${frameStyle} ${shadowStyle} rounded-sm bg-white dark:bg-slate-800`;
  };

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm" data-oid="axse22r">
      <h3 className="text-xl font-bold mb-6 text-center" data-oid="wfsq7lt">25. Watercolor Gallery View</h3>
      
      {/* Filter Controls */}
      <div className="flex flex-wrap justify-center gap-4 mb-6" data-oid="7317r5c">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow px-4 py-2" data-oid="zl2f4-z">
          <label className="block text-sm text-slate-500 dark:text-slate-400 mb-1" data-oid="x2iz9aa">Subject</label>
          <select
            className="bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white rounded px-2 py-1 text-sm border border-slate-200 dark:border-slate-600"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value as any)} data-oid="_q116u9">

            <option value="all" data-oid="n4in2rs">All Subjects</option>
            {subjects.map((subject) =>
            <option key={subject} value={subject} data-oid="wty43-4">{subject}</option>
            )}
          </select>
        </div>
        
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow px-4 py-2" data-oid=":rx8aoe">
          <label className="block text-sm text-slate-500 dark:text-slate-400 mb-1" data-oid="it36-a2">Difficulty</label>
          <select
            className="bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white rounded px-2 py-1 text-sm border border-slate-200 dark:border-slate-600"
            value={filterDifficulty}
            onChange={(e) => setFilterDifficulty(e.target.value as any)} data-oid="5s3tqop">

            <option value="all" data-oid="a2ewykx">All Difficulties</option>
            <option value="Easy" data-oid="a0k1qpo">Easy</option>
            <option value="Medium" data-oid="tbuabm4">Medium</option>
            <option value="Hard" data-oid="tdtbfgu">Hard</option>
          </select>
        </div>
      </div>
      
      {/* Gallery Display */}
      <div className="bg-stone-100 dark:bg-slate-900 p-6 rounded-lg min-h-[500px]" data-oid="d.w1hp3">
        {Object.entries(setsBySubject).length > 0 ?
        <div className="space-y-12" data-oid="6ndrml0">
            {Object.entries(setsBySubject).map(([subject, sets]) =>
          <div key={subject} className="gallery-wall" data-oid="dck507z">
                <h4 className="text-lg font-serif text-center mb-3 border-b border-stone-300 dark:border-slate-700 pb-2" data-oid="hcn9w1t">
                  {subject}
                </h4>
                
                <div className="flex flex-wrap gap-6 justify-center" data-oid="o01a:f9">
                  {sets.map((set) =>
              <div
                key={set.id}
                className={`relative w-[180px] h-[220px] transition-all duration-300 transform hover:scale-105 cursor-pointer group ${getFrameStyle(set)}`}
                onClick={() => onSelectSet && onSelectSet(set.id)} data-oid="_bkb40n">

                      {/* Background canvas for watercolor effect */}
                      <canvas
                  ref={(el) => canvasRefs.current[set.id] = el}
                  width="180"
                  height="220"
                  className="absolute inset-0 w-full h-full" data-oid="tfcr_4x" />

                      
                      {/* Paper texture overlay */}
                      <div className="absolute inset-0 opacity-30 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJub2lzZSIgeD0iMCIgeT0iMCIgd2lkdGg9IjMwMCUiIGhlaWdodD0iMzAwJSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNzUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')]" data-oid="4f5:ect"></div>
                      
                      {/* Content */}
                      <div className="relative z-10 flex flex-col justify-between h-full p-4 text-center" data-oid="q-6130a">
                        <h5 className="text-md font-medium font-serif text-slate-900 dark:text-white mt-2" data-oid="xzojv4o">
                          {set.type}
                        </h5>
                        
                        <div className="mt-2" data-oid="y8:we5p">
                          {/* Difficulty markers as paint strokes */}
                          <div className="flex justify-center gap-1 mb-2" data-oid="cls3:11">
                            {set.questions.some((q) => q.difficulty === 'Hard') &&
                      <div
                        className="h-3 w-12 rounded-full"
                        style={{ background: getSubjectColorPalette(set.subject).primary }} data-oid="h55yx9g" />

                      }
                            {set.questions.some((q) => q.difficulty === 'Medium') &&
                      <div
                        className="h-3 w-8 rounded-full"
                        style={{ background: getSubjectColorPalette(set.subject).secondary }} data-oid="6v7s6e." />

                      }
                            {set.questions.some((q) => q.difficulty === 'Easy') &&
                      <div
                        className="h-3 w-4 rounded-full"
                        style={{ background: getSubjectColorPalette(set.subject).accent }} data-oid="x09_oe2" />

                      }
                          </div>
                          
                          {/* Simple stats */}
                          <div className="text-sm font-serif text-slate-700 dark:text-slate-300" data-oid="n:1gu6n">
                            {set.questions.length} Questions
                          </div>
                          
                          {/* Accuracy as swatch */}
                          <div className="mt-3 flex justify-center" data-oid="4abxeqo">
                            <div className="inline-block px-3 py-1 rounded-full text-xs font-medium"
                      style={{
                        background: getSubjectColorPalette(set.subject).secondary,
                        opacity: 0.4 + set.accuracy / 100 * 0.6
                      }} data-oid="f9njbdf">
                              {set.accuracy}% Accuracy
                            </div>
                          </div>
                        </div>
                        
                        {/* Date as signature */}
                        <div className="text-xs italic mt-1 text-slate-500 dark:text-slate-400 font-serif" data-oid="_skxm6k">
                          {new Date(set.dateCompleted).toLocaleDateString()}
                        </div>
                        
                        {/* Signature */}
                        <div className="absolute bottom-2 right-3 font-serif italic text-xs opacity-60 text-slate-500 dark:text-slate-400" data-oid="iyaijgq">
                          {set.type.split(' ')[0]}
                        </div>
                      </div>
                    </div>
              )}
                </div>
              </div>
          )}
          </div> :

        <div className="flex items-center justify-center min-h-[500px]" data-oid="y58_mkr">
            <div className="text-center text-slate-400 dark:text-slate-500" data-oid="rtya9o_">
              <p className="text-lg font-serif italic" data-oid="_jf4m6n">No paintings on display</p>
              <p className="text-sm mt-2" data-oid="bem4:kx">Try adjusting your filters</p>
            </div>
          </div>
        }
      </div>
      
      {/* Description */}
      <div className="mt-4 bg-white dark:bg-slate-800 rounded-lg p-3 text-sm text-slate-600 dark:text-slate-300" data-oid="-jfw8jc">
        <p className="font-serif" data-oid="qkh_t2v">
          This watercolor gallery view organizes your questions as artistic paintings, with color intensity representing performance. 
          Each subject has its own palette, with frame styles indicating question difficulty.
        </p>
      </div>
    </div>);

}