import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
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

const LessonsSection = ({ onSignUpClick }: LessonsSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Placeholder lessons - these can be edited later
  const upcomingLessons: Lesson[] = [
    {
      id: '1',
      title: 'Introduction to Web Development',
      language: 'HTML/CSS',
      level: 'Beginner',
      date: '', // To be filled in
      time: '', // To be filled in
      location: '', // To be filled in
      spotsLeft: 15,
    },
    {
      id: '2',
      title: 'Your First Python Program',
      language: 'Python',
      level: 'Beginner',
      date: '', // To be filled in
      time: '', // To be filled in
      location: '', // To be filled in
      spotsLeft: 12,
    },
    {
      id: '3',
      title: 'Building Interactive Websites',
      language: 'HTML/CSS',
      level: 'Intermediate',
      date: '', // To be filled in
      time: '', // To be filled in
      location: '', // To be filled in
      spotsLeft: 10,
    },
    {
      id: '4',
      title: 'Object-Oriented Programming',
      language: 'Java',
      level: 'Beginner',
      date: '', // To be filled in
      time: '', // To be filled in
      location: '', // To be filled in
      spotsLeft: 14,
    },
    {
      id: '5',
      title: 'Data Structures in Python',
      language: 'Python',
      level: 'Intermediate',
      date: '', // To be filled in
      time: '', // To be filled in
      location: '', // To be filled in
      spotsLeft: 8,
    },
    {
      id: '6',
      title: 'Java Application Development',
      language: 'Java',
      level: 'Intermediate',
      date: '', // To be filled in
      time: '', // To be filled in
      location: '', // To be filled in
      spotsLeft: 11,
    },
  ];

  const getLanguageColor = (language: string) => {
    switch (language) {
      case 'HTML/CSS':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'Python':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Java':
        return 'bg-primary/20 text-primary border-primary/30';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getLevelColor = (level: string) => {
    return level === 'Beginner'
      ? 'bg-green-500/20 text-green-400 border-green-500/30'
      : 'bg-secondary/20 text-secondary border-secondary/30';
  };

  return (
    <section id="lessons" className="relative py-32 overflow-hidden" ref={ref}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,hsl(var(--primary)/0.15)_1px,transparent_1px)] bg-[length:40px_40px]" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-primary" />
            <span className="text-primary font-semibold tracking-wider uppercase text-sm">
              Upcoming Lessons
            </span>
            <div className="h-px w-12 bg-primary" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Start Your
            <br />
            <span className="text-gradient-secondary">Journey Now</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Sign up for any of our upcoming sessions. Limited spots available!
          </p>
        </motion.div>

        {/* Lessons Grid - Asymmetric masonry-like layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingLessons.map((lesson, index) => (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`glass-card rounded-3xl p-6 flex flex-col ${
                index === 0 || index === 4 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getLanguageColor(lesson.language)}`}>
                  {lesson.language}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getLevelColor(lesson.level)}`}>
                  {lesson.level}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-display text-xl font-bold text-foreground mb-4">
                {lesson.title}
              </h3>

              {/* Details */}
              <div className="space-y-3 mb-6 flex-grow">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>{lesson.date || 'Date TBA'}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>{lesson.time || 'Time TBA'}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>{lesson.location || 'Location TBA'}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Users className="w-4 h-4 text-secondary" />
                  <span className="text-secondary font-medium">{lesson.spotsLeft} spots left</span>
                </div>
              </div>

              {/* CTA */}
              <Button
                variant="hero"
                size="lg"
                onClick={() => onSignUpClick(lesson)}
                className="w-full"
              >
                Sign Up
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Age requirement notice */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center text-sm text-muted-foreground mt-10"
        >
          * All lessons are free of charge. Participants must be 14 years or older.
        </motion.p>
      </div>
    </section>
  );
};

export default LessonsSection;
export type { Lesson };
