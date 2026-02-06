import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const WhySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="why" className="relative py-20 overflow-hidden" ref={ref}>
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-primary" />
            <span className="text-primary font-medium tracking-wider uppercase text-sm">
              Onze Missie
            </span>
            <div className="h-px w-8 bg-primary" />
          </div>
          
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
            Technologie heeft de kracht om kansen gelijk te maken.
          </h2>
          
          <p className="text-lg text-muted-foreground italic">
            Wij zorgen ervoor dat iedereen een plek aan tafel krijgt.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default WhySection;
