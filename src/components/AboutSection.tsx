import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="relative py-24 overflow-hidden" ref={ref}>
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mx-auto text-center">
          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-3 mb-8"
          >
            <div className="h-px w-8 bg-primary" />
            <span className="text-primary font-medium tracking-wider uppercase text-sm">
              Wie Wij Zijn
            </span>
            <div className="h-px w-8 bg-primary" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-5xl font-bold mb-8 leading-tight"
          >
            Programmeeronderwijs
            <br />
            <span className="italic text-primary">Voor Iedereen</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="space-y-6 text-lg text-muted-foreground leading-relaxed"
          >
            <p>
              <span className="text-foreground font-semibold">Uncode Society</span> is een non-profit 
              initiatief dat zich inzet om programmeeronderwijs toegankelijk te maken voor iedereen. 
              Wij geloven dat je achtergrond niet je toekomst in tech mag bepalen.
            </p>
            <p>
              Onze missie is simpel: gratis, hoogwaardig programmeeronderwijs bieden aan jongeren 
              van 14 jaar en ouder uit ondervertegenwoordigde gemeenschappen.
            </p>
          </motion.div>

          {/* Key points - Minimalist */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-6 mt-12"
          >
            {[
              'Beginnersvriendelijk',
              '14+ jaar',
              'Persoonlijk',
              'Volledig Gratis',
            ].map((item) => (
              <span
                key={item}
                className="px-4 py-2 rounded-full border border-border text-sm font-medium text-foreground hover:border-primary hover:text-primary transition-colors"
              >
                {item}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
