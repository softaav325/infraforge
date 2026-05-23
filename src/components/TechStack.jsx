import React from 'react';
import { motion } from 'framer-motion';
import { 
  Box, 
  Cpu, 
  Cloud, 
  Terminal, 
  Activity, 
  Layout, 
  Zap, 
  Code2, 
  Globe, 
  Anchor, 
  Settings, 
  Layers 
} from 'lucide-react';
import { Section, Container, Badge, GradientText } from './UI';

const TechStack = () => {
  const tech = [
    { name: 'Kubernetes', icon: <Box size={24} />, category: 'Orchestration', color: 'text-blue-400' },
    { name: 'Terraform', icon: <Settings size={24} />, category: 'IaC', color: 'text-purple-400' },
    { name: 'AWS', icon: <Cloud size={24} />, category: 'Cloud', color: 'text-orange-400' },
    { name: 'Docker', icon: <Layers size={24} />, category: 'Virtualization', color: 'text-blue-500' },
    { name: 'Linux', icon: <Terminal size={24} />, category: 'OS', color: 'text-yellow-500' },
    { name: 'Prometheus', icon: <Activity size={24} />, category: 'Monitoring', color: 'text-orange-500' },
    { name: 'Grafana', icon: <Layout size={24} />, category: 'Observability', color: 'text-orange-300' },
    { name: 'Python', icon: <Code2 size={24} />, category: 'Language', color: 'text-blue-300' },
    { name: 'Go', icon: <Zap size={24} />, category: 'Language', color: 'text-cyan-400' },
    { name: 'ArgoCD', icon: <Globe size={24} />, category: 'GitOps', color: 'text-indigo-400' },
    { name: 'Helm', icon: <Anchor size={24} />, category: 'Packaging', color: 'text-blue-600' },
    { name: 'vLLM', icon: <Cpu size={24} />, category: 'AI Inference', color: 'text-premium-primary' },
  ];

  return (
    <Section id="stack" className="relative overflow-hidden">
      <Container>
        <div className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block mb-4"
          >
            <Badge>Technical Arsenal</Badge>
          </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter leading-tight mb-8"
            >
              <GradientText>Technical</GradientText> <span className="text-white">Arsenal</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed font-light"
            >
              A curated selection of industry-standard tools and cutting-edge frameworks 
              used to build <span className="text-white font-normal">resilient, high-performance</span> AI infrastructure.
            </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {tech.map((item, index) => (
                <motion.div 
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: index * 0.1, 
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1] 
                  }}
                  whileHover={{ 
                    y: -6, 
                    transition: { duration: 0.4, ease: "easeOut" }
                  }}
                  className="relative group"
                >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-premium-primary/20 to-premium-secondary/20 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative h-full glass rounded-2xl p-6 flex flex-col items-center justify-center text-center border-white/5 group-hover:border-premium-primary/30 transition-all duration-300">
                <motion.div 
                  animate={{ 
                    y: [0, -5, 0],
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: index * 0.2
                  }}
                  className={`mb-4 p-3 rounded-xl bg-white/5 ${item.color} group-hover:bg-premium-primary/10 transition-colors duration-300`}
                >
                  {item.icon}
                </motion.div>
                
                <h3 className="text-white font-bold mb-1 group-hover:text-premium-primary transition-colors duration-300">
                  {item.name}
                </h3>
                <span className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold">
                  {item.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default TechStack;
