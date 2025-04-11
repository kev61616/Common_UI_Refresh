'use client';

import React from 'react';
import { Typography } from '@/components/ui/typography'; // Assuming Typography component exists

interface RankCardProps {
  scoreRank: string;
  rankProgress: number;
}

// TODO: Consider moving this helper to a utility file if used elsewhere
const getRankGradient = (rank: string): string => {
  // Map ranks to semantic/palette gradients
  switch (rank) {
    case 'Bronze':return 'from-warning-700 to-warning-600'; // Use warning palette
    case 'Silver':return 'from-slate-500 to-slate-400'; // Use slate (neutral)
    case 'Gold':return 'from-warning-500 to-warning-400'; // Use warning palette
    case 'Platinum':return 'from-primary-500 to-primary-400'; // Use primary palette (mapping cyan/sky to primary)
    case 'Diamond':return 'from-accent-500 to-accent-400'; // Use accent palette
    default:return 'from-slate-600 to-slate-500'; // Default to slate
  }
};

export function RankCard({ scoreRank, rankProgress }: RankCardProps) {
  const rankGradientClass = getRankGradient(scoreRank);
  const rankLevel = Math.floor(rankProgress / 20) + 1;

  return (
    // Use semantic colors
    <div className="bg-card text-card-foreground rounded-xl shadow-sm overflow-hidden border border-border p-6" data-oid="wg83:mg">
      <Typography variant="h3" className="text-foreground mb-4" data-oid="97oth7m">Current Rank</Typography>
      <div className="relative" data-oid="roj6ga6">
        {/* Apply semantic gradient */}
        <div className={`bg-gradient-to-r ${rankGradientClass} text-primary-foreground rounded-lg p-4 shadow-sm`} data-oid="slntbd0"> {/* Assuming gradients work well with primary-foreground */}
          <div className="flex items-center mb-2" data-oid="fz04r4y">
            <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center mr-3" data-oid="vf119af"> {/* Keep bg-white/20 for contrast on gradient */}
              {scoreRank === 'Diamond' && '💎'}
              {scoreRank === 'Platinum' && '⚡'}
              {scoreRank === 'Gold' && '🏅'}
              {scoreRank === 'Silver' && '🥈'}
              {scoreRank === 'Bronze' && '🥉'}
            </div>
            <div data-oid="09wetq6">
              <Typography variant="h5" weight="bold" className="text-inherit" data-oid="pljnw.b">{scoreRank}</Typography> {/* Inherit color from parent */}
              <Typography variant="small" className="text-inherit opacity-90" data-oid="vzczdc8">Level {rankLevel}</Typography> {/* Inherit color */}
            </div>
          </div>

          {/* Progress bar to next rank */}
          <div className="mt-2" data-oid="ossy:l1">
            <div className="text-sm mb-1 flex justify-between text-inherit opacity-90" data-oid="t7dcm:w"> {/* Inherit color */}
              {/* Revert to span with direct classes as 'as' prop is not supported */}
              <span className="text-sm" data-oid="fx0-dca">Progress to next rank</span>
              <span className="text-sm" data-oid="wc_jzfk">{rankProgress}%</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden" data-oid="9qgu408"> {/* Keep bg-white/20 */}
              <div
                className="h-full bg-white/50 rounded-full" // Keep bg-white/50 for progress
                style={{ width: `${rankProgress}%` }} data-oid="_04zl0_">
              </div>
            </div>
          </div>
        </div>

        {/* Rank tiers */}
        <div className="mt-4 flex justify-between text-muted-foreground" data-oid="uvun0a4">
          <div className="text-center" data-oid="9vz._9r">
            <div className="h-4 w-4 bg-warning-600 rounded-full mx-auto mb-1" data-oid="z9zj466"></div> {/* Use warning palette */}
            <span className="text-xs text-muted-foreground" data-oid="_xvi1aa">Bronze</span> {/* Use span */}
          </div>
          <div className="text-center" data-oid="yjr6bw7">
            <div className="h-4 w-4 bg-slate-400 rounded-full mx-auto mb-1" data-oid=".p.iplc"></div> {/* Use slate */}
            <span className="text-xs text-muted-foreground" data-oid="gem-nu2">Silver</span> {/* Use span */}
          </div>
          <div className="text-center" data-oid="fwxeh6i">
            <div className="h-4 w-4 bg-warning-400 rounded-full mx-auto mb-1" data-oid="csk.1b:"></div> {/* Use warning palette */}
            <span className="text-xs text-muted-foreground" data-oid="h0mw.fu">Gold</span> {/* Use span */}
          </div>
          <div className="text-center" data-oid="-d_0jz4">
            <div className="h-4 w-4 bg-primary-400 rounded-full mx-auto mb-1" data-oid="8s0ppwj"></div> {/* Use primary palette */}
            <span className="text-xs text-muted-foreground" data-oid="knmaspe">Platinum</span> {/* Use span */}
          </div>
          <div className="text-center" data-oid=".fesiki">
            <div className="h-4 w-4 bg-accent-400 rounded-full mx-auto mb-1" data-oid="ysayk3c"></div> {/* Use accent palette */}
            <span className="text-xs text-muted-foreground" data-oid="yh43n_s">Diamond</span> {/* Use span */}
          </div>
        </div>
      </div>
    </div>);

}