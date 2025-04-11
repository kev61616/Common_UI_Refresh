'use client';

import React, { useState, useEffect } from 'react';
import { SetViewProps } from './types';

export const JazzCompositionView: React.FC<SetViewProps> = ({
  sets,
  selectedSetId,
  onSelectSet,
  isLoading = false
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || isLoading) {
    return (
      <div className="min-h-[500px] flex items-center justify-center" data-oid="k57lfn_">
        <div className="w-8 h-8 border-t-2 border-primary rounded-full animate-spin" data-oid="sj9cpci"></div>
      </div>);

  }

  if (!sets || sets.length === 0) {
    return (
      <div className="min-h-[500px] flex items-center justify-center bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg" data-oid="o9u8s2g">
        <p className="text-slate-500 dark:text-slate-400" data-oid="uzs4vsm">No compositions available to display</p>
      </div>);

  }

  // Musical staff and note rendering functions

  // Generate a musical staff SVG
  const generateStaff = (width: number) => {
    const lines = [];
    const lineHeight = 10;

    // Create 5 staff lines
    for (let i = 0; i < 5; i++) {
      lines.push(
        <line
          key={`staff-line-${i}`}
          x1="0"
          y1={i * lineHeight}
          x2={width}
          y2={i * lineHeight}
          className="stroke-slate-700 dark:stroke-slate-300"
          strokeWidth="1" data-oid="_8a-j7k" />

      );
    }

    return (
      <g data-oid="hiov0z-">
        {lines}
      </g>);

  };

  // Generate musical notes representing questions
  const generateNotes = (set: any, staffWidth: number) => {
    if (!set.questions || set.questions.length === 0) return null;

    const notes = [];
    const noteSpacing = staffWidth / (set.questions.length + 1);
    const staffHeight = 40; // 5 lines with 10px spacing

    const getNoteColor = (accuracy: number) => {
      if (accuracy >= 90) return 'fill-emerald-500 dark:fill-emerald-400';
      if (accuracy >= 70) return 'fill-blue-500 dark:fill-blue-400';
      if (accuracy >= 50) return 'fill-amber-500 dark:fill-amber-400';
      return 'fill-rose-500 dark:fill-rose-400';
    };

    // Question-specific accuracy if available, otherwise use overall set accuracy
    const getQuestionAccuracy = (questionIndex: number) => {
      if (set.questions[questionIndex]?.accuracy) {
        return set.questions[questionIndex].accuracy;
      }
      return set.accuracy || 50;
    };

    // Generate note elements for each question
    for (let i = 0; i < set.questions.length; i++) {
      const x = (i + 1) * noteSpacing;

      // Determine vertical position (note pitch) based on question difficulty or another attribute
      // Mapping to different positions on the staff (0-40) with some randomness for visual interest
      const basePitch = 20; // Middle of the staff
      const pitchVariation = (i * 7 % 11 - 5) * 4; // Pseudo-random variation but with musical logic
      const y = Math.max(0, Math.min(40, basePitch + pitchVariation));

      const accuracy = getQuestionAccuracy(i);
      const noteColor = getNoteColor(accuracy);

      // If question is completed, show a filled note, otherwise an empty note
      const isCompleted = set.completedCount > i;

      // Note head
      notes.push(
        <g key={`note-${i}`} className="transition-all duration-300 hover:scale-110" data-oid="77xbye8">
          <ellipse
            cx={x}
            cy={y}
            rx={6}
            ry={4}
            className={`stroke-slate-800 dark:stroke-slate-200 ${isCompleted ? noteColor : 'fill-none'}`}
            strokeWidth="1.5"
            transform={`rotate(-15, ${x}, ${y})`} data-oid="e3uab4a" />

          
          {/* Note stem */}
          <line
            x1={x + 5}
            y1={y}
            x2={x + 5}
            y2={y - 25}
            className="stroke-slate-800 dark:stroke-slate-200"
            strokeWidth="1.5" data-oid="husipib" />

          
          {/* Add accuracy indicator - smaller circle */}
          <circle
            cx={x + 10}
            cy={y - 5}
            r={2}
            className={noteColor} data-oid="466cv2e" />

        </g>
      );

      // For some visual rhythm, add bar lines every 4 notes
      if ((i + 1) % 4 === 0 && i < set.questions.length - 1) {
        notes.push(
          <line
            key={`barline-${i}`}
            x1={(i + 1.5) * noteSpacing}
            y1={0}
            x2={(i + 1.5) * noteSpacing}
            y2={40}
            className="stroke-slate-700 dark:stroke-slate-300"
            strokeWidth="1" data-oid="z7i12h4" />

        );
      }
    }

    return notes;
  };

  // Generate dynamic accidentals and decorative elements
  const generateDecorations = (set: any, staffWidth: number) => {
    const decorations = [];

    // Add a treble clef at the beginning
    decorations.push(
      <path
        key="treble-clef"
        d="M10,35 C5,25 5,15 10,10 C15,5 20,5 25,15 C30,25 25,35 15,40 C10,42 5,45 5,50 C5,55 10,60 15,55 C20,50 15,45 10,45 L10,35 Z"
        className="fill-none stroke-slate-800 dark:stroke-slate-200"
        strokeWidth="1.5"
        transform="scale(0.6) translate(5, 5)" data-oid="7x4_axf" />

    );

    // Add a time signature based on question count
    const beatsPerMeasure = 4;
    const beatUnit = 4;

    decorations.push(
      <text
        key="time-sig-top"
        x={35}
        y={15}
        className="fill-slate-800 dark:fill-slate-200 text-lg font-bold" data-oid="3l-0mq8">

        {beatsPerMeasure}
      </text>
    );

    decorations.push(
      <text
        key="time-sig-bottom"
        x={35}
        y={35}
        className="fill-slate-800 dark:fill-slate-200 text-lg font-bold" data-oid="0_vbs58">

        {beatUnit}
      </text>
    );

    // Add a key signature based on set accuracy
    // Higher accuracy gets more sharps (major keys), lower gets flats (minor keys)
    const accuracy = set.accuracy || 50;
    const isSharpKey = accuracy >= 60;
    const accidentalCount = Math.min(7, Math.max(0, Math.floor(accuracy / 15)));

    // Positions for sharps and flats on the staff
    const sharpPositions = [25, 15, 35, 25, 15, 35, 25]; // F C G D A E B
    const flatPositions = [15, 35, 15, 35, 15, 35, 15]; // B E A D G C F

    for (let i = 0; i < accidentalCount; i++) {
      const xPos = 50 + i * 10;
      const yPos = isSharpKey ? sharpPositions[i] : flatPositions[i];

      if (isSharpKey) {
        // Sharp sign
        decorations.push(
          <path
            key={`sharp-${i}`}
            d={`M${xPos},${yPos - 8} L${xPos},${yPos + 8} M${xPos - 3},${yPos - 3} L${xPos + 3},${yPos - 6} M${xPos - 3},${yPos + 3} L${xPos + 3},${yPos}`}
            className="stroke-slate-800 dark:stroke-slate-200"
            strokeWidth="1.5" data-oid="avwykjg" />

        );
      } else {
        // Flat sign
        decorations.push(
          <path
            key={`flat-${i}`}
            d={`M${xPos - 2},${yPos - 8} L${xPos - 2},${yPos + 5} C${xPos + 6},${yPos + 2} ${xPos + 6},${yPos - 4} ${xPos - 2},${yPos - 2}`}
            className="stroke-slate-800 dark:stroke-slate-200 fill-none"
            strokeWidth="1.5" data-oid="5ynjlix" />

        );
      }
    }

    // Add expressive markings based on set properties
    if (set.pace === 'Fast') {
      decorations.push(
        <text
          key="allegro"
          x={120}
          y={-5}
          className="fill-slate-800 dark:fill-slate-200 text-sm italic" data-oid="oi.rqvq">

          Allegro
        </text>
      );
    } else if (set.pace === 'Slow') {
      decorations.push(
        <text
          key="adagio"
          x={120}
          y={-5}
          className="fill-slate-800 dark:fill-slate-200 text-sm italic" data-oid="kk0_cj9">

          Adagio
        </text>
      );
    } else {
      decorations.push(
        <text
          key="moderato"
          x={120}
          y={-5}
          className="fill-slate-800 dark:fill-slate-200 text-sm italic" data-oid="jh.a36x">

          Moderato
        </text>
      );
    }

    return decorations;
  };

  // Render the music composition for a set
  const renderComposition = (set: any, isSelected: boolean) => {
    const staffWidth = 480;

    // Determine the musical style based on subject
    const getMusicalStyle = (subject: string) => {
      switch (subject) {
        case 'Math':
          return 'Counterpoint';
        case 'Reading':
          return 'Impressionism';
        case 'Writing':
          return 'Minimalism';
        case 'Science':
          return 'Polyrhythmic';
        default:
          return 'Jazz';
      }
    };

    const style = getMusicalStyle(set.subject || 'Other');

    // Estimate composition complexity
    const complexity = set.questions ?
    `${Math.min(5, Math.max(1, Math.ceil(set.questions.length / 8)))} movements` :
    'Unknown complexity';

    return (
      <div
        className={`${
        isSelected ? 'ring-2 ring-indigo-500 dark:ring-indigo-400 shadow-lg' : ''} bg-amber-50 dark:bg-slate-800 rounded-xl p-4 shadow transition-shadow hover:shadow-md`
        } data-oid="qy9rh.t">

        <div className="flex justify-between items-center mb-3" data-oid="xfzcq2f">
          <div data-oid="bro:vlt">
            <h3 className="font-serif italic text-lg text-slate-800 dark:text-slate-200" data-oid="n95m_g1">{set.title}</h3>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center" data-oid="_rfy9b_">
              <span className="italic font-medium" data-oid="b1amw54">{style}</span>
              <span className="mx-2" data-oid="0s-3rla">•</span>
              <span data-oid="qd6sshe">{complexity}</span>
              <span className="mx-2" data-oid="z.erzpp">•</span>
              <span data-oid="9z_fobl">Opus {set.id.slice(-2)}</span>
            </div>
          </div>
          
          <div className="text-right" data-oid="73z0ag0">
            <div className="font-medium text-sm text-indigo-600 dark:text-indigo-400" data-oid="p9w4z.3">{set.accuracy || 0}% mastery</div>
            <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="1usuzku">
              {set.completedCount || 0}/{set.questions?.length || 0} measures
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto pb-2" data-oid="3t:zj6s">
          <svg width={staffWidth} height={60} className="mx-auto" data-oid="z6-99vq">
            {/* Staff with margins for clef and time signature */}
            <g transform="translate(0, 10)" data-oid="_1akw86">
              {generateStaff(staffWidth)}
              {generateDecorations(set, staffWidth)}
              {generateNotes(set, staffWidth)}
            </g>
          </svg>
        </div>
      </div>);

  };

  // Group sets by "album collections" (subject areas)
  const groupedSets = sets.reduce((acc, set) => {
    const subject = set.subject || 'Other';
    if (!acc[subject]) {
      acc[subject] = [];
    }
    acc[subject].push(set);
    return acc;
  }, {} as Record<string, typeof sets>);

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm" data-oid="zjvh_br">
      <h3 className="text-xl font-bold mb-4 text-center" data-oid="gwh0qb.">Jazz Composition View</h3>
      
      <div className="bg-white dark:bg-slate-900 rounded-lg p-4 shadow-inner" data-oid="9wfqwv_">
        {/* Decorative musical header */}
        <div className="flex items-center justify-center mb-6 space-x-3" data-oid="kx3h5gp">
          <svg width="20" height="20" viewBox="0 0 24 24" className="text-indigo-500 dark:text-indigo-400 fill-current" data-oid="xvfqknq">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" data-oid="81a:9_3" />
          </svg>
          <div className="h-px flex-grow bg-slate-300 dark:bg-slate-700" data-oid="0fqgaej"></div>
          <svg width="20" height="20" viewBox="0 0 24 24" className="text-indigo-500 dark:text-indigo-400 fill-current" data-oid="ynm6.zy">
            <path d="M16 18c0-2.21 1.79-4 4-4v-3c0-.55-.45-1-1-1h-3v-3h-2v3h-3v-3H9v3H6c-.55 0-1 .45-1 1v2.5l-2 2v.5c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1l2-2V17c0 .55.45 1 1 1h2.5c.08.33.2.65.38.94.06.11.14.21.21.31.26.33.57.63.91.89.1.07.2.15.31.21.3.18.62.29.94.38.32.09.65.15.99.15.34 0 .67-.06.99-.15.32-.09.64-.2.94-.38.11-.06.21-.14.31-.21.34-.26.65-.56.91-.89.07-.1.15-.2.21-.31.18-.29.3-.61.38-.94H17c.55 0 1-.45 1-1v-3h2v-1.5c-.31-.11-.59-.28-.84-.49l-.05-.04c-.1-.08-.19-.17-.28-.26-.91-.91-1.38-2.13-1.37-3.37.01-1.31.56-2.57 1.51-3.45.15-.14.3-.26.46-.38.2-.15.4-.23.61-.34.04-.02.09-.03.13-.05l.45-.17c.29-.11.59-.19.9-.23.32-.05.62-.1.96-.12h.18c.33-.02.66.04.97.11.28.06.56.15.82.26.06.03.11.05.17.08l.64.32.36.23c.22.15.43.33.62.51.56.55.94 1.27 1.18 2 .2.67.35 1.36.4 2.07.02.14.01.29.02.43-.01.14 0 .27-.02.4.02.11.02.23.02.34-.03.91-.15 1.81-.4 2.67-.11.37-.27.72-.45 1.06-.04.08-.09.16-.13.24h3.57c.55 0 1-.45 1-1v-3c-2.21 0-4-1.79-4-4 0-.83.26-1.58.67-2.22-.46-.26-.84-.64-1.1-1.1-.63.42-1.38.67-2.22.67-2.21 0-4-1.79-4-4 0-.74.22-1.42.58-2.01-.38-.16-.7-.48-.87-.85-.58.37-1.27.59-2.01.59-2.11 0-3.82-1.71-3.82-3.82 0-.92.34-1.76.88-2.41H8.88c.55 0 1.4-.16 1.4-.72V3.9c0-.56-.85-.72-1.4-.72H3.12c-.55 0-1.4.16-1.4.72v1.36c0 .56.85.72 1.4.72.86 0 1.56.7 1.56 1.56 0 .86-.7 1.56-1.56 1.56-.57 0-1.08-.31-1.36-.77-.08.35-.12.71-.12 1.09 0 2.76 2.24 5 5 5 .85 0 1.66-.22 2.36-.61.39-.26.83-.41 1.28-.41.47 0 .89.16 1.25.41.2-.15.41-.27.64-.37-.02-.19-.04-.38-.04-.58 0-2.76 2.24-5 5-5 .37 0 .73.04 1.08.12-.69-.44-1.08-1.19-1.08-2V5.36c0-.56.85-.72 1.4-.72h5.76c.55 0 1.4.16 1.4.72v1.36c0 .56-.85.72-1.4.72h-5.76c-.58 0-1.08-.29-1.37-.71-.85.41-1.53 1.1-1.93 1.95h8.06c.55 0 1.4.16 1.4.72v1.36c0 .56-.85.72-1.4.72H8.88c-.56 0-1.08-.29-1.37-.72-.38.86-.93 1.61-1.63 2.21.2.13.37.29.57.42H19c.55 0 1 .45 1 1v3h2c0-2.21 1.79-4 4-4z" data-oid="wqnru4r" />
          </svg>
          <div className="h-px flex-grow bg-slate-300 dark:bg-slate-700" data-oid="3pds7_i"></div>
          <svg width="20" height="20" viewBox="0 0 24 24" className="text-indigo-500 dark:text-indigo-400 fill-current" data-oid="cd9.0c:">
            <path d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-3 12.5c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5.67-1.5 1.5-1.5 1.5.67 1.5 1.5z" data-oid="i2tjyxk" />
          </svg>
        </div>
        
        <div className="space-y-6" data-oid="sqtu8pv">
          {Object.entries(groupedSets).map(([subject, subjectSets]) =>
          <div key={subject} className="mb-8" data-oid="xnf9y1_">
              <h4 className="text-lg font-medium mb-4 border-b pb-2 border-slate-200 dark:border-slate-700 flex items-center" data-oid="hnf9o1f">
                <span className="mr-2" data-oid="0u8c_s2">{subject}</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-normal italic" data-oid="8nyb:gk">Album Collection</span>
              </h4>
              
              <div className="grid grid-cols-1 gap-4" data-oid="jo.:vs:">
                {subjectSets.map((set) =>
              <div
                key={set.id}
                onClick={() => onSelectSet(set.id)}
                className="cursor-pointer" data-oid="wbx..oh">

                    {renderComposition(set, set.id === selectedSetId)}
                  </div>
              )}
              </div>
            </div>
          )}
        </div>
        
        {/* Musical notation legend */}
        <div className="mt-8 border-t border-slate-200 dark:border-slate-700 pt-4" data-oid="95lgjs2">
          <h4 className="text-sm font-medium mb-3 text-center" data-oid="t8khzm9">Musical Notation Guide</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center" data-oid="j0nany_">
            <div data-oid="j48hijt">
              <svg width="100" height="30" className="mx-auto" data-oid="r059pz7">
                <g transform="translate(20, 15)" data-oid="dq2.f-d">
                  <ellipse cx="10" cy="10" rx="6" ry="4" className="fill-emerald-500 dark:fill-emerald-400 stroke-slate-800 dark:stroke-slate-200" strokeWidth="1.5" data-oid="e7gw92q" />
                  <line x1="15" y1="10" x2="15" y2="-15" className="stroke-slate-800 dark:stroke-slate-200" strokeWidth="1.5" data-oid="xys_844" />
                </g>
                <text x="50" y="25" className="text-xs text-slate-600 dark:text-slate-400 text-center" data-oid="8pyhw71">Completed (High Accuracy)</text>
              </svg>
            </div>
            
            <div data-oid="sop3y-x">
              <svg width="100" height="30" className="mx-auto" data-oid="_.of..8">
                <g transform="translate(20, 15)" data-oid="wjw1ysr">
                  <ellipse cx="10" cy="10" rx="6" ry="4" className="fill-none stroke-slate-800 dark:stroke-slate-200" strokeWidth="1.5" data-oid="gq9qu_b" />
                  <line x1="15" y1="10" x2="15" y2="-15" className="stroke-slate-800 dark:stroke-slate-200" strokeWidth="1.5" data-oid="pkso5sd" />
                </g>
                <text x="50" y="25" className="text-xs text-slate-600 dark:text-slate-400 text-center" data-oid="050:wem">Not Completed</text>
              </svg>
            </div>
            
            <div data-oid="-57b4eq">
              <svg width="100" height="30" className="mx-auto" data-oid="s3h44m4">
                <g transform="translate(20, 15)" data-oid="n0iolk7">
                  <line x1="0" y1="0" x2="30" y2="0" className="stroke-slate-800 dark:stroke-slate-200" strokeWidth="1" data-oid="5chpisy" />
                  <line x1="0" y1="10" x2="30" y2="10" className="stroke-slate-800 dark:stroke-slate-200" strokeWidth="1" data-oid=".9wnh4t" />
                </g>
                <text x="50" y="25" className="text-xs text-slate-600 dark:text-slate-400 text-center" data-oid="tyrl4nb">Staff Lines</text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>);

};