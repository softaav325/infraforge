import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ExternalLink, Cpu, Server, Layers, Shield, Zap, Activity } from 'lucide-react';
import { Button, Container, Section, GradientText, AnimatedGridBackground, Badge } from './UI';

const Hero = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { 
      duration: 1.2, 
      ease: [0.22, 1, 0.36, 1] 
    }
  };

  const floatAnim = (delay = 0, duration = 6) => ({
    initial: { y: 0, opacity: 0 },
    animate: { 
      y: [0, -15, 0],
      opacity: [0.4, 1, 0.4],
      transition: { 
        duration, 
        repeat: Infinity, 
        ease: "easeInOut",
        delay 
      } 
    }
  });

  return (
    <Section className="relative min-h-screen flex items-center justify-center overflow-hidden py-0">
      {/* CINEMATIC BACKGROUND LAYER */}
      <div className="absolute inset-0 z-0">
        <AnimatedGridBackground className="absolute inset-0 opacity-40" />
        
        {/* Layered Gradients for Depth */}
        <div className="absolute inset-0 bg-premium-black" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-premium-black via-transparent to-premium-black" />
        
        {/* Dynamic Glow Orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-premium-primary/30 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-premium-secondary/20 blur-[120px] rounded-full animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-premium-primary/5 blur-[150px] rounded-full" />
      </div>

      <Container className="relative z-10 text-center">
        {/* Availability Badge - More Refined */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center mb-10"
        >
          <Badge className="px-4 py-1.5 flex items-center gap-3 bg-green-500/10 text-green-400 border-green-500/30 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest">Available for elite partnerships</span>
          </Badge>
        </motion.div>

        {/* MAIN HEADLINE - Ultra Premium Typography */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          className="relative"
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter leading-none mb-8">
            <span className="relative z-10">
              <GradientText>Architecting</GradientText><br />
              <span className="text-white relative">Sovereign AI</span>
            </span>
          </h1>
          
          {/* Visual Accent behind text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 pointer-events-none">
            <div className="absolute inset-0 bg-premium-primary/20 blur-3xl rounded-full scale-75 opacity-50" />
          </div>
        </motion.div>

        {/* SUBHEADLINE - High Contrast & Spacing */}
        <motion.p 
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-2xl text-gray-400 max-w-3xl mx-auto mb-16 leading-relaxed font-light tracking-wide"
        >
          Elite <span className="text-white font-medium">AI Infrastructure Engineering</span> focused on 
          massive-scale <span className="text-white font-medium">GPU orchestration</span> and 
          low-latency <span className="text-white font-medium">inference platforms</span> for the next era of intelligence.
        </motion.p>

        {/* CTA HIERARCHY - Primary vs Secondary */}
        <motion.div 
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-6 mb-24"
        >
          <Button variant="primary" className="px-10 py-4 text-lg group flex items-center gap-3 shadow-premium-primary/40">
            <Calendar size={20} />
            Strategy Call
          </Button>
          <Button variant="secondary" className="px-10 py-4 text-lg group flex items-center gap-3 backdrop-blur-xl">
            View Portfolio
            <ExternalLink size={20} className="group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>

        {/* SOCIALS - Minimalist */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center gap-8 mb-20"
        >
           {[
             { icon: <span className="text-xl">🐙</span>, link: "#" },
             { icon: <span className="text-xl">💼</span>, link: "#" },
             { icon: <span className="text-xl">🐦</span>, link: "#" },
           ].map((social, i) => (
            <a 
              key={i} 
              href={social.link} 
              className="p-3 rounded-full glass border border-white/10 text-gray-400 hover:text-white hover:border-premium-primary/50 hover:bg-white/5 transition-all duration-300"
            >
              {social.icon}
            </a>
          ))}
        </motion.div>

        {/* FLOATING INFRASTRUCTURE VISUALS - Cinematic Depth */}
        <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
          {/* Left Cluster */}
          <motion.div 
            variants={floatAnim(0)} initial="initial" animate="animate"
            className="absolute top-[20%] left-[5%] hidden lg:flex p-4 glass rounded-premium border-white/10 shadow-2xl"
          >
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-premium-primary/20 rounded-lg text-premium-primary border border-premium-primary/30 shadow-lg shadow-premium-primary/20">
                <Cpu size={24} />
              </div>
              <div className="text-left">
                <div className="text-xs text-gray-500 uppercase font-bold tracking-tighter">Compute</div>
                <div className="text-sm font-semibold text-white">H100 Clusters</div>
              </div>
            </div>
          </motion.div>
          
          {/* Right Cluster */}
          <motion.div 
            variants={floatAnim(1)} initial="initial" animate="animate"
            className="absolute top-[30%] right-[5%] hidden lg:flex p-4 glass rounded-premium border-white/10 shadow-2xl"
          >
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-premium-secondary/20 rounded-lg text-premium-secondary border border-premium-secondary/30 shadow-lg shadow-premium-secondary/20">
                <Server size={24} />
              </div>
              <div className="text-left">
                <div className="text-xs text-gray-500 uppercase font-bold tracking-tighter">Orchestration</div>
                <div className="text-sm font-semibold text-white">K8s Auto-scaling</div>
              </div>
            </div>
          </motion.div>

          {/* Bottom Left Cluster */}
          <motion.div 
            variants={floatAnim(2)} initial="initial" animate="animate"
            className="absolute bottom-[25%] left-[10%] hidden lg:flex p-4 glass rounded-premium border-white/10 shadow-2xl"
          >
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-blue-500/20 rounded-lg text-blue-400 border border-blue-500/30 shadow-lg shadow-blue-500/20">
                <Layers size={24} />
              </div>
              <div className="text-left">
                <div className="text-xs text-gray-500 uppercase font-bold tracking-tighter">Inference</div>
                <div className="text-sm font-semibold text-white">Triton Engine</div>
              </div>
            </div>
          </motion.div>

          {/* Security Floating Element */}
          <motion.div 
            variants={floatAnim(3, 8)} initial="initial" animate="animate"
            className="absolute bottom-[35%] right-[15%] hidden lg:flex p-4 glass rounded-premium border-white/10 shadow-2xl"
          >
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-emerald-500/20 rounded-lg text-emerald-400 border border-emerald-500/30 shadow-lg shadow-emerald-500/20">
                <Shield size={24} />
              </div>
              <div className="text-left">
                <div className="text-xs text-gray-500 uppercase font-bold tracking-tighter">Compliance</div>
                <div className="text-sm font-semibold text-white">Air-gapped Stack</div>
              </div>
            </div>
          </motion.div>

          {/* Performance Particles */}
          <motion.div 
            variants={floatAnim(4, 5)} initial="initial" animate="animate"
            className="absolute top-1/4 right-1/3 hidden lg:flex p-3 glass rounded-full border-white/5"
          >
            <div className="flex items-center gap-2 px-2">
              <Zap size={14} className="text-yellow-400" />
              <span className="text-[10px] font-bold text-white uppercase">Low Latency</span>
            </div>
          </motion.div>
          <motion.div 
            variants={floatAnim(5, 7)} initial="initial" animate="animate"
            className="absolute bottom-1/3 left-1/4 hidden lg:flex p-3 glass rounded-full border-white/5"
          >
            <div className="flex items-center gap-2 px-2">
              <Activity size={14} className="text-premium-primary" />
              <span className="text-[10px] font-bold text-white uppercase">High Throughput</span>
            </div>
          </motion.div>
        </div>

        {/* TRUST INDICATORS - Cinematic Bottom Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-20 pt-12 border-t border-white/5 flex flex-col items-center"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-10 font-bold">Industry Standard Ecosystem</p>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 opacity-40 grayscale contrast-125">
             <div className="text-2xl font-black text-white tracking-tighter italic hover:opacity-100 transition-opacity cursor-default">NVIDIA</div>
             <div className="text-2xl font-black text-white tracking-tighter italic hover:opacity-100 transition-opacity cursor-default">KUBERNETES</div>
             <div className="text-2xl font-black text-white tracking-tighter italic hover:opacity-100 transition-opacity cursor-default">PYTORCH</div>
             <div className="text-2xl font-black text-white tracking-tighter italic hover:opacity-100 transition-opacity cursor-default">TERRAFORM</div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
};

export default Hero;
