import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import lessonsIllustration from '@/assets/lessons-illustration.png';
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
  capacity: number;
  baseDateStr: string;
  dayOfWeek: number; // 0=Sun, 1=Mon, ..., 5=Fri, 6=Sat
}

interface LessonsSectionProps {
  onSignUpClick: (lesson: Lesson) => void;
}

/**
 * Given a base date string (YYYY-MM-DD) and the day-of-week it recurs on,
 * returns the next upcoming occurrence formatted in Dutch.
 * If the base date is still in the future, returns that date.
 * Once passed, advances week by week.
 */
function getNextDate(baseDateStr: string, dayOfWeek: number): string {
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const base = new Date(baseDateStr + 'T00:00:00');
  
  if (base >= now) {
    return formatDutchDate(base);
  }

  // Calculate how many weeks have passed since base
  const diffMs = now.getTime() - base.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const weeksPassed = Math.floor(diffDays / 7);
  
  // Try the date weeksPassed weeks after base
  let next = new Date(base.getTime() + weeksPassed * 7 * 24 * 60 * 60 * 1000);
  if (next < now) {
    next = new Date(next.getTime() + 7 * 24 * 60 * 60 * 1000);
  }

  return formatDutchDate(next);
}

function formatDutchDate(date: Date): string {
  const days = ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'];
  const months = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'];
  return `${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]}`;
}

const lessonDefinitions: Omit<Lesson, 'date'>[] = [
  // Python lessons (Friday — base: 2025-02-14, but user said 13 feb = vrijdag)
  {
    id: '1',
    title: 'Je Eerste Python Programma',
    language: 'Python',
    level: 'Beginner',
    time: '1 uur 30 minuten',
    location: 'Prinsenhof 3, Haarlem',
    spotsLeft: 7,
    capacity: 15,
    baseDateStr: '2026-02-13',
    dayOfWeek: 5, // Friday
  },
  {
    id: '2',
    title: 'Datastructuren in Python',
    language: 'Python',
    level: 'Intermediate',
    time: '1 uur 15 minuten',
    location: 'Prinsenhof 3, Haarlem',
    spotsLeft: 4,
    capacity: 12,
    baseDateStr: '2026-02-13',
    dayOfWeek: 5,
  },
  // Java lessons (Saturday — base: 14 feb)
  {
    id: '3',
    title: 'Object-Georiënteerd Programmeren',
    language: 'Java',
    level: 'Beginner',
    time: '1 uur 30 minuten',
    location: 'Prinsenhof 3, Haarlem',
    spotsLeft: 9,
    capacity: 20,
    baseDateStr: '2026-02-14',
    dayOfWeek: 6, // Saturday
  },
  {
    id: '4',
    title: 'Java Applicatie Ontwikkeling',
    language: 'Java',
    level: 'Intermediate',
    time: '1 uur 15 minuten',
    location: 'Prinsenhof 3, Haarlem',
    spotsLeft: 5,
    capacity: 14,
    baseDateStr: '2026-02-14',
    dayOfWeek: 6,
  },
  // HTML/CSS lessons (Sunday — base: 15 feb)
  {
    id: '5',
    title: 'Introductie Webontwikkeling',
    language: 'HTML/CSS',
    level: 'Beginner',
    time: '1 uur 30 minuten',
    location: 'Prinsenhof 3, Haarlem',
    spotsLeft: 3,
    capacity: 18,
    baseDateStr: '2026-02-15',
    dayOfWeek: 0, // Sunday
  },
  {
    id: '6',
    title: 'Interactieve Websites Bouwen',
    language: 'HTML/CSS',
    level: 'Intermediate',
    time: '1 uur 15 minuten',
    location: 'Prinsenhof 3, Haarlem',
    spotsLeft: 6,
    capacity: 10,
    baseDateStr: '2026-02-15',
    dayOfWeek: 0,
  },
];

// Build lessons with computed dates
export const upcomingLessons: Lesson[] = lessonDefinitions.map((def) => ({
  ...def,
  date: getNextDate(def.baseDateStr, def.dayOfWeek),
}));

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
          className="max-w-2xl mb-16"
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

        {/* Lessons - Left aligned, single column */}
        <div className="flex flex-col gap-4 max-w-2xl">
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
                      <span className="capitalize">{lesson.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-primary" />
                      <span>{lesson.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-primary" />
                      <span>{lesson.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-primary" />
                      <span>{lesson.spotsLeft}/{lesson.capacity} plekken</span>
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

        {/* Notice */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-sm text-muted-foreground mt-10 max-w-2xl"
        >
          * Alle lessen zijn gratis. Deelnemers moeten 14 jaar of ouder zijn. Laptops worden door ons verzorgd in samenwerking met het Stedelijk Gymnasium Haarlem.
        </motion.p>
      </div>
    </section>
  );
};

export default LessonsSection;
export type { Lesson };
