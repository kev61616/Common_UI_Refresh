'use client'

import React, { useState, useEffect, useRef } from 'react'
import { SetViewProps } from './types'

export const ParticleFlowView: React.FC<SetViewProps> = ({ 
  sets, 
  selectedSetId, 
  onSelectSet, 
  isLoading = false 
}) => {
  const [mounted, setMounted] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)
  const particlesRef = useRef<Particle[]>([])
  
  // Particle class for animation
  class Particle {
    x: number
    y: number
    size: number
    speedX: number
    speedY: number
    color: string
    setId: string
    accuracy: number
    
    constructor(
      x: number, 
      y: number, 
      size: number, 
      speedX: number, 
      speedY: number, 
      color: string,
      setId: string,
      accuracy: number
    ) {
      this.x = x
      this.y = y
      this.size = size
      this.speedX = speedX
      this.speedY = speedY
      this.color = color
      this.setId = setId
      this.accuracy = accuracy
    }
    
    update(canvas: HTMLCanvasElement) {
      this.x += this.speedX
      this.y += this.speedY
      
      // Bounce off walls
      if (this.x <= 0 || this.x >= canvas.width) {
        this.speedX = -this.speedX
      }
      
      if (this.y <= 0 || this.y >= canvas.height) {
        this.speedY = -this.speedY
      }
    }
    
    draw(ctx: CanvasRenderingContext2D, isSelected: boolean) {
      ctx.beginPath()
      const gradient = ctx.createRadialGradient(
        this.x, this.y, 0,
        this.x, this.y, this.size
      )
      
      // Base color with opacity
      gradient.addColorStop(0, this.color)
      gradient.addColorStop(1, `${this.color}00`)
      
      ctx.fillStyle = gradient
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.fill()
      
      // Draw highlight for selected particle
      if (isSelected) {
        ctx.strokeStyle = '#ffffff'
        ctx.lineWidth = 2
        ctx.stroke()
        
        // Draw connection lines to other particles with same subject
        particlesRef.current.forEach(p => {
          if (p.color === this.color && p !== this) {
            ctx.beginPath()
            ctx.strokeStyle = `${this.color}80` // Semi-transparent connection
            ctx.lineWidth = 1
            ctx.moveTo(this.x, this.y)
            ctx.lineTo(p.x, p.y)
            ctx.stroke()
          }
        })
      }
    }
  }
  
  // Initialize particles when mounted
  useEffect(() => {
    setMounted(true)
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])
  
  // Create particles from sets
  useEffect(() => {
    if (!mounted || isLoading || !sets.length || !canvasRef.current) return
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Initialize particles
    const newParticles: Particle[] = []
    const canvasWidth = canvas.width
    const canvasHeight = canvas.height
    
    // Group sets by subject to assign similar colors
    const subjectGroups = sets.reduce((acc, set) => {
      const subject = set.subject || 'Other'
      if (!acc[subject]) {
        acc[subject] = []
      }
      acc[subject].push(set)
      return acc
    }, {} as Record<string, typeof sets>)
    
    // Color palettes for different subjects
    const colorsBySubject: Record<string, string[]> = {
      'Math': ['#3b82f6', '#2563eb', '#1d4ed8', '#1e40af'],
      'Reading': ['#10b981', '#059669', '#047857', '#065f46'],
      'Writing': ['#f59e0b', '#d97706', '#b45309', '#92400e'],
      'Other': ['#8b5cf6', '#7c3aed', '#6d28d9', '#5b21b6']
    }
    
    // Create particles for each set
    Object.entries(subjectGroups).forEach(([subject, subjectSets]) => {
      const colors = colorsBySubject[subject] || colorsBySubject['Other']
      
      subjectSets.forEach(set => {
        // Size based on number of questions
        const size = 5 + (set.questions.length / 5)
        
        // Random position in canvas
        const x = Math.random() * (canvasWidth - size * 2) + size
        const y = Math.random() * (canvasHeight - size * 2) + size
        
        // Speed based on pace or recency
        const speedFactor = 0.5
        const speedX = (Math.random() - 0.5) * speedFactor
        const speedY = (Math.random() - 0.5) * speedFactor
        
        // Select color from subject palette
        const colorIndex = Math.floor(Math.random() * colors.length)
        const color = colors[colorIndex]
        
        newParticles.push(
          new Particle(x, y, size, speedX, speedY, color, set.id, set.accuracy || 50)
        )
      })
    })
    
    particlesRef.current = newParticles
    startAnimation()
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [mounted, isLoading, sets])
  
  // Handle canvas click
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    // Find clicked particle
    const clickedParticle = particlesRef.current.find(particle => {
      const dx = particle.x - x
      const dy = particle.y - y
      const distance = Math.sqrt(dx * dx + dy * dy)
      return distance <= particle.size
    })
    
    if (clickedParticle) {
      onSelectSet(clickedParticle.setId)
    }
  }
  
  // Animation function
  const animate = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // Draw and update particles
    particlesRef.current.forEach(particle => {
      particle.update(canvas)
      particle.draw(ctx, particle.setId === selectedSetId)
    })
    
    // Continue animation
    animationRef.current = requestAnimationFrame(animate)
  }
  
  // Start animation
  const startAnimation = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
    
    animationRef.current = requestAnimationFrame(animate)
  }
  
  // Resize handler
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current
      if (!canvas) return
      
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    
    window.addEventListener('resize', handleResize)
    handleResize()
    
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [mounted])
  
  if (!mounted || isLoading) {
    return (
      <div className="min-h-[500px] flex items-center justify-center">
        <div className="w-8 h-8 border-t-2 border-primary rounded-full animate-spin"></div>
      </div>
    )
  }
  
  if (!sets || sets.length === 0) {
    return (
      <div className="min-h-[500px] flex items-center justify-center bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg">
        <p className="text-slate-500 dark:text-slate-400">No practice sets available to visualize</p>
      </div>
    )
  }
  
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
      <h3 className="text-xl font-bold mb-4 text-center">Particle Flow Visualization</h3>
      
      <div className="bg-slate-900 rounded-lg overflow-hidden shadow-inner">
        <canvas 
          ref={canvasRef} 
          className="w-full h-[500px]"
          onClick={handleCanvasClick}
        />
      </div>
      
      <div className="mt-4 flex flex-wrap justify-center gap-4">
        {Object.entries({
          'Math': '#3b82f6',
          'Reading': '#10b981',
          'Writing': '#f59e0b',
          'Other': '#8b5cf6'
        }).map(([subject, color]) => (
          <div key={subject} className="flex items-center">
            <div 
              className="w-3 h-3 rounded-full mr-1.5" 
              style={{ backgroundColor: color }}
            />
            <span className="text-xs text-slate-600 dark:text-slate-400">{subject}</span>
          </div>
        ))}
      </div>
    </div>
  )
}