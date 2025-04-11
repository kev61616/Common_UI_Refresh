'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { mockPracticeSets } from '@/lib/mockData';

export function PerformanceInsights() {
  // Animation function for metrics
  const animateMetric = useCallback((el: HTMLElement, value: string, suffix = '') => {
    if (!el) return;

    const duration = 1500;
    const frameDuration = 1000 / 60;
    const totalFrames = Math.round(duration / frameDuration);
    let frame = 0;
    const valueNum = parseFloat(value);

    const animate = () => {
      frame++;
      const progress = frame / totalFrames;
      const currentValue = Math.round(valueNum * progress * 10) / 10;

      if (el) {
        el.textContent = `${currentValue}${suffix}`;
      }

      if (frame < totalFrames) {
        requestAnimationFrame(animate);
      } else {
        if (el) {
          el.textContent = `${valueNum}${suffix}`;
        }
      }
    };

    animate();
  }, []);

  // Effect to animate metrics when component mounts
  useEffect(() => {
    const accuracyEl = document.getElementById('avg-accuracy-value');
    const speedEl = document.getElementById('avg-speed-value');

    if (accuracyEl) {
      animateMetric(accuracyEl, "85.5", '%');
    }

    if (speedEl) {
      animateMetric(speedEl, "76.2");
    }
  }, [animateMetric]);

  return (
    <div className="mb-6" data-oid="cgtpook">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700" data-oid="c3db0ol">
        <h3 className="text-xl font-bold mb-4 text-center" data-oid="4z7rksk">Performance Insights</h3>
        
        {/* Performance metrics summary */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8" data-oid="gpk-h-y">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/30 rounded-lg p-4 border border-blue-100 dark:border-blue-800/30 shadow-sm" data-oid="0l7zuv0">
            <div className="text-sm text-blue-600 dark:text-blue-300 font-medium mb-1" data-oid="d__iyy_">
              Average Accuracy
            </div>
            <div className="text-2xl font-bold text-blue-800 dark:text-blue-200" id="avg-accuracy-value" data-oid="yw8nogh">
              85.5%
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/30 rounded-lg p-4 border border-violet-100 dark:border-violet-800/30 shadow-sm" data-oid="zcppdkt">
            <div className="text-sm text-violet-600 dark:text-violet-300 font-medium mb-1" data-oid="u9zilkk">
              Average Speed
            </div>
            <div className="text-2xl font-bold text-violet-800 dark:text-violet-200" id="avg-speed-value" data-oid="0c94amh">
              76.2
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/30 rounded-lg p-4 border border-emerald-100 dark:border-emerald-800/30 shadow-sm" data-oid="439jtlc">
            <div className="text-sm text-emerald-600 dark:text-emerald-300 font-medium mb-1" data-oid="fl_db7o">
              Total Questions
            </div>
            <div className="text-2xl font-bold text-emerald-800 dark:text-emerald-200" data-oid="s30hekl">
              248
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/30 rounded-lg p-4 border border-amber-100 dark:border-amber-800/30 shadow-sm" data-oid="yodcewh">
            <div className="text-sm text-amber-600 dark:text-amber-300 font-medium mb-1" data-oid="zbmgf99">
              Study Streaks
            </div>
            <div className="text-2xl font-bold text-amber-800 dark:text-amber-200" data-oid=".za:8_h">
              14 days
            </div>
          </div>
        </div>
        
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 text-center" data-oid="n4znd6o">
          <p className="text-slate-500 dark:text-slate-400" data-oid="vp3ck4-">
            Detailed performance charts and visualizations go here
          </p>
        </div>
      </div>
    </div>);

}