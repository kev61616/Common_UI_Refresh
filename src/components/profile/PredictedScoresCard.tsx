'use client';

import React from 'react';
import { Typography } from '@/components/ui/typography'; // Assuming Typography component exists

interface Scores {
  overall: number;
  reading: number;
  writing: number;
  math: number;
}

interface PredictedScoresCardProps {
  scores: Scores;
}

export function PredictedScoresCard({ scores }: PredictedScoresCardProps) {
  // Map subject names to colors (using palette names)
  // TODO: Define this mapping more centrally if needed
  const subjectColorMapping: Record<string, string> = {
    Reading: 'bg-primary-500', // Blue
    Writing: 'bg-accent-500', // Purple/Violet
    Math: 'bg-cyan-500' // Keep cyan for now, or map to another palette like teal/success if available
  };

  return (
    // Use semantic colors
    <div className="bg-card text-card-foreground rounded-xl shadow-sm overflow-hidden border border-border" data-oid="hw5n2l_">
      <div className="p-6" data-oid=":it4k1v">
        <Typography variant="h3" className="text-foreground mb-4" data-oid="s_c0.19">Predicted Scores</Typography>

        <div className="mb-6" data-oid="90zwo7h">
          <div className="text-center mb-2" data-oid="mg0lvo9">
            {/* Use Typography h2 (maps to text-4xl) and primary color */}
            <Typography variant="h2" weight="bold" className="text-primary" data-oid="59pawmr">
              {scores.overall}
            </Typography>
            <Typography variant="small" className="text-muted-foreground" data-oid="7dok1z1">Overall Score</Typography>
          </div>

          {/* Use muted background and primary foreground for progress */}
          <div className="h-2 bg-muted rounded-full overflow-hidden" data-oid="cogd7tf">
            <div
              className="h-full bg-primary rounded-full"
              style={{ width: `${scores.overall / 1600 * 100}%` }} data-oid="x:1v._.">
            </div>
          </div>

          <div className="flex justify-between text-xs text-muted-foreground mt-1" data-oid="p5z:5y8">
            {/* Revert to span with direct classes as 'as' prop is not supported */}
            <span className="text-xs" data-oid="c11t:_r">0</span>
            <span className="text-xs" data-oid="xrgutv:">400</span>
            <span className="text-xs" data-oid="xx_bsr3">800</span>
            <span className="text-xs" data-oid="cpxpnr0">1200</span>
            <span className="text-xs" data-oid="fo--fre">1600</span>
          </div>
        </div>

        <div className="space-y-4" data-oid="jzf72wh">
          {/* Reading */}
          <div data-oid="5ql8o8t">
            <div className="flex justify-between mb-1" data-oid="qc6964z">
              <Typography variant="small" weight="medium" className="text-foreground" data-oid="gbbso:o">Reading</Typography>
              <Typography variant="small" weight="semibold" className="text-foreground" data-oid="r98.38g">{scores.reading}/800</Typography>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden" data-oid="d5e71fl">
              <div
                className={`h-full ${subjectColorMapping['Reading']} rounded-full`}
                style={{ width: `${scores.reading / 800 * 100}%` }} data-oid="47ivjq4">
              </div>
            </div>
          </div>

          {/* Writing */}
          <div data-oid="e3boo_a">
            <div className="flex justify-between mb-1" data-oid="lw.yj-f">
              <Typography variant="small" weight="medium" className="text-foreground" data-oid="-avn08z">Writing</Typography>
              <Typography variant="small" weight="semibold" className="text-foreground" data-oid="ol6iqjv">{scores.writing}/400</Typography>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden" data-oid="jcct2:k">
              <div
                className={`h-full ${subjectColorMapping['Writing']} rounded-full`}
                style={{ width: `${scores.writing / 400 * 100}%` }} data-oid="s8uy99v">
              </div>
            </div>
          </div>

          {/* Math */}
          <div data-oid="9yxvals">
            <div className="flex justify-between mb-1" data-oid="ulg27-.">
              <Typography variant="small" weight="medium" className="text-foreground" data-oid=".n1-vc9">Math</Typography>
              <Typography variant="small" weight="semibold" className="text-foreground" data-oid="8f9:bhl">{scores.math}/800</Typography>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden" data-oid="-9-q9xa">
              <div
                className={`h-full ${subjectColorMapping['Math']} rounded-full`}
                style={{ width: `${scores.math / 800 * 100}%` }} data-oid="l:8.:6v">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);

}