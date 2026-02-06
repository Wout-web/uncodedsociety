import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Lesson {
  id: string;
  title: string;
  language: 'HTML/CSS' | 'Python' | 'Java';
  level: 'Beginner' | 'Intermediate';
  date: string;
  time: string;
  location: string;
  spotsLeft: number;
}

interface LessonsSectionProps {
  onSignUpClick: (lesson: Lesson) => void;
}

export const upcomingLessons: Lesson[] = [
  {
    id: '1',
    title: 'Introductie Webontwikkeling',
    language: 'HTML/CSS',
    level: 'Beginner',
    date: '',
    time: '',
    location: '',
    spotsLeft: 15,
  },
  {
    id: '2',
    title: 'Je Eerste Python Programma',
    language: 'Python',
    level: 'Beginner',
    date: '',
    time: '',
    location: '',
    spotsLeft: 12,
  },
  {
    id: '3',
    title: 'Interactieve Websites Bouwen',
    language: 'HTML/CSS',
    level: 'Intermediate',
    date: '',
    time: '',
    location: '',
    spotsLeft: 10,
  },
  {
    id: '4',
    title: 'Object-Georiënteerd Programmeren',
    language: 'Java',
    level: 'Beginner',
    date: '',
    time: '',
    location: '',
    spotsLeft: 14,
  },
  {
    id: '5',
    title: 'Datastructuren in Python',
    language: 'Python',
    level: 'Intermediate',
    date: '',
    time: '',
    location: '',
    spotsLeft: 8,
  },
  {
    id: '6',
    title: 'Java Applicatie Ontwikkeling',
    language: 'Java',
    level: 'Intermediate',
    date: '',
    time: '',
    location: '',
    spotsLeft: 11,
  },
];

const LessonsSection = ({ onSignUpClick }: LessonsSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="lessen" className="relative py-24 overflow-hidden" ref={ref}>
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
              Aankomende Lessen
            </span>
            <div className="h-px w-8 bg-primary" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Begin Jouw
            <br />
            <span className="italic text-primary">Reis Nu</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Meld je aan voor een van onze sessies. Beperkt aantal plekken beschikbaar!
          </p>
        </motion.div>

        {/* Lessons - Single column stacked */}
        <div className="flex flex-col gap-4 max-w-2xl mx-auto">
          {upcomingLessons.map((lesson, index) => (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="group bg-card rounded-2xl p-5 sm:p-6 border border-border hover:border-primary/30 hover:shadow-[0_8px_40px_hsla(199,89%,48%,0.1)] transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1 min-w-0">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      {lesson.language}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium border border-border text-muted-foreground">
                      {lesson.level}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-lg font-bold text-foreground mb-2">
                    {lesson.title}
                  </h3>

                  {/* Details */}
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-primary" />
                      <span>{lesson.date || 'Datum volgt'}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-primary" />
                      <span>{lesson.time || 'Tijd volgt'}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-primary" />
                      <span>{lesson.location || 'Locatie volgt'}</span>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <Button
                  variant="hero"
                  size="lg"
                  onClick={() => onSignUpClick(lesson)}
                  className="sm:w-auto w-full shrink-0"
                >
                  Aanmelden
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Age requirement notice */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center text-sm text-muted-foreground mt-10"
        >
          * Alle lessen zijn gratis. Deelnemers moeten 14 jaar of ouder zijn.
        </motion.p>
      </div>
    </section>
  );
};

export default LessonsSection;
export type { Lesson };
