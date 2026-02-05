import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Users, Rocket, Heart, Lightbulb, GraduationCap } from 'lucide-react';
import htmlCssIllustration from '@/assets/html-css-illustration.png';
import pythonIllustration from '@/assets/python-illustration.png';
import javaIllustration from '@/assets/java-illustration.png';

const OfferingsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const courses = [
    {
      title: 'HTML & CSS',
      description: 'Build beautiful websites from scratch. Learn the foundations of web development.',
      image: htmlCssIllustration,
      levels: ['Beginner', 'Intermediate'],
      color: 'from-orange-500/20 to-red-500/20',
      borderColor: 'border-orange-500/30',
    },
    {
      title: 'Python',
      description: 'The perfect first programming language. Create games, automate tasks, and more.',
      image: pythonIllustration,
      levels: ['Beginner', 'Intermediate'],
      color: 'from-blue-500/20 to-cyan-500/20',
      borderColor: 'border-blue-500/30',
    },
    {
      title: 'Java',
      description: 'Industry-standard language for apps and enterprise. Build powerful applications.',
      image: javaIllustration,
      levels: ['Beginner', 'Intermediate'],
      color: 'from-primary/20 to-violet-500/20',
      borderColor: 'border-primary/30',
    },
  ];

  const features = [
    { icon: Users, title: 'Small Groups', desc: 'Personal attention in every class' },
    { icon: GraduationCap, title: 'Expert Mentors', desc: 'Learn from real developers' },
    { icon: Rocket, title: 'Project-Based', desc: 'Build real things, not just theory' },
    { icon: Heart, title: 'Supportive', desc: 'A safe space to learn and grow' },
    { icon: Lightbulb, title: 'Practical Skills', desc: 'Skills you can use immediately' },
    { icon: Code2, title: 'All Levels', desc: 'Beginner to intermediate tracks' },
  ];

  return (
    <section id="offerings" className="relative py-32 overflow-hidden" ref={ref}>
      {/* Diagonal cut background */}
      <div className="absolute inset-0 diagonal-cut bg-gradient-to-br from-card/80 to-card/40" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-primary" />
            <span className="text-primary font-semibold tracking-wider uppercase text-sm">
              What We Offer
            </span>
            <div className="h-px w-12 bg-primary" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Three Paths to
            <br />
            <span className="text-gradient-secondary">Your Future</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Choose your coding journey. Each course is designed to take you from 
            complete beginner to confident programmer.
          </p>
        </motion.div>

        {/* Course Cards - Bento Style */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {courses.map((course, index) => (
            <motion.div
              key={course.title}
              initial={{ opacity: 0, y: 60, rotate: index === 1 ? 0 : (index === 0 ? -2 : 2) }}
              animate={isInView ? { opacity: 1, y: 0, rotate: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className={`relative glass-card rounded-3xl overflow-hidden border ${course.borderColor} group`}
            >
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${course.color} opacity-50`} />
              
              {/* Content */}
              <div className="relative z-10 p-8">
                {/* Image */}
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <motion.img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-contain"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: index * 0.5 }}
                  />
                </div>

                {/* Text */}
                <h3 className="font-display text-2xl font-bold text-center mb-3">
                  {course.title}
                </h3>
                <p className="text-muted-foreground text-center text-sm mb-6">
                  {course.description}
                </p>

                {/* Level badges */}
                <div className="flex justify-center gap-2">
                  {course.levels.map((level) => (
                    <span
                      key={level}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground"
                    >
                      {level}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hover glow effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-primary/10 via-transparent to-transparent" />
            </motion.div>
          ))}
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.6 + index * 0.08 }}
              className="glass-card rounded-2xl p-6 text-center hover:border-primary/30 transition-colors"
            >
              <feature.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
              <p className="font-semibold text-sm text-foreground">{feature.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default OfferingsSection;
