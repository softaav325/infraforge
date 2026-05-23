import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  TrendingUp, 
  Cpu, 
  Award, 
  Clock, 
  Code2,
  CheckCircle2
} from 'lucide-react';
import { Section, Container, Card, Badge, GradientText } from './UI';

const About = () => {
  const stats = [
    { label: 'Uptime Guaranteed', value: '99.99%', icon: <ShieldCheck size={20} /> },
    { label: 'GPU Efficiency', value: '+40%', icon: <TrendingUp size={20} /> },
    { label: 'Cluster Scale', value: '1k+ Nodes', icon: <Cpu size={20} /> },
  ];

  const timeline = [
    {
      year: '2024',
      title: 'AI Infrastructure Specialist',
      description: 'Leading the deployment of sovereign AI stacks and H100 clusters for enterprise clients.',
      icon: <Cpu size={20} />,
    },
    {
      year: '2022',
      title: 'Senior Platform Engineer',
      description: 'Architected auto-scaling Kubernetes platforms handling millions of daily requests.',
      icon: <Code2 size={20} />,
    },
    {
      year: '2020',
      title: 'DevOps & Cloud Architect',
      description: 'Specialized in IaC, CI/CD pipelines and multi-cloud strategy implementation.',
      icon: <Clock size={20} />,
    },
  ];

  const certifications = [
    'CKA (Certified Kubernetes Administrator)',
    'AWS Solutions Architect Professional',
    'NVIDIA Certified Associate',
    'Terraform HashiCorp Certified'
  ];

  return (
    <Section id="about" className="relative overflow-hidden">
      <Container>
          <div className="flex flex-col lg:flex-row-reverse gap-12 lg:gap-16 items-start">
            {/* Right Side: Experience & Credentials */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full lg:w-1/2 space-y-10 lg:space-y-12"
            >
              {/* Timeline */}
              <div className="relative">
                <h3 className="text-xl font-bold text-white mb-6 lg:mb-8 flex items-center gap-2">
                  <Award className="text-premium-primary" size={24} />
                  Professional Journey
                </h3>
                <div className="space-y-6 lg:space-y-8 relative before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px before:bg-white/10">
                  {timeline.map((item, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.2 }}
                      className="relative pl-6 lg:pl-8"
                    >
                      <div className="absolute left-[-4px] lg:left-[-5px] top-1 w-2 h-2 lg:w-2.5 lg:h-2.5 rounded-full bg-premium-primary shadow-[0_0_10px_rgba(139,92,246,0.5)]" />
                      <span className="text-[10px] lg:text-xs font-mono text-premium-primary font-bold uppercase">{item.year}</span>
                      <h4 className="text-base lg:text-lg font-bold text-white mt-1 mb-1 lg:mb-2">{item.title}</h4>
                      <p className="text-gray-400 text-xs lg:text-sm leading-relaxed">{item.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Certifications - Asymmetric Card */}
              <Card className="border-white/5 p-5 lg:p-10 relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-premium-primary/20 to-premium-secondary/20 rounded-premium blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Certifications</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {certifications.map((cert, i) => (
                      <div key={i} className="flex items-center gap-3 p-2 lg:p-3 rounded-xl bg-white/5 border border-white/10 text-xs lg:text-sm text-gray-300 hover:bg-white/10 transition-colors">
                        <CheckCircle2 size={14} className="text-premium-primary shrink-0" />
                        {cert}
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Left Side: Story & Philosophy */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full lg:w-1/2"
            >
              <div className="mb-8">
                <Badge>My Philosophy</Badge>
                <h2 className="text-4xl md:text-6xl lg:text-8xl font-extrabold tracking-tighter leading-[1.1] mt-4 mb-6 lg:mb-10">
                  <GradientText>Systems Thinking</GradientText><br />
                  <span className="text-white">at Scale</span>
                </h2>
                <p className="text-lg md:text-xl lg:text-2xl text-gray-400 leading-relaxed mb-6 lg:mb-8 font-light">
                  I don't just deploy servers; I build <span className="text-white font-normal">resilient ecosystems</span>. 
                  My approach combines the rigor of traditional Production Engineering with the 
                  dynamic requirements of modern AI workloads.
                </p>
                <p className="text-lg md:text-xl lg:text-2xl text-gray-400 leading-relaxed font-light">
                  Specializing in the <span className="text-white font-normal">"hard" parts of the stack</span>: GPU orchestration, 
                  low-latency networking, and the delicate balance between 
                  extreme performance and absolute reliability.
                </p>
              </div>

              {/* Stats Grid - Responsive layout */}
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-4 mb-12">
                {stats.map((stat, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={`p-5 lg:p-6 glass rounded-premium border-white/5 text-center transition-all duration-300 hover:border-premium-primary/30 ${i === 1 ? 'sm:scale-105 lg:scale-110 z-10 bg-premium-primary/5' : ''}`}
                  >
                    <div className="flex justify-center text-premium-primary mb-2">{stat.icon}</div>
                    <div className="text-2xl lg:text-3xl font-bold text-white">{stat.value}</div>
                    <div className="text-[9px] lg:text-[10px] text-gray-500 uppercase font-bold tracking-widest">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
      </Container>
    </Section>
  );
};

export default About;
