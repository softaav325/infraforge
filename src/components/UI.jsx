import React, { memo } from 'react';

/**
 * Button Component
 * Polished for a high-end SaaS feel.
 * Focus: Micro-interactions, subtle lighting, and precise typography.
 */
export const Button = memo(({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}) => {
  const variants = {
    primary: 'bg-premium-primary text-white shadow-lg shadow-premium-primary/20 hover:shadow-premium-primary/40 hover:bg-premium-secondary',
    secondary: 'glass text-white border border-white/10 hover:bg-white/10 hover:border-white/20',
    outline: 'border border-white/10 text-gray-300 hover:text-white hover:bg-white/5 hover:border-white/20',
    ghost: 'text-gray-400 hover:text-white hover:bg-white/5',
  };

  return (
    <button 
      className={`relative overflow-hidden px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ease-out active:scale-[0.97] group will-change-transform ${variants[variant]} ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      {/* Subtle high-end sheen effect */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out will-change-transform" />
      )}
    </button>
  );
});

/**
 * Card Component
 * Refined for depth and precision. 
 * Mimics Linear/Vercel aesthetics with subtle borders and refined glassmorphism.
 */
export const Card = memo(({ children, className = '', ...props }) => {
  return (
    <div className={`group relative glass rounded-3xl p-6 md:p-8 transition-all duration-500 hover:border-premium-primary/30 hover:shadow-2xl border border-white/5 will-change-transform ${className}`} {...props}>
      {/* Precision backlight effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
      
      {/* Minimalist border glow */}
      <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-premium-primary/10 transition-all duration-500 -z-10" />
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
});

/**
 * Badge Component
 * Minimalist and refined.
 */
export const Badge = memo(({ children, className = '', ...props }) => {
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-premium-primary/10 text-premium-primary border border-premium-primary/20 relative group hover:border-premium-primary/40 transition-all duration-300 ${className}`} {...props}>
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 rounded-full bg-premium-primary/10 blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500" />
    </span>
  );
});

/**
 * Container Component
 */
export const Container = memo(({ children, className = '' }) => {
  return (
    <div className={`max-w-7xl mx-auto px-6 lg:px-12 xl:px-16 ${className}`}>
      {children}
    </div>
  );
});

/**
 * Section Component
 */
export const Section = memo(({ children, className = '', id = '' }) => {
  return (
    <section id={id} className={`py-24 md:py-32 lg:py-48 relative ${className}`}>
      {children}
    </section>
  );
});

/**
 * GradientText Component
 */
export const GradientText = memo(({ children, className = '' }) => {
  return (
    <span className={`premium-gradient-text font-bold bg-clip-text text-transparent bg-gradient-to-r from-premium-primary via-premium-secondary to-premium-primary bg-[length:200%_auto] animate-gradient-flow ${className}`}>
      {children}
    </span>
  );
});

/**
 * GlowEffect Component
 */
export const GlowEffect = memo(({ children, className = '', color = 'premium-primary' }) => {
  return (
    <div className={`relative group ${className}`}>
      <div className={`absolute -inset-4 bg-${color}/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10 rounded-full will-change-opacity`} />
      {children}
    </div>
  );
});

/**
 * AnimatedGridBackground Component
 * Polished for a high-end AI feel.
 */
export const AnimatedGridBackground = memo(({ children, className = '' }) => {
  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <div className="absolute inset-0 animated-grid opacity-[0.1] pointer-events-none" />
      
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{ 
          background: 'radial-gradient(circle at center, transparent 0%, var(--premium-black) 85%)' 
        }}
      />

      {/* Refined ambient lighting */}
      <div className="absolute top-[-15%] left-[-10%] w-[40%] h-[40%] rounded-full bg-premium-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-15%] right-[-10%] w-[40%] h-[40%] rounded-full bg-premium-secondary/10 blur-[120px] pointer-events-none" />

      <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-premium-black via-premium-black/80 to-transparent pointer-events-none" />
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
});
