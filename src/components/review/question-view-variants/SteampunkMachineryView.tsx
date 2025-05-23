'use client';

import { useState, useEffect, useRef } from 'react';
import { QuestionViewProps } from './types';

/** 
 * Types for Steampunk Machinery components
 */
type ComponentType = 'gear' | 'boiler' | 'gauge' | 'valve' | 'condenser' | 'piston';
type MaterialType = 'brass' | 'copper' | 'iron';

interface MaterialPalette {
  light: string;
  medium: string;
  dark: string;
  patina: string;
}

interface SteamEffect {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
}

interface MachineComponentStyle {
  componentType: ComponentType;
  size: number;
  rotationSpeed: string;
  material: MaterialType;
  palette: MaterialPalette;
  position: {
    x: number;
    y: number;
  };
}

/**
 * SteampunkMachineryView - Victorian-era mechanical aesthetic with gears, gauges, and brass accents
 * Organizes questions as interconnected machinery components
 */
export function SteampunkMachineryView({ practiceSets, onSelectSet, selectedSetId }: QuestionViewProps) {
  const [selectedSubject, setSelectedSubject] = useState<string | 'all'>('all');
  const [filterDifficulty, setFilterDifficulty] = useState<string | 'all'>('all');
  const [machineRunning, setMachineRunning] = useState(false);
  const [steamPressure, setSteamPressure] = useState(50);
  const [hoveredSet, setHoveredSet] = useState<string | null>(null);

  // For animation timers
  const animationTimerRef = useRef<NodeJS.Timeout | null>(null);
  const gearAnimationRef = useRef<number>(0);

  // Get unique subjects for filter
  const subjects = Array.from(new Set(practiceSets.map((set) => set.subject)));

  // Apply filters
  const filteredSets = practiceSets.filter((set) =>
  (selectedSubject === 'all' || set.subject === selectedSubject) && (
  filterDifficulty === 'all' || set.questions.some((q) => q.difficulty === filterDifficulty))
  );

  // Group sets by subject for machine sections
  const setsBySubject = filteredSets.reduce<Record<string, typeof practiceSets>>((acc, set) => {
    if (!acc[set.subject]) {
      acc[set.subject] = [];
    }
    acc[set.subject].push(set);
    return acc;
  }, {});

  // Start/stop steam machine animation
  useEffect(() => {
    if (machineRunning) {
      // Start animation timer
      animationTimerRef.current = setInterval(() => {
        gearAnimationRef.current += 1;
        // Fluctuate steam pressure slightly for effect
        setSteamPressure((prev) => {
          const newPressure = prev + (Math.random() > 0.5 ? 1 : -1) * Math.random() * 5;
          return Math.min(Math.max(newPressure, 30), 85); // Keep within bounds
        });
      }, 500);
    } else {
      // Clear animation timer
      if (animationTimerRef.current) {
        clearInterval(animationTimerRef.current);
        animationTimerRef.current = null;
      }
      // Reset steam pressure
      setSteamPressure(50);
    }

    // Cleanup timer on unmount
    return () => {
      if (animationTimerRef.current) {
        clearInterval(animationTimerRef.current);
      }
    };
  }, [machineRunning]);

  // Generate a machine component style based on set properties
  const getMachineComponentStyle = (
  set: (typeof practiceSets)[0],
  index: number,
  isSelected: boolean)
  : MachineComponentStyle => {
    // Determine component type based on difficulty
    let componentType: ComponentType = 'gear'; // default

    if (set.difficulty === 'Hard') {
      componentType = 'boiler';
    } else if (set.difficulty === 'Medium') {
      componentType = 'gauge';
    } else if (set.questions.length > 15) {
      componentType = 'condenser';
    } else if (set.questions.length < 5) {
      componentType = 'valve';
    } else if (index % 5 === 0) {
      componentType = 'piston';
    }

    // Set size based on question count
    const baseSize = 90;
    const sizeMultiplier = 1 + Math.min(set.questions.length, 20) / 20;
    const size = baseSize * sizeMultiplier;

    // Determine rotation speed based on accuracy
    // Higher accuracy = smoother movement
    let rotationSpeed = 'animate-spin-slow';
    if (set.accuracy > 80) {
      rotationSpeed = 'animate-spin-medium';
    } else if (set.accuracy < 50) {
      rotationSpeed = 'animate-spin-erratic';
    }

    // Material variation (brass, copper, iron) based on completion date
    // Newer sets have shinier components
    const completionDate = new Date(set.dateCompleted);
    const now = new Date();
    const daysSinceCompletion = Math.floor((now.getTime() - completionDate.getTime()) / (1000 * 60 * 60 * 24));

    let material: MaterialType = 'brass'; // default
    if (daysSinceCompletion > 60) {
      material = 'iron';
    } else if (daysSinceCompletion > 30) {
      material = 'copper';
    }

    // Material color mapping
    const materialColors: Record<MaterialType, MaterialPalette> = {
      brass: {
        light: '#d4a857',
        medium: '#b38728',
        dark: '#8e6f1f',
        patina: '#8e7f3f'
      },
      copper: {
        light: '#e6965d',
        medium: '#cf7f45',
        dark: '#a86436',
        patina: '#5d8a76'
      },
      iron: {
        light: '#9a9a9a',
        medium: '#737373',
        dark: '#595959',
        patina: '#354b52'
      }
    };

    // Get color palette for this material
    const palette = materialColors[material];

    // Determine position in the grid
    // This creates a somewhat structured but non-uniform layout
    // that still feels mechanical and intentional
    const grid = 12;
    const row = Math.floor(index / grid);
    const col = index % grid;
    const xOffset = row % 2 * 30 + index * 7 % 30;
    const yOffset = col % 2 * 15 + index * 5 % 20;

    return {
      componentType,
      size,
      rotationSpeed,
      material,
      palette,
      position: {
        x: col * 150 + xOffset,
        y: row * 130 + yOffset
      }
    };
  };

  // Get a gauge dial position based on a value and max
  const getGaugeDialPosition = (value: number, max: number = 100) => {
    // Convert to percentage, then to a -30 to 210 degree angle
    const percentage = value / max * 100;
    const angle = -30 + percentage * 240 / 100;
    return `rotate(${angle}deg)`;
  };

  // Add steam effect at random positions
  const renderSteamEffects = () => {
    if (!machineRunning) return null;

    // Generate random positions for steam vents
    const steamVents: SteamEffect[] = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      x: 100 + Math.random() * 700,
      y: 100 + Math.random() * 400,
      size: 20 + Math.random() * 40,
      delay: Math.random() * 10
    }));

    return (
      <>
        {steamVents.map((vent) =>
        <div
          key={`steam-${vent.id}`}
          className="absolute opacity-0 animate-steam pointer-events-none"
          style={{
            left: `${vent.x}px`,
            top: `${vent.y}px`,
            width: `${vent.size}px`,
            height: `${vent.size}px`,
            animationDelay: `${vent.delay}s`
          }} data-oid="2dyq6a8">

            <div className="absolute inset-0 bg-white/60 dark:bg-white/30 rounded-full blur-md" data-oid="x0w.l44"></div>
          </div>
        )}
      </>);

  };

  // Component renders for each machine part type
  const renderGearComponent = (
  set: (typeof practiceSets)[0],
  style: MachineComponentStyle,
  isSelected: boolean,
  isHovered: boolean) =>
  {
    // Only show rotation animation if machine is running
    const rotationClass = machineRunning ? style.rotationSpeed : '';

    return (
      <div
        className={`rounded-full ${rotationClass} relative gear-component`}
        style={{
          width: style.size,
          height: style.size,
          backgroundColor: style.palette.medium,
          borderColor: style.palette.dark,
          borderWidth: 4,
          boxShadow: isSelected ?
          `0 0 15px 5px ${style.palette.light}80` :
          'none'
        }} data-oid="vnr101:">

        {/* Gear teeth */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = i / 12 * 360;
          return (
            <div
              key={`tooth-${i}`}
              className="absolute -m-1 w-3 h-6 bg-gradient-to-t"
              style={{
                backgroundColor: style.palette.medium,
                borderColor: style.palette.dark,
                borderWidth: 1,
                transform: `rotate(${angle}deg) translateY(-50%)`,
                top: '50%',
                left: '50%'
              }} data-oid="_and9k5" />);


        })}
        
        {/* Gear center hole */}
        <div
          className="absolute inset-1/4 rounded-full bg-amber-950 dark:bg-slate-950 border-4"
          style={{ borderColor: style.palette.dark }} data-oid="9-1j60g">

          <div className="absolute inset-0 flex items-center justify-center" data-oid="4mi56hi">
            <span
              className="text-xs font-bold truncate max-w-full px-1 text-center"
              style={{ color: style.palette.light }} data-oid="cmbp_n0">

              {set.type}
            </span>
          </div>
        </div>
      </div>);

  };

  const renderBoilerComponent = (
  set: (typeof practiceSets)[0],
  style: MachineComponentStyle,
  isSelected: boolean,
  isHovered: boolean) =>
  {
    return (
      <div
        className="relative flex flex-col items-center"
        style={{
          width: style.size,
          height: style.size * 1.2
        }} data-oid="j5nwzid">

        {/* Boiler body */}
        <div
          className="w-full h-4/5 rounded-t-full rounded-b-lg relative"
          style={{
            backgroundColor: style.palette.medium,
            borderColor: style.palette.dark,
            borderWidth: 3,
            boxShadow: isSelected ?
            `0 0 15px 5px ${style.palette.light}80` :
            'none'
          }} data-oid="bq7trcl">

          {/* Pressure gauge */}
          <div
            className="absolute -top-4 -right-4 w-14 h-14 rounded-full flex items-center justify-center"
            style={{
              backgroundColor: style.palette.dark,
              borderColor: style.palette.patina,
              borderWidth: 2
            }} data-oid="wy1b0._">

            <div className="w-10 h-10 rounded-full bg-amber-50 dark:bg-slate-200 flex items-center justify-center" data-oid=":7dvi2z">
              <div
                className="w-[2px] h-4 bg-red-600 dark:bg-red-500 rounded-full origin-bottom"
                style={{ transform: getGaugeDialPosition(set.accuracy) }} data-oid="1jla_z0">

                <div className="w-1 h-1 rounded-full bg-red-600 dark:bg-red-500" data-oid="sj26z2v"></div>
              </div>
              <div className="w-2 h-2 rounded-full bg-amber-900 dark:bg-amber-800 absolute" data-oid="ifyn9a9"></div>
            </div>
          </div>
          
          {/* Steam pipe */}
          <div
            className="absolute -left-4 top-1/3 h-6 w-10 rounded-l-full"
            style={{
              backgroundColor: style.palette.dark,
              borderColor: style.palette.patina,
              borderWidth: 2
            }} data-oid="2mpm21g">

            {/* Pipe valve */}
            <div
              className="absolute -top-2 left-2 w-4 h-4 rounded-full"
              style={{
                backgroundColor: style.palette.medium,
                borderColor: style.palette.dark,
                borderWidth: 1
              }} data-oid="4yhq5s1">
            </div>
          </div>
          
          {/* Boiler window */}
          <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-1/2 h-1/3 rounded-lg border-4 overflow-hidden flex items-center justify-center"
          style={{
            borderColor: style.palette.dark
          }} data-oid="d8ba2qc">

            <div className="inset-0 bg-amber-950 dark:bg-slate-950 flex items-center justify-center" data-oid="oi60ujp">
              <span className="text-amber-300 dark:text-amber-400 text-xs font-bold" data-oid="j.s54_t">{set.accuracy}%</span>
            </div>
            {/* Fire effect at bottom */}
            <div className={`absolute bottom-0 inset-x-0 h-1/3 ${machineRunning ? 'animate-pulse' : ''}`}
            style={{
              background: `linear-gradient(to top, #f97316, #f97316aa, transparent)`
            }} data-oid="jj-cj6a">
            </div>
          </div>
        </div>
        
        {/* Boiler stand */}
        <div
          className="w-2/3 h-1/5 rounded-lg"
          style={{
            backgroundColor: style.palette.dark,
            borderColor: style.palette.patina,
            borderWidth: 1
          }} data-oid=":s_zqp.">

          <div className="text-center text-xs pt-[2px] font-bold" style={{ color: style.palette.light }} data-oid="xqec0zt">{set.type}</div>
        </div>
        
        {/* Steam effect if running */}
        {machineRunning &&
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-4 h-4 opacity-0 animate-steam" data-oid="fc1n:us">
            <div className="absolute inset-0 bg-white/60 dark:bg-white/40 rounded-full blur-md" data-oid="ulgsu02"></div>
          </div>
        }
      </div>);

  };

  const renderGaugeComponent = (
  set: (typeof practiceSets)[0],
  style: MachineComponentStyle,
  isSelected: boolean,
  isHovered: boolean) =>
  {
    return (
      <div
        className="relative flex items-center justify-center"
        style={{
          width: style.size,
          height: style.size
        }} data-oid="z4zqo5p">

        {/* Gauge body */}
        <div
          className="w-full h-full rounded-full border-8 relative flex items-center justify-center"
          style={{
            borderColor: style.palette.dark,
            backgroundColor: style.palette.medium,
            boxShadow: isSelected ?
            `0 0 15px 5px ${style.palette.light}80` :
            'none'
          }} data-oid="qh:qcuv">

          {/* Gauge face */}
          <div className="absolute inset-[15%] rounded-full bg-amber-50 dark:bg-slate-200 border-4"
          style={{ borderColor: style.palette.dark }} data-oid="xq16l7x">

            {/* Gauge markings */}
            <div className="absolute inset-0" data-oid="qg-bqj_">
              {Array.from({ length: 9 }).map((_, i) => {
                const angle = -30 + i * 30;
                return (
                  <div
                    key={`mark-${i}`}
                    className="absolute inset-0 flex items-start justify-center"
                    style={{ transform: `rotate(${angle}deg)` }} data-oid="oqq0hey">

                    <div className="h-2 w-1 bg-amber-900 dark:bg-amber-900 mt-1" data-oid="fad7nqp"></div>
                  </div>);

              })}
            </div>
            
            {/* Gauge needle */}
            <div
              className="absolute top-1/2 left-1/2 w-[2px] h-[45%] bg-red-600 dark:bg-red-600 rounded-full origin-bottom transform -translate-x-1/2 -translate-y-full transition-transform"
              style={{ transform: `translateX(-50%) translateY(0) ${getGaugeDialPosition(set.accuracy)}` }} data-oid="gc_dm7x">

              <div className="absolute -left-[2px] top-0 w-[6px] h-[6px] rounded-full bg-red-600 dark:bg-red-600" data-oid="0bf.ok8"></div>
            </div>
            
            {/* Center pin */}
            <div className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full bg-amber-800 dark:bg-amber-900 border border-amber-600 dark:border-amber-700 -translate-x-1/2 -translate-y-1/2" data-oid="mw10wm:"></div>
            
            {/* Gauge value */}
            <div className="absolute bottom-[20%] inset-x-0 text-center" data-oid="oepgusa">
              <span className="text-xs font-bold text-amber-900 dark:text-amber-900" data-oid="y7pgd_o">{set.accuracy}%</span>
            </div>
            
            {/* Gauge title */}
            <div className="absolute top-[25%] inset-x-0 text-center" data-oid="-2::ljx">
              <span className="text-[10px] font-medium text-amber-800 dark:text-amber-800" data-oid="3e:bak2">{set.type}</span>
            </div>
          </div>
        </div>
        
        {/* Gauge mounts */}
        <div className="absolute -top-1 -left-1 w-6 h-6 rounded-full"
        style={{
          backgroundColor: style.palette.dark,
          borderColor: style.palette.patina,
          borderWidth: 2
        }} data-oid="ayzathl">
        </div>
        <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full"
        style={{
          backgroundColor: style.palette.dark,
          borderColor: style.palette.patina,
          borderWidth: 2
        }} data-oid="2hoe508">
        </div>
        <div className="absolute -bottom-1 -left-1 w-6 h-6 rounded-full"
        style={{
          backgroundColor: style.palette.dark,
          borderColor: style.palette.patina,
          borderWidth: 2
        }} data-oid="z-jrzo1">
        </div>
        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full"
        style={{
          backgroundColor: style.palette.dark,
          borderColor: style.palette.patina,
          borderWidth: 2
        }} data-oid="e4m93_h">
        </div>
      </div>);

  };

  const renderValveComponent = (
  set: (typeof practiceSets)[0],
  style: MachineComponentStyle,
  isSelected: boolean,
  isHovered: boolean) =>
  {
    return (
      <div
        className="relative"
        style={{
          width: style.size * 0.8,
          height: style.size
        }} data-oid="wf_mlwl">

        {/* Valve body */}
        <div
          className="absolute top-1/4 inset-x-0 h-1/2 rounded-lg"
          style={{
            backgroundColor: style.palette.medium,
            borderColor: style.palette.dark,
            borderWidth: 2,
            boxShadow: isSelected ?
            `0 0 15px 5px ${style.palette.light}80` :
            'none'
          }} data-oid="5rx:s1w">

          {/* Valve label */}
          <div className="absolute inset-0 flex items-center justify-center" data-oid="gtlkl14">
            <div className="text-center" data-oid="h-6lctb">
              <span className="text-xs font-medium" style={{ color: style.palette.dark }} data-oid="idtj7od">{set.type}</span>
              <div className="text-[10px]" style={{ color: style.palette.patina }} data-oid="8qiehg8">{set.accuracy}%</div>
            </div>
          </div>
        </div>
        
        {/* Pipes */}
        <div
          className="absolute inset-x-1/3 top-0 h-1/4 w-1/3"
          style={{
            backgroundColor: style.palette.dark
          }} data-oid="_8ew90c">
        </div>
        <div
          className="absolute inset-x-1/3 bottom-0 h-1/4 w-1/3"
          style={{
            backgroundColor: style.palette.dark
          }} data-oid="nzlwc-r">
        </div>
        
        {/* Valve wheel */}
        <div
          className={`absolute top-1/2 -right-1/4 w-1/2 h-1/2 rounded-full -mt-1/4 flex items-center justify-center ${machineRunning ? 'animate-spin-slow' : ''}`}
          style={{
            backgroundColor: style.palette.dark,
            borderColor: style.palette.patina,
            borderWidth: 2
          }} data-oid="wgrwzgb">

          {/* Wheel spokes */}
          {Array.from({ length: 4 }).map((_, i) => {
            const angle = i / 4 * 360;
            return (
              <div
                key={`spoke-${i}`}
                className="absolute w-[90%] h-[4px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  backgroundColor: style.palette.light,
                  transform: `rotate(${angle}deg)`
                }} data-oid="dx49m_4">
              </div>);

          })}
          
          {/* Hub */}
          <div
            className="w-1/3 h-1/3 rounded-full"
            style={{
              backgroundColor: style.palette.medium,
              borderColor: style.palette.dark,
              borderWidth: 1
            }} data-oid="vldpcyy">
          </div>
        </div>
      </div>);

  };

  const renderCondenserComponent = (
  set: (typeof practiceSets)[0],
  style: MachineComponentStyle,
  isSelected: boolean,
  isHovered: boolean) =>
  {
    return (
      <div
        className="relative"
        style={{
          width: style.size,
          height: style.size * 0.7
        }} data-oid="altyyps">

        {/* Main body */}
        <div
          className="w-full h-full rounded-lg border-4 relative overflow-hidden"
          style={{
            borderColor: style.palette.dark,
            backgroundColor: style.palette.medium,
            boxShadow: isSelected ?
            `0 0 15px 5px ${style.palette.light}80` :
            'none'
          }} data-oid="2o.f55-">

          {/* Cooling fins */}
          {Array.from({ length: 8 }).map((_, i) =>
          <div
            key={`fin-${i}`}
            className="absolute h-[140%] w-[3px] top-[5%]"
            style={{
              backgroundColor: style.palette.dark,
              left: `${10 + i * 12}%`
            }} data-oid="epydxz0">
          </div>
          )}
          
          {/* Info panel */}
          <div className="absolute inset-x-0 bottom-0 h-[35%] bg-amber-950 dark:bg-slate-950 flex items-center justify-center" data-oid="642x2op">
            <div className="text-center" data-oid=":o2jxfq">
              <div className="text-xs font-medium" style={{ color: style.palette.light }} data-oid="9p2m:pa">{set.type}</div>
              <div className="text-[10px]" style={{ color: style.palette.patina }} data-oid="gd6ypug">{set.accuracy}%</div>
            </div>
          </div>
          
          {/* Top pipe connectors */}
          <div
            className="absolute -top-3 left-1/4 w-6 h-6 rounded-full"
            style={{
              backgroundColor: style.palette.dark,
              borderColor: style.palette.patina,
              borderWidth: 1
            }} data-oid="o0a.ghk">
          </div>
          <div
            className="absolute -top-3 right-1/4 w-6 h-6 rounded-full"
            style={{
              backgroundColor: style.palette.dark,
              borderColor: style.palette.patina,
              borderWidth: 1
            }} data-oid=".d08jz4">
          </div>
          
          {/* Bottom pipe connectors */}
          <div
            className="absolute -bottom-3 left-1/4 w-6 h-6 rounded-full"
            style={{
              backgroundColor: style.palette.dark,
              borderColor: style.palette.patina,
              borderWidth: 1
            }} data-oid="5k_ju2r">
          </div>
          <div
            className="absolute -bottom-3 right-1/4 w-6 h-6 rounded-full"
            style={{
              backgroundColor: style.palette.dark,
              borderColor: style.palette.patina,
              borderWidth: 1
            }} data-oid="0dq0bq3">
          </div>
        </div>
        
        {/* Pressure release valve */}
        <div
          className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8"
          style={{
            backgroundColor: style.palette.dark,
            borderColor: style.palette.patina,
            borderWidth: 1,
            borderRadius: '0.5rem 0.5rem 0 0'
          }} data-oid="rc4zyto">

          <div
            className="absolute top-1 inset-x-1 h-2 rounded-full"
            style={{ backgroundColor: style.palette.medium }} data-oid="f0e:dls">
          </div>
        </div>
        
        {/* Steam effect if running */}
        {machineRunning && set.accuracy > 70 &&
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-4 h-4 opacity-0 animate-steam" data-oid=":6z3q68">
            <div className="absolute inset-0 bg-white/60 dark:bg-white/40 rounded-full blur-md" data-oid="nqy.bfl"></div>
          </div>
        }
      </div>);

  };

  const renderPistonComponent = (
  set: (typeof practiceSets)[0],
  style: MachineComponentStyle,
  isSelected: boolean,
  isHovered: boolean) =>
  {
    // Calculate piston position based on animation frame or accuracy
    const pistonExtension = machineRunning ?
    (Math.sin(Date.now() / 500) + 1) / 2 // Oscillate between 0 and 1 when running
    : set.accuracy / 100; // Otherwise just use accuracy

    return (
      <div
        className="relative"
        style={{
          width: style.size,
          height: style.size * 0.5
        }} data-oid="akh_5jz">

        {/* Cylinder */}
        <div
          className="absolute inset-y-0 right-0 w-3/4 rounded-r-lg border-4"
          style={{
            borderColor: style.palette.dark,
            backgroundColor: style.palette.medium,
            boxShadow: isSelected ?
            `0 0 15px 5px ${style.palette.light}80` :
            'none'
          }} data-oid="lkn_s_9">

          {/* Cylinder ridges */}
          <div
            className="absolute left-[10%] top-0 bottom-0 w-[4px]"
            style={{ backgroundColor: style.palette.dark }} data-oid=".8ezkjv">
          </div>
          <div
            className="absolute left-[20%] top-0 bottom-0 w-[4px]"
            style={{ backgroundColor: style.palette.dark }} data-oid="rs4rik-">
          </div>
          <div
            className="absolute left-[80%] top-0 bottom-0 w-[4px]"
            style={{ backgroundColor: style.palette.dark }} data-oid="wrxuf_r">
          </div>
          
          {/* Type label */}
          <div className="absolute inset-0 flex items-center justify-center" data-oid="y510fhe">
            <span className="text-xs font-bold" style={{ color: style.palette.dark }} data-oid="860ro5-">
              {set.type}
            </span>
          </div>
        </div>
        
        {/* Piston arm - moves based on animation */}
        <div
          className="absolute inset-y-[25%] left-0"
          style={{
            width: `${30 + pistonExtension * 50}%`,
            backgroundColor: style.palette.dark,
            transition: machineRunning ? 'none' : 'width 0.5s ease-in-out'
          }} data-oid="dzxsvhq">

          {/* Piston head */}
          <div
            className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-[140%] rounded-l-md border"
            style={{
              backgroundColor: style.palette.patina,
              borderColor: style.palette.dark
            }} data-oid="khmsuhn">
          </div>
          
          {/* Accuracy display */}
          <div className="absolute -bottom-6 left-0 text-xs font-mono" style={{ color: style.palette.light }} data-oid="1_bh-j8">
            {set.accuracy}%
          </div>
        </div>
      </div>);

  };

  // Render the appropriate component based on type
  const renderMachineComponent = (
  set: (typeof practiceSets)[0],
  index: number,
  isSelected: boolean,
  isHovered: boolean) =>
  {
    const style = getMachineComponentStyle(set, index, isSelected);

    switch (style.componentType) {
      case 'gear':
        return renderGearComponent(set, style, isSelected, isHovered);
      case 'boiler':
        return renderBoilerComponent(set, style, isSelected, isHovered);
      case 'gauge':
        return renderGaugeComponent(set, style, isSelected, isHovered);
      case 'valve':
        return renderValveComponent(set, style, isSelected, isHovered);
      case 'condenser':
        return renderCondenserComponent(set, style, isSelected, isHovered);
      case 'piston':
        return renderPistonComponent(set, style, isSelected, isHovered);
      default:
        return renderGearComponent(set, style, isSelected, isHovered);
    }
  };

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm" data-oid="4os8k_:">
      <h3 className="text-xl font-bold mb-6 text-center" data-oid="a4pvh2z">27. Steampunk Machinery View</h3>
      
      {/* Control Panel */}
      <div className="bg-gradient-to-r from-amber-900 to-amber-800 dark:from-slate-800 dark:to-slate-900 rounded-lg p-4 shadow-lg border-2 border-amber-700 dark:border-amber-900 mb-6 relative overflow-hidden" data-oid="8wlfj8u">
        {/* Metal texture overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJub2lzZSIgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNyIgbnVtT2N0YXZlcz0iNCIgc3RpdGNoVGlsZXM9InN0aXRjaCI+PC9mZVR1cmJ1bGVuY2U+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNub2lzZSkiIG9wYWNpdHk9IjAuNCIvPjwvc3ZnPg==')]" style={{ backgroundSize: 'cover' }} data-oid="_z9j424"></div>
        
        {/* Rivets on the panel edges */}
        <div className="absolute top-2 left-2 w-4 h-4 rounded-full bg-amber-600 dark:bg-amber-800 border-2 border-amber-500/50 dark:border-amber-700/50" data-oid="391ya-w"></div>
        <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-amber-600 dark:bg-amber-800 border-2 border-amber-500/50 dark:border-amber-700/50" data-oid=":e862u3"></div>
        <div className="absolute bottom-2 left-2 w-4 h-4 rounded-full bg-amber-600 dark:bg-amber-800 border-2 border-amber-500/50 dark:border-amber-700/50" data-oid="re.f8zr"></div>
        <div className="absolute bottom-2 right-2 w-4 h-4 rounded-full bg-amber-600 dark:bg-amber-800 border-2 border-amber-500/50 dark:border-amber-700/50" data-oid="a2p87dz"></div>
        
        <div className="relative z-10 flex flex-wrap gap-3 sm:gap-6 justify-center items-end" data-oid="d4fxc4g">
          {/* Subject Selector */}
          <div className="flex flex-col items-center" data-oid="hld56fi">
            <label className="uppercase text-xs text-amber-300 dark:text-amber-400 mb-1 font-bold tracking-wider" data-oid="5k0lv..">Subject Valve</label>
            <div className="bg-amber-950 dark:bg-slate-950 rounded-md p-2 border border-amber-700 dark:border-amber-900 shadow-inner" data-oid="pk9nq2v">
              <select
                className="bg-amber-100 dark:bg-slate-700 text-amber-950 dark:text-amber-200 rounded-sm px-2 py-1 text-sm border-2 border-amber-800 dark:border-amber-900"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)} data-oid="bh-7vl.">

                <option value="all" data-oid="bo87gb_">All Chambers</option>
                {subjects.map((subject) =>
                <option key={subject} value={subject} data-oid=".rixjdd">{subject}</option>
                )}
              </select>
            </div>
          </div>
          
          {/* Difficulty Filter */}
          <div className="flex flex-col items-center" data-oid="89235pf">
            <label className="uppercase text-xs text-amber-300 dark:text-amber-400 mb-1 font-bold tracking-wider" data-oid="kpv4jq0">Complexity Gear</label>
            <div className="bg-amber-950 dark:bg-slate-950 rounded-md p-2 border border-amber-700 dark:border-amber-900 shadow-inner" data-oid="qk:yuef">
              <select
                className="bg-amber-100 dark:bg-slate-700 text-amber-950 dark:text-amber-200 rounded-sm px-2 py-1 text-sm border-2 border-amber-800 dark:border-amber-900"
                value={filterDifficulty}
                onChange={(e) => setFilterDifficulty(e.target.value)} data-oid="02eqv-.">

                <option value="all" data-oid="lryofh7">All Configurations</option>
                <option value="Easy" data-oid="6wvlygk">Simple</option>
                <option value="Medium" data-oid="lk3pqiy">Complex</option>
                <option value="Hard" data-oid="dy0iboq">Advanced</option>
              </select>
            </div>
          </div>
          
          {/* Steam Pressure Gauge */}
          <div className="flex flex-col items-center" data-oid="9kl.bhb">
            <label className="uppercase text-xs text-amber-300 dark:text-amber-400 mb-1 font-bold tracking-wider" data-oid="qe_:s7_">Steam Pressure</label>
            <div className="bg-amber-950 dark:bg-slate-950 rounded-full w-24 h-24 border-4 border-amber-700 dark:border-amber-900 shadow-inner relative flex items-center justify-center" data-oid="kcvh7in">
              <div className="absolute inset-2 rounded-full bg-amber-100 dark:bg-slate-200 flex items-center justify-center" data-oid="uzs83ez">
                {/* Gauge markings */}
                <div className="absolute inset-0" data-oid="863hgim">
                  {Array.from({ length: 9 }).map((_, i) => {
                    const angle = -30 + i * 30;
                    return (
                      <div
                        key={`mark-${i}`}
                        className="absolute inset-0 flex items-start justify-center"
                        style={{ transform: `rotate(${angle}deg)` }} data-oid="04hb09z">

                        <div className="h-2 w-1 bg-amber-900 dark:bg-amber-900 mt-1" data-oid="2je6edu"></div>
                      </div>);

                  })}
                </div>
                
                {/* Gauge labels */}
                <div className="absolute top-4 left-4 text-[8px] font-bold text-amber-900 dark:text-amber-900" data-oid="r5-2lza">0</div>
                <div className="absolute top-4 right-4 text-[8px] font-bold text-amber-900 dark:text-amber-900" data-oid="c5v6zyd">100</div>
                <div className="absolute bottom-3 inset-x-0 text-[8px] font-bold text-amber-900 dark:text-amber-900 text-center" data-oid="h4u:jov">50</div>
                
                {/* Gauge needle */}
                <div
                  className="w-[2px] h-[38px] bg-red-600 dark:bg-red-600 rounded-full origin-bottom transition-transform duration-700"
                  style={{ transform: getGaugeDialPosition(steamPressure) }} data-oid="qrlhhh5">

                  <div className="w-2 h-2 rounded-full bg-red-600 dark:bg-red-600 -ml-[3px]" data-oid="qhlbe2m"></div>
                </div>
                
                {/* Center pin */}
                <div className="w-3 h-3 rounded-full bg-amber-800 dark:bg-amber-900 border border-amber-600 dark:border-amber-700 absolute" data-oid="dx8uhez"></div>
              </div>
            </div>
          </div>
          
          {/* Start/Stop Lever */}
          <div className="flex flex-col items-center" data-oid="8i6uj-.">
            <label className="uppercase text-xs text-amber-300 dark:text-amber-400 mb-1 font-bold tracking-wider" data-oid="6hvyva9">
              {machineRunning ? 'Running' : 'Stopped'}
            </label>
            <div
              className={`relative w-16 h-24 cursor-pointer ${
              machineRunning ? 'bg-amber-950 dark:bg-slate-900' : 'bg-amber-800 dark:bg-slate-800'} rounded-t-lg border-2 border-amber-700 dark:border-amber-900 flex items-center justify-center`
              }
              onClick={() => setMachineRunning(!machineRunning)} data-oid="t4vklh9">

              {/* Lever track */}
              <div className="absolute inset-x-4 inset-y-2 bg-amber-950 dark:bg-slate-950 rounded-full" data-oid="cn5b02x"></div>
              
              {/* Lever handle */}
              <div
                className={`absolute w-8 h-12 bg-red-600 dark:bg-red-700 rounded-lg border-2 border-red-400 dark:border-red-500 transition-all duration-500 shadow-lg ${
                machineRunning ? 'top-2' : 'top-10'}`
                } data-oid="-u_l2te">

                <div className="absolute inset-x-0 top-1/4 bottom-0 bg-gradient-to-b from-red-500/0 to-red-900/50 dark:from-red-700/0 dark:to-red-950/50 rounded-b-lg" data-oid="xs::w0i"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats bar at bottom */}
        <div className="mt-4 pt-3 border-t border-amber-700/50 dark:border-amber-800/30 flex justify-between items-center text-xs text-amber-300 dark:text-amber-400" data-oid="1pwji6j">
          <span data-oid="5yd7vus">COMPONENTS: {filteredSets.length}</span>
          <span data-oid="mup45m2">QUESTIONS: {filteredSets.reduce((sum, set) => sum + set.questions.length, 0)}</span>
          <span data-oid="4vy3e1r">AVERAGE ACCURACY: {Math.round(filteredSets.length ? filteredSets.reduce((sum, set) => sum + set.accuracy, 0) / filteredSets.length : 0)}%</span>
        </div>
      </div>
      
      {/* Machinery Chamber Display */}
      <div className="relative bg-gradient-to-b from-amber-900/90 to-amber-950/90 dark:from-slate-900 dark:to-slate-950 rounded-lg border-2 border-amber-800 dark:border-amber-950 shadow-inner min-h-[600px] p-6 mb-4 overflow-hidden" data-oid="pnd-29x">
        {/* Metal panel background texture */}
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0iIzMzMyIgZmlsbC1vcGFjaXR5PSIwLjMiPjwvcmVjdD4KPGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iMiIgZmlsbD0iIzU1NSIgZmlsbC1vcGFjaXR5PSIwLjQiPjwvY2lyY2xlPgo8L3N2Zz4=')]" style={{ backgroundSize: '20px 20px' }} data-oid="eg7s0s9"></div>
        
        {/* Pipes connecting sections */}
        {Object.keys(setsBySubject).length > 1 &&
        <div className="absolute inset-0 pointer-events-none" data-oid="3abpsrm">
            {/* Horizontal main pipe */}
            <div className="absolute top-1/2 left-0 right-0 h-6 bg-amber-800 dark:bg-amber-950 border-2 border-amber-700 dark:border-amber-900" data-oid="62kec:m">
              {/* Pipe rivets */}
              {Array.from({ length: 20 }).map((_, i) =>
            <div
              key={`rivet-${i}`}
              className="absolute w-2 h-3 bg-amber-600 dark:bg-amber-800 rounded-sm"
              style={{ left: `${i * 5}%`, top: '-8px' }} data-oid="akxenlg">
            </div>
            )}
              {Array.from({ length: 20 }).map((_, i) =>
            <div
              key={`rivet-bottom-${i}`}
              className="absolute w-2 h-3 bg-amber-600 dark:bg-amber-800 rounded-sm"
              style={{ left: `${i * 5 + 2.5}%`, bottom: '-8px' }} data-oid="ji86lmc">
            </div>
            )}
            </div>
            
            {/* Vertical connector pipes */}
            {Object.keys(setsBySubject).map((subject, i) =>
          <div
            key={`pipe-${subject}`}
            className="absolute w-4 bg-amber-800 dark:bg-amber-950 border-2 border-amber-700 dark:border-amber-900"
            style={{
              left: `${10 + i * 20}%`,
              top: '0',
              bottom: '0'
            }} data-oid="b0hlkqu">

                {/* Pipe joints */}
                <div className="absolute top-1/2 -mt-3 h-6 w-6 left-1/2 -ml-3 rounded-full bg-amber-700 dark:bg-amber-900 border-2 border-amber-600 dark:border-amber-800" data-oid="-e9vl4b"></div>
                
                {/* Steam valves */}
                <div className="absolute top-[30%] -ml-6 w-16 h-6" data-oid="6j6nqx_">
                  <div className="absolute inset-0 bg-amber-700 dark:bg-amber-900 rounded-md border-2 border-amber-600 dark:border-amber-800 flex items-center justify-center" data-oid="dto9ijd">
                    <div className="w-10 h-2 bg-amber-600 dark:bg-amber-800 rounded-full" data-oid="9y.-rlh"></div>
                  </div>
                  <div className="absolute left-1/2 -ml-3 -mt-3 w-6 h-6 rounded-full bg-red-600 dark:bg-red-800 border-2 border-red-500 dark:border-red-700" data-oid="eb_53hn"></div>
                </div>
              </div>
          )}
          </div>
        }
        
        {/* Steam effects if machine is running */}
        {renderSteamEffects()}
        
        {/* Machine Components for each section */}
        <div className="relative" data-oid="s84yo2l">
          {Object.entries(setsBySubject).length > 0 ?
          Object.entries(setsBySubject).map(([subject, sets], sectionIndex) =>
          <div key={subject} className="mb-12" data-oid="srhzjua">
                {/* Section Header */}
                <div className="mb-6 flex items-center" data-oid="5jfy0x5">
                  <div className="mr-3 w-10 h-10 text-amber-500 dark:text-amber-600" data-oid="1.18xlf">
                    <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none" stroke="currentColor" data-oid="c3nf:47">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" data-oid="d1jr1au" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-oid="4:yo5o7" />
                    </svg>
                  </div>
                  <div data-oid="baylr-3">
                    <h3 className="text-lg font-bold text-amber-300 dark:text-amber-400 uppercase tracking-wide" data-oid="7l..2k4">{subject} Chamber</h3>
                    <div className="text-xs text-amber-400/80 dark:text-amber-500/80" data-oid="udqvv_0">{sets.length} components &bull; {sets.reduce((sum, set) => sum + set.questions.length, 0)} questions</div>
                  </div>
                </div>
                
                {/* Components for this section */}
                <div className="relative flex flex-wrap gap-6 pl-8" data-oid=".c0txgz">
                  {sets.map((set, index) =>
              <div
                key={set.id}
                className="mb-8 cursor-pointer transition-transform duration-300 hover:scale-105"
                onMouseEnter={() => setHoveredSet(set.id)}
                onMouseLeave={() => setHoveredSet(null)}
                onClick={() => onSelectSet && onSelectSet(set.id)} data-oid="0d2i40u">

                      {renderMachineComponent(set, index, set.id === selectedSetId, set.id === hoveredSet)}
                      
                      {/* Item highlight glow */}
                      {set.id === selectedSetId &&
                <div className="absolute inset-0 -m-2 rounded-xl bg-amber-500/20 dark:bg-amber-600/20 animate-pulse pointer-events-none" data-oid=":4y.5yf"></div>
                }
                    </div>
              )}
                </div>
              </div>
          ) :

          <div className="h-96 flex items-center justify-center" data-oid="-zgy9je">
              <div className="text-center" data-oid="afb7x.o">
                <div className="text-2xl font-serif text-amber-400 dark:text-amber-500 mb-4" data-oid="hrhnx-t">No Machinery Components</div>
                <p className="text-amber-300 dark:text-amber-400 mb-6 italic" data-oid="yq8r5yy">Adjust your settings to view machine components</p>
                <div
                className="w-20 h-20 mx-auto rounded-full bg-amber-700 dark:bg-amber-800 flex items-center justify-center cursor-pointer"
                onClick={() => setFilterDifficulty('all')} data-oid="xodt-a7">

                  <div className="w-14 h-14 rounded-full bg-amber-600 dark:bg-amber-700 flex items-center justify-center" data-oid="57hgvpq">
                    <svg className="w-8 h-8 text-amber-200 dark:text-amber-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" data-oid="bijzm.t">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" data-oid="s5dyiy8" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
      
      {/* Description */}
      <div className="mt-4 bg-white dark:bg-slate-800 border border-amber-100 dark:border-slate-700 rounded-lg p-3 text-sm" data-oid="whsje7o">
        <p className="font-serif text-amber-900 dark:text-amber-400" data-oid="188jyzf">
          This view presents your question sets as steampunk machinery components, with gears, valves, boilers, and gauges all interconnected
          in a Victorian-era industrial aesthetic. Each component's material, type, and behavior represents different aspects of your practice sets.
          Start the machine to see dynamic animations!
        </p>
      </div>
    </div>);

}