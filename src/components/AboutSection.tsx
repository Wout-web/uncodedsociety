import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import communityIllustration from '@/assets/community-illustration.png';

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="relative py-32 overflow-hidden" ref={ref}>
      {/* Asymmetric background shape */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-0 right-0 w-[60%] h-full bg-gradient-to-l from-primary/5 to-transparent"
          style={{ clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0% 100%)' }}
        />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left - Illustration (takes more space asymmetrically) */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-5 relative"
          >
            <div className="relative">
              {/* Decorative ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-8 border-2 border-dashed border-primary/20 rounded-full"
              />
              
              <motion.img
                src={communityIllustration}
                alt="Connected community of learners"
                className="relative z-10 w-full max-w-md mx-auto"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="lg:col-span-7"
          >
            {/* Section label */}
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-12 bg-secondary" />
              <span className="text-secondary font-semibold tracking-wider uppercase text-sm">
                Who We Are
              </span>
            </div>

            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
              Coding Education
              <br />
              <span className="text-gradient-primary">For Everyone</span>
            </h2>

            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                <span className="text-foreground font-semibold">Uncode Society</span> is a nonprofit 
                initiative dedicated to making programming education accessible to all. We believe 
                that your background shouldn't determine your future in tech.
              </p>
              <p>
                Our mission is simple: provide <span className="text-primary font-medium">free, 
                high-quality coding lessons</span> to young people aged 14 and above from 
                underrepresented communities. No prior experience required.
              </p>
              <p>
                Whether you've never written a line of code or want to level up your skills, 
                there's a place for you in our community.
              </p>
            </div>

            {/* Key points */}
            <div className="grid sm:grid-cols-2 gap-6 mt-10">
              {[
                { title: 'Beginner Friendly', desc: 'Start from zero, no experience needed' },
                { title: 'Ages 14+', desc: 'Designed for young learners' },
                { title: 'In-Person', desc: 'Real connections, real learning' },
                { title: 'Completely Free', desc: 'No hidden costs, ever' },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
