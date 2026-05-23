import React from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Activity, 
  BarChart3, 
  Cpu 
} from 'lucide-react';
import { Section, Container, Card, Badge, GradientText, Button } from './UI';

const Projects = () => {
  const projects = [
    {
      title: 'OmniScale GPU Inference Platform',
      impact: 'Reduced inference latency by 40% and lowered compute costs by $12k/mo for a Series B AI startup.',
      highlights: ['Custom vLLM integration', 'Dynamic batching orchestration', 'Multi-node H100 cluster management'],
      metrics: [
        { label: 'Latency', value: '-40%', icon: <Zap size={14} /> },
        { label: 'Cost', value: '-25%', icon: <span>📈</span> },
        { label: 'Throughput', value: '2.5x', icon: <Activity size={14} /> },
      ],
      stack: ['Python', 'CUDA', 'vLLM', 'Kubernetes', 'Prometheus'],
      scale: '512 GPU Nodes',
      color: 'from-premium-primary to-premium-secondary',
      size: 'large',
    },
    {
      title: 'KubeAuto Predictive Scaler',
      impact: 'Implemented zero-downtime scaling for a fintech platform handling 50k+ requests per second.',
      highlights: ['ML-based load prediction', 'Custom K8S Horizontal Pod Autoscaler', 'Cross-region traffic shifting'],
      metrics: [
        { label: 'SLA', value: '99.99%', icon: <span>🛡️</span> },
        { label: 'Cold Start', value: '↓ 2s', icon: <Zap size={14} /> },
        { label: 'Efficiency', value: '+30%', icon: <BarChart3 size={14} /> },
      ],
      stack: ['Go', 'Terraform', 'Prometheus', 'AWS EKS', 'gRPC'],
      scale: '1,200+ Pods',
      color: 'from-blue-600 to-indigo-400',
      size: 'small',
    },
    {
      title: 'SovereignAI Enterprise Stack',
      impact: 'Deployed a fully air-gapped private LLM infrastructure for a healthcare provider to ensure HIPAA compliance.',
      highlights: ['Air-gapped environment design', 'Quantized Llama-3 deployment', 'Hardware-level security isolation'],
      metrics: [
        { label: 'Compliance', value: '100%', icon: <span>🛡️</span> },
        { label: 'Privacy', value: 'Full', icon: <span>🛡️</span> },
        { label: 'Inference', value: 'Local', icon: <Cpu size={14} /> },
      ],
      stack: ['Llama.cpp', 'PyTorch', 'Ubuntu Server', 'NVIDIA Triton'],
      scale: 'On-Prem DataCenter',
      color: 'from-emerald-600 to-teal-400',
      size: 'small',
    },
    {
      title: 'NeuralWatch Observability Suite',
      impact: 'Created a real-time monitoring system for LLM hallucinations and token drift in production.',
      highlights: ['Real-time embedding drift detection', 'Automated alert pipelines', 'Custom Grafana dashboards for AI metrics'],
      metrics: [
        { label: 'Detection', value: 'Real-time', icon: <Activity size={14} /> },
        { label: 'Accuracy', value: '94%', icon: <BarChart3 size={14} /> },
        { label: 'MTTD', value: '↓ 80%', icon: <Zap size={14} /> },
      ],
      stack: ['TypeScript', 'ClickHouse', 'Grafana', 'Python', 'React'],
      scale: '10M+ Tokens/Day',
      color: 'from-orange-500 to-pink-500',
      size: 'large',
    },
  ];

  return (
    <Section id="projects" className="relative overflow-hidden">
      <Container>
        <div className="text-center mb-16 lg:mb-24">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block mb-4"
          >
            <Badge>Featured Work</Badge>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl lg:text-8xl font-extrabold tracking-tighter leading-tight mb-6 lg:mb-8"
          >
            <GradientText>Enterprise</GradientText> <span className="text-white">Projects</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl lg:text-2xl text-gray-400 max-w-3xl mx-auto mb-8 lg:mb-12 leading-relaxed font-light px-4"
          >
            High-impact infrastructure projects solving complex problems at the 
            intersection of <span className="text-white font-normal">Distributed Systems</span> and <span className="text-white font-normal">Artificial Intelligence</span>.
          </motion.p>
        </div>

        {/* BENTO-STYLE ASYMMETRIC GRID - Mobile optimized */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 auto-rows-[auto]">
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`group relative ${
                project.size === 'large' ? 'md:col-span-3' : 'md:col-span-3'
              }`}
            >
              <Card className="group relative h-full border-white/5 overflow-hidden hover:border-premium-primary/30 transition-all duration-500 p-6 md:p-8 lg:p-10">
                {/* Dynamic Gradient Glow based on project color */}
                <div className={`absolute -inset-px bg-gradient-to-r ${project.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                    <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-premium-primary transition-colors duration-300">
                      {project.title}
                    </h3>
                    <div className="flex gap-3 shrink-0">
                      <a href="#" className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg bg-white/5 text-xs">GitHub</a>
                      <a href="#" className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg bg-white/5 text-xs">Demo</a>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-6 leading-relaxed italic font-medium text-sm md:text-base">
                    "{project.impact}"
                  </p>

                  <div className="mb-8">
                    <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-3 font-bold">Architecture Highlights</p>
                    <ul className="space-y-2">
                      {project.highlights.map((h, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs md:text-sm text-gray-400">
                          <div className={`w-1 h-1 rounded-full bg-gradient-to-r ${project.color} shrink-0`} />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-3 gap-3 md:gap-4 mb-8">
                    {project.metrics.map((m, i) => (
                      <div key={i} className="bg-white/5 p-2 md:p-3 rounded-xl border border-white/10 text-center group-hover:bg-white/10 transition-colors">
                        <div className="flex justify-center text-premium-primary mb-1">{m.icon}</div>
                        <div className="text-sm md:text-lg font-bold text-white">{m.value}</div>
                        <div className="text-[8px] md:text-[10px] uppercase text-gray-500 font-bold">{m.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex flex-wrap gap-2 justify-center">
                      {project.stack.map(s => (
                        <span key={s} className="text-[9px] md:text-[10px] px-2 py-1 rounded-md bg-white/5 text-gray-400 border border-white/10 font-medium group-hover:text-premium-primary group-hover:border-premium-primary/30 transition-all">
                          {s}
                        </span>
                      ))}
                    </div>
                    <div className="text-[10px] font-mono text-gray-500">
                      Scale: <span className="text-gray-300">{project.scale}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default Projects;
