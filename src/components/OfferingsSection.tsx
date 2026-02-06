import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Terminal, Coffee } from 'lucide-react';

const OfferingsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const courses = [
    {
      title: 'HTML & CSS',
      description: 'Bouw mooie websites vanaf nul. Leer de basis van webontwikkeling.',
      icon: Code2,
      levels: ['Beginner', 'Intermediate'],
    },
    {
      title: 'Python',
      description: 'De perfecte eerste programmeertaal. Maak games, automatiseer taken en meer.',
      icon: Terminal,
      levels: ['Beginner', 'Intermediate'],
    },
    {
      title: 'Java',
      description: 'Industriestandaard taal voor apps en enterprise. Bouw krachtige applicaties.',
      icon: Coffee,
      levels: ['Beginner', 'Intermediate'],
    },
  ];

  return (
    <section id="offerings" className="relative py-24 overflow-hidden" ref={ref}>
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-primary" />
            <span className="text-primary font-medium tracking-wider uppercase text-sm">
              Wat We Bieden
            </span>
            <div className="h-px w-8 bg-primary" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Drie Paden Naar
            <br />
            <span className="italic text-primary">Jouw Toekomst</span>
          </h2>
        </motion.div>

        {/* Course Cards - Clean minimal style */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {courses.map((course, index) => (
            <motion.div
              key={course.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-card rounded-2xl p-8 border border-border hover:border-primary/30 hover:shadow-[0_8px_40px_hsla(199,89%,48%,0.12)] transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <course.icon className="w-6 h-6 text-primary" />
              </div>

              {/* Text */}
              <h3 className="font-display text-2xl font-bold mb-3">
                {course.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                {course.description}
              </p>

              {/* Level badges */}
              <div className="flex gap-2">
                {course.levels.map((level) => (
                  <span
                    key={level}
                    className="px-3 py-1 rounded-full text-xs font-medium border border-border text-muted-foreground"
                  >
                    {level}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OfferingsSection;
