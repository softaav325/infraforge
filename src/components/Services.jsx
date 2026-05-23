import React from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  Server, 
  Layers, 
  Zap, 
  Cloud, 
  Infinity, 
  CheckCircle2 
} from 'lucide-react';
import { Section, Container, Card, Badge, GradientText } from './UI';

const Services = () => {
  const services = [
    {
      title: 'Kubernetes Platform Engineering',
      description: 'Designing production-grade K8s clusters optimized for high-availability and massive scale.',
      icon: <Server className="w-6 h-6" />,
      tech: ['EKS', 'GKE', 'Helm', 'ArgoCD'],
      value: '99.9% Uptime & Scalability',
      color: 'from-blue-500 to-cyan-400',
      glow: 'shadow-blue-500/20'
    },
    {
      title: 'MLOps Infrastructure',
      description: 'End-to-end pipelines for training, deploying, and monitoring large-scale AI models.',
      icon: <Layers className="w-6 h-6" />,
      tech: ['Kubeflow', 'MLflow', 'Triton', 'Seldon'],
      value: 'Faster Model Time-to-Market',
      color: 'from-purple-500 to-pink-400',
      glow: 'shadow-purple-500/20'
    },
    {
      title: 'GPU Optimization',
      description: 'Maximizing TFLOPS utilization and reducing latency through custom CUDA configs and scheduling.',
      icon: <Cpu className="w-6 h-6" />,
      tech: ['NVIDIA H100', 'A100', 'CUDA', 'vLLM'],
      value: 'Reduced Compute Costs',
      color: 'from-green-500 to-emerald-400',
      glow: 'shadow-green-500/20'
    },
    {
      title: 'Self-hosted AI Systems',
      description: 'Deploying LLMs and diffusion models on private infrastructure for total data sovereignty.',
      icon: <Zap className="w-6 h-6" />,
      tech: ['Llama.cpp', 'vLLM', 'Ollama', 'LocalAI'],
      value: 'Total Data Privacy',
      color: 'from-orange-500 to-yellow-400',
      glow: 'shadow-orange-500/20'
    },
    {
      title: 'Cloud Architecture',
      description: 'Multi-cloud and hybrid strategies that balance performance with cost efficiency.',
      icon: <Cloud className="w-6 h-6" />,
      tech: ['AWS', 'GCP', 'Azure', 'Terraform'],
      value: 'Optimized Infrastructure Spend',
      color: 'from-indigo-500 to-blue-400',
      glow: 'shadow-indigo-500/20'
    },
    {
      title: 'DevOps Automation',
      description: 'Zero-touch deployment pipelines and automated guardrails for rapid iteration.',
      icon: <Infinity className="w-6 h-6" />,
      tech: ['GitHub Actions', 'GitLab CI', 'Ansible', 'Trivy'],
      value: 'Accelerated Dev Cycles',
      color: 'from-red-500 to-orange-400',
      glow: 'shadow-red-500/20'
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        duration: 1.2, 
        ease: [0.22, 1, 0.36, 1] 
      },
    },
  };

  return (
    <Section id="services" className="relative">
      <Container>
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block mb-4"
          >
            <Badge>Core Expertise</Badge>
          </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter leading-tight mb-8"
            >
              <GradientText>Infrastructure</GradientText> <span className="text-white">Solutions</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed font-light"
            >
              Specializing in the intersection of <span className="text-white font-normal">high-performance compute</span> and 
              <span className="text-white font-normal"> modern orchestration</span> to power the next generation of AI applications.
            </motion.p>
        </div>

        {/* Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              {/* Background Glow Effect */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${service.color} rounded-premium opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl`} />
              
              <Card className={`relative h-full overflow-hidden border-white/5 group-hover:border-white/20 transition-colors duration-300 ${service.glow}`}>
                {/* Icon and Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${service.color} text-white shadow-lg`}>
                    {service.icon}
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-premium-primary transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {service.tech.map(t => (
                    <span key={t} className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded bg-white/5 text-gray-300 border border-white/10">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Business Value */}
                <div className="pt-4 border-t border-white/5 flex items-center gap-2 text-sm font-medium text-premium-primary">
                  <CheckCircle2 size={16} />
                  {service.value}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
};

export default Services;
