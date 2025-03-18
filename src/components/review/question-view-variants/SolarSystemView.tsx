'use client'

import { useState, useEffect, useRef } from 'react'
import { QuestionViewProps } from './types'

/**
 * SolarSystemView - Questions visualized as planets orbiting subjects as suns
 * Interactive space-themed visualization with rotating planets based on performance
 */
export function SolarSystemView({ practiceSets, onSelectSet, selectedSetId }: QuestionViewProps) {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  
  // Metrics map to store calculations for each set
  const metricsMap = useRef(new Map<string, {
    correctCount: number;
    totalQuestions: number;
    avgDifficulty: number;
  }>()).current;
  
  // Extract all unique subjects
  const subjects = Array.from(new Set(practiceSets.map(set => set.subject)))
  
  // Group questions by subject
  const questionsBySubject = practiceSets.reduce((acc, set) => {
    if (!acc[set.subject]) {
      acc[set.subject] = [];
    }
    
    // Calculate metrics for this set
    const correctCount = set.questions.filter(q => q.correct).length;
    const avgDifficultyValue = set.questions.reduce((sum, q) => {
      const difficultyValue = q.difficulty === 'Easy' ? 1 : q.difficulty === 'Medium' ? 2 : 3;
      return sum + difficultyValue;
    }, 0) / set.questions.length;
    
    // Store the set with its metrics in a separate variable
    acc[set.subject].push(set);
    
    // Store metrics in a separate Map for reference
    metricsMap.set(set.id, {
      correctCount,
      totalQuestions: set.questions.length,
      avgDifficulty: avgDifficultyValue
    });
    
    return acc;
  }, {} as Record<string, typeof practiceSets>);
  
  // Get color for a planet based on accuracy
  const getPlanetColor = (accuracy: number) => {
    if (accuracy >= 80) return '#10b981'; // emerald
    if (accuracy >= 60) return '#22c55e'; // green
    if (accuracy >= 40) return '#eab308'; // yellow
    if (accuracy >= 20) return '#f97316'; // orange
    return '#ef4444'; // red
  };
  
  // Calculate planet size based on question count
  const getPlanetSize = (questionCount: number) => {
    return Math.max(5, Math.min(15, questionCount / 2));
  };
  
  // Calculate orbit speed based on avgDifficulty (harder questions orbit slower)
  const getOrbitSpeed = (avgDifficulty: number) => {
    return 0.001 / avgDifficulty;
  };
  
  // Calculate orbit radius based on accuracy (higher accuracy = closer to sun)
  const getOrbitRadius = (accuracy: number, index: number) => {
    const baseRadius = 50 + index * 30;
    const accuracyAdjustment = (100 - accuracy) / 5;
    return baseRadius + accuracyAdjustment;
  };
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Create solar system
    const solarSystems: {
      subject: string;
      sunX: number;
      sunY: number;
      sunSize: number;
      sunColor: string;
      planets: {
        id: string;
        radius: number;
        speed: number;
        size: number;
        color: string;
        angle: number;
        selected: boolean;
      }[];
    }[] = [];
    
    // Calculate positions for each solar system
    const padding = 100;
    const width = canvas.width - padding * 2;
    const height = canvas.height - padding * 2;
    const subjectCount = subjects.length;
    
    // Arrange solar systems in a grid
    const cols = Math.ceil(Math.sqrt(subjectCount));
    const rows = Math.ceil(subjectCount / cols);
    
    const cellWidth = width / cols;
    const cellHeight = height / rows;
    
    subjects.forEach((subject, index) => {
      const row = Math.floor(index / cols);
      const col = index % cols;
      
      const sunX = padding + col * cellWidth + cellWidth / 2;
      const sunY = padding + row * cellHeight + cellHeight / 2;
      
      const sunSize = 20;
      // Generate a repeatable color based on subject name
      const hash = subject.split('').reduce((h, c) => ((h << 5) - h) + c.charCodeAt(0), 0);
      const hue = Math.abs(hash % 360);
      const sunColor = `hsl(${hue}, 70%, 50%)`;
      
      const planets = questionsBySubject[subject]?.map((set, planetIndex) => {
        const metrics = metricsMap.get(set.id);
        return {
          id: set.id,
          radius: getOrbitRadius(set.accuracy, planetIndex),
          speed: getOrbitSpeed(metrics?.avgDifficulty || 2),
          size: getPlanetSize(metrics?.totalQuestions || 10),
          color: getPlanetColor(set.accuracy),
          angle: Math.random() * Math.PI * 2, // Random starting position
          selected: set.id === selectedSetId
        };
      }) || [];
      
      solarSystems.push({
        subject,
        sunX,
        sunY,
        sunSize,
        sunColor,
        planets
      });
    });
    
    // Animation loop
    let lastTimestamp = 0;
    const animate = (timestamp: number) => {
      // Calculate delta time for smooth animation across different frame rates
      const deltaTime = timestamp - lastTimestamp;
      lastTimestamp = timestamp;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw background
      ctx.fillStyle = '#0f172a'; // slate-900
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw stars
      ctx.fillStyle = 'white';
      for (let i = 0; i < 200; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 1.5;
        ctx.globalAlpha = Math.random() * 0.8 + 0.2;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      
      // Highlight selected subject
      if (selectedSubject) {
        const system = solarSystems.find(sys => sys.subject === selectedSubject);
        if (system) {
          ctx.fillStyle = 'rgba(59, 130, 246, 0.1)'; // blue-500 with opacity
          ctx.beginPath();
          ctx.arc(system.sunX, system.sunY, 120, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      
      // Draw each solar system
      solarSystems.forEach(system => {
        // Draw orbits
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.1)'; // slate-400 with opacity
        system.planets.forEach(planet => {
          ctx.beginPath();
          ctx.arc(system.sunX, system.sunY, planet.radius, 0, Math.PI * 2);
          ctx.stroke();
        });
        
        // Draw sun
        const gradient = ctx.createRadialGradient(
          system.sunX, system.sunY, 0,
          system.sunX, system.sunY, system.sunSize
        );
        gradient.addColorStop(0, system.sunColor);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0.3)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(system.sunX, system.sunY, system.sunSize, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw sun glow
        ctx.beginPath();
        const glowGradient = ctx.createRadialGradient(
          system.sunX, system.sunY, system.sunSize,
          system.sunX, system.sunY, system.sunSize * 2
        );
        glowGradient.addColorStop(0, `${system.sunColor}80`); // 50% opacity
        glowGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = glowGradient;
        ctx.arc(system.sunX, system.sunY, system.sunSize * 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw subject name
        ctx.fillStyle = 'white';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(system.subject, system.sunX, system.sunY + system.sunSize + 20);
        
        // Update planet positions and draw planets
        system.planets.forEach(planet => {
          // Update position
          planet.angle += planet.speed * deltaTime;
          
          // Calculate position
          const x = system.sunX + Math.cos(planet.angle) * planet.radius;
          const y = system.sunY + Math.sin(planet.angle) * planet.radius;
          
          // Draw planet
          ctx.fillStyle = planet.color;
          
          // Draw selection ring if selected
          if (planet.selected) {
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(x, y, planet.size + 3, 0, Math.PI * 2);
            ctx.stroke();
          }
          
          // Draw planet
          ctx.beginPath();
          ctx.arc(x, y, planet.size, 0, Math.PI * 2);
          ctx.fill();
        });
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    // Add mouse interaction
    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      // Check if clicked on a planet
      for (const system of solarSystems) {
        for (const planet of system.planets) {
          // Calculate planet position
          const x = system.sunX + Math.cos(planet.angle) * planet.radius;
          const y = system.sunY + Math.sin(planet.angle) * planet.radius;
          
          // Check if click is within planet
          const distance = Math.sqrt((mouseX - x) ** 2 + (mouseY - y) ** 2);
          if (distance <= planet.size) {
            onSelectSet(planet.id);
            return;
          }
        }
        
        // Check if clicked on a sun
        const sunDistance = Math.sqrt((mouseX - system.sunX) ** 2 + (mouseY - system.sunY) ** 2);
        if (sunDistance <= system.sunSize) {
          setSelectedSubject(system.subject === selectedSubject ? null : system.subject);
          return;
        }
      }
    };
    
    canvas.addEventListener('click', handleClick);
    
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('click', handleClick);
    };
  }, [practiceSets, selectedSetId, selectedSubject, subjects, onSelectSet, metricsMap]);
  
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
      <h3 className="text-xl font-bold mb-6 text-center">23. Solar System View</h3>
      
      <div className="bg-slate-800 dark:bg-slate-900 rounded-lg overflow-hidden mb-4 relative">
        <canvas 
          ref={canvasRef} 
          className="w-full"
          style={{ height: '500px' }}
        ></canvas>
        
        <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-sm p-3 rounded-lg text-white text-xs">
          <h4 className="font-medium mb-2">Legend</h4>
          <div className="grid gap-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500"></div>
              <span>Sun = Subject</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-emerald-500"></div>
              <span>Green Planet = High Accuracy</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
              <span>Yellow Planet = Medium Accuracy</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-red-500"></div>
              <span>Red Planet = Low Accuracy</span>
            </div>
          </div>
          <div className="mt-2 text-xs opacity-70">
            Click on a sun to focus on a subject
          </div>
          <div className="text-xs opacity-70">
            Click on a planet to view details
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-slate-800 p-3 rounded-md text-sm">
        <p className="text-slate-600 dark:text-slate-300">
          Each solar system represents a subject, with planets representing practice sets. 
          Planet size indicates question count, orbit speed shows difficulty, and distance 
          from the sun represents accuracy.
        </p>
      </div>
    </div>
  )
}
