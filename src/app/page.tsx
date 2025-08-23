'use client'

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [typedText, setTypedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [particles, setParticles] = useState<Array<{
    id: number;
    left: string;
    top: string;
    animationDelay: string;
    animationDuration: string;
  }>>([]);
  const fullText = "jackbraun.ai";

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 150);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText]);

  useEffect(() => {
    // Generate particles only on client side to avoid hydration mismatch
    const generatedParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 3}s`,
      animationDuration: `${2 + Math.random() * 2}s`
    }));
    setParticles(generatedParticles);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
            style={{
              left: particle.left,
              top: particle.top,
              animationDelay: particle.animationDelay,
              animationDuration: particle.animationDuration
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Logo/Title */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-bold font-mono tracking-tight px-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
              {typedText}
            </span>
            <span className="text-cyan-400 animate-pulse select-none pointer-events-none">|</span>
          </h1>
        </div>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-300 mb-12 text-center max-w-2xl">
          Developer • Creator • Innovator
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 mb-16">
          <a 
            href="https://cal.com/jackbraun.ai/secret"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25 border border-cyan-400/50 cursor-pointer inline-flex items-center justify-center"
          >
            Get In Touch
          </a>
          <div
            className="relative inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-purple-500 text-purple-400 font-bold rounded-lg cursor-default"
          >
            <span className="relative z-10">Work in Progress</span>
            {/* Progress overlay */}
            <span aria-hidden className="pointer-events-none absolute inset-0 rounded-lg overflow-hidden">
              <span className="absolute inset-0 bg-gray-800 rounded-lg" />
              <span className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 rounded-lg opacity-70 animate-pulse" />
              <span
                className="absolute inset-0 rounded-lg opacity-70 animate-pulse"
                style={{
                  background: 'linear-gradient(90deg, #9333ea 0%, #3b82f6 50%, #06b6d4 100%)',
                  animation: 'progress 2s ease-in-out infinite'
                }}
              />
            </span>
          </div>
        </div>

        {/* Tech stack */}
        <div className="text-center mb-16">
          <h2 className="text-2xl font-bold text-gray-200 mb-6">Tech Stack</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {['React', 'Node.js', 'TypeScript', 'Python', 'AWS', 'Docker'].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-gray-800 border border-gray-600 text-gray-300 rounded-full text-sm font-mono hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Social links */}
        <div className="flex gap-6">
          {[
            { name: 'GitHub', color: 'hover:text-gray-400', href: 'https://github.com/jackbraun-ai/attempt2' },
            { name: 'LinkedIn', color: 'hover:text-blue-400', href: 'https://www.linkedin.com/in/jackbraun18/' },
            { name: 'Skool', color: 'hover:text-cyan-400', href: 'https://www.skool.com/jackbraunai-8960' }
          ].map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-gray-500 ${social.color} transition-colors duration-300 font-mono text-sm`}
            >
              {social.name}
            </a>
          ))}
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600" />
    </div>
  );
}
