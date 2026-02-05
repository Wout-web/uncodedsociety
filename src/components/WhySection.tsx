import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Quote } from 'lucide-react';

const WhySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const reasons = [
    {
      number: '01',
      title: 'The Tech Gap is Real',
      description: 'Underrepresented communities face significant barriers to entering tech. We\'re here to break those barriers down, one lesson at a time.',
    },
    {
      number: '02',
      title: 'Early Access Matters',
      description: 'Exposure to coding at a young age opens doors that might otherwise stay closed. Every young person deserves that opportunity.',
    },
    {
      number: '03',
      title: 'Community is Power',
      description: 'Learning together, growing together. We build more than coding skills—we build lasting connections and support networks.',
    },
  ];

  return (
    <section id="why" className="relative py-32 overflow-hidden" ref={ref}>
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/4 -right-32 w-96 h-96 border border-primary/10 rounded-full"
        />
        <motion.div
          animate={{ rotate: [360, 0] }}
          transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-1/4 -left-32 w-72 h-72 border border-secondary/10 rounded-full"
        />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header - Left aligned, asymmetric */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-xl mb-20"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-12 bg-secondary" />
            <span className="text-secondary font-semibold tracking-wider uppercase text-sm">
              Our Mission
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Why We
            <br />
            <span className="text-gradient-primary">Do This</span>
          </h2>
        </motion.div>

        {/* Reasons - Staggered layout */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.number}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              style={{ marginTop: index === 1 ? '4rem' : 0 }}
              className="relative"
            >
              {/* Large number */}
              <span className="font-display text-8xl font-bold text-muted/30 absolute -top-8 -left-4 select-none">
                {reason.number}
              </span>
              
              <div className="relative z-10 glass-card rounded-3xl p-8 h-full">
                <h3 className="font-display text-2xl font-bold mb-4 text-foreground">
                  {reason.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {reason.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quote callout */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20 max-w-4xl mx-auto"
        >
          <div className="relative glass-card rounded-3xl p-10 lg:p-14">
            <Quote className="absolute top-8 left-8 w-12 h-12 text-primary/30" />
            <blockquote className="relative z-10 font-display text-2xl md:text-3xl font-medium text-center leading-relaxed">
              "Technology has the power to level the playing field. 
              <span className="text-gradient-secondary"> We're making sure everyone gets a seat at the table.</span>"
            </blockquote>
            <p className="text-center text-muted-foreground mt-6">— Uncode Society Team</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhySection;
