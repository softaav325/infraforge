import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Send, 
  ArrowRight, 
  Calendar, 
  CheckCircle2,
  Loader2
} from 'lucide-react';

import { Section, Container, Card, Button, GradientText, Badge } from './UI';

const Contact = () => {
  const [formState, setFormState] = useState('idle'); // idle | submitting | success
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'Infrastructure Consultation', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormState('submitting');
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setFormState('success');
    setTimeout(() => setFormState('idle'), 3000);
  };

  return (
    <Section id="contact" className="relative overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-left"
          >
               <div className="mb-8">
                 <div className="inline-block mb-4">
                   <Badge>Get In Touch</Badge>
                 </div>
                 <h2 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter leading-tight mb-8">
                   <GradientText>Let's build the</GradientText><br />
                   <span className="text-white">Future together</span>
                 </h2>
                 <p className="text-xl md:text-2xl text-gray-400 max-w-2xl leading-relaxed mb-12 font-light">
                   Whether you're looking to <span className="text-white font-normal">scale your AI infrastructure</span>, 
                   optimize <span className="text-white font-normal">GPU utilization</span>, or build a 
                   <span className="text-white font-normal">sovereign AI stack</span>, I'm available for 
                   high-impact consultations and partnerships.
                 </p>
               </div>

            {/* Social & Booking Matrix */}
            <div className="space-y-6 mb-12">
              <div className="grid grid-cols-2 gap-4">
                <a href="#" className="group p-4 glass rounded-premium flex items-center gap-4 hover:border-premium-primary/50 transition-all duration-300">
                  <div className="p-2 bg-white/5 rounded-lg group-hover:bg-premium-primary/20 transition-colors">
                    <span className="text-gray-400 group-hover:text-white">🐙</span>
                  </div>
                  <span className="text-gray-300 group-hover:text-white font-medium transition-colors">GitHub</span>
                </a>
                <a href="#" className="group p-4 glass rounded-premium flex items-center gap-4 hover:border-premium-primary/50 transition-all duration-300">
                  <div className="p-2 bg-white/5 rounded-lg group-hover:bg-premium-primary/20 transition-colors">
                    <span className="text-gray-400 group-hover:text-white">💼</span>
                  </div>
                  <span className="text-gray-300 group-hover:text-white font-medium transition-colors">LinkedIn</span>
                </a>
              </div>
              
              <a href="https://calendly.com" target="_blank" rel="noopener noreferrer" 
                className="group p-4 glass rounded-premium flex items-center justify-between hover:border-premium-primary/50 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-white/5 rounded-lg group-hover:bg-premium-primary/20 transition-colors text-gray-400 group-hover:text-white">
                    <Calendar size={20} />
                  </div>
                  <span className="text-gray-300 group-hover:text-white font-medium transition-colors">Schedule a Strategy Call</span>
                </div>
                <ArrowRight size={18} className="text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </a>
            </div>
          </motion.div>

          {/* Right Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-premium-primary/10 blur-3xl rounded-full -z-10" />
            <Card className="relative border-white/10 p-8 lg:p-10 overflow-hidden">
              {/* Success Overlay */}
              <AnimatePresence>
                {formState === 'success' && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-20 bg-premium-black/90 backdrop-blur-md flex flex-col items-center justify-center text-center p-6"
                  >
                    <motion.div 
                      initial={{ scale: 0 }} 
                      animate={{ scale: 1 }} 
                      className="w-16 h-16 bg-premium-primary/20 rounded-full flex items-center justify-center text-premium-primary mb-4"
                    >
                      <CheckCircle2 size={32} />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white mb-2">Message Received!</h3>
                    <p className="text-gray-400">I'll get back to you within 24-48 hours.</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-gray-500 font-bold ml-1">Full Name</label>
                    <input 
                      required
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="John Doe" 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-premium-primary/50 transition-all placeholder:text-gray-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-gray-500 font-bold ml-1">Email Address</label>
                    <input 
                      required
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="john@company.com" 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-premium-primary/50 transition-all placeholder:text-gray-600"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gray-500 font-bold ml-1">Subject</label>
                  <div className="relative">
                    <select 
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-premium-primary/50 transition-all appearance-none"
                    >
                      <option className="bg-premium-black">Infrastructure Consultation</option>
                      <option className="bg-premium-black">AI Model Deployment</option>
                      <option className="bg-premium-black">K8s Architecture Audit</option>
                      <option className="bg-premium-black">Other</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                      <ArrowRight size={16} className="rotate-90" />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gray-500 font-bold ml-1">Message</label>
                  <textarea 
                    required
                    rows={4} 
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Tell me about your project..." 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-premium-primary/50 transition-all resize-none placeholder:text-gray-600"
                  />
                </div>
                <Button 
                  type="submit" 
                  variant="primary" 
                  disabled={formState === 'submitting'}
                  className="w-full py-4 flex items-center justify-center gap-2 group"
                >
                  {formState === 'submitting' ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
};

export default Contact;
