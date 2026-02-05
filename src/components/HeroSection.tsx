import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroIllustration from '@/assets/hero-illustration.png';

interface HeroSectionProps {
  onSignUpClick: () => void;
}

const HeroSection = ({ onSignUpClick }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
      {/* Floating decorative elements */}
      <motion.div
        animate={{ y: [0, -30, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-[5%] w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 blur-sm"
      />
      <motion.div
        animate={{ y: [0, 20, 0], rotate: [0, -15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute top-1/3 right-[8%] w-16 h-16 rounded-full bg-gradient-to-br from-secondary/30 to-secondary/10 blur-sm"
      />
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-1/4 left-[15%] w-20 h-20 rounded-3xl bg-gradient-to-br from-accent/20 to-accent/5 blur-sm"
      />

      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative z-10"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8"
            >
              <Sparkles className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium text-muted-foreground">
                100% Free Coding Education
              </span>
            </motion.div>

            {/* Headline */}
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6">
              <span className="text-foreground">Breaking</span>
              <br />
              <span className="text-gradient-primary">Barriers</span>
              <span className="text-foreground">,</span>
              <br />
              <span className="text-foreground">Building </span>
              <span className="text-gradient-secondary">Futures</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-lg mb-10 leading-relaxed">
              Uncode Society empowers underrepresented communities with free programming education. 
              No experience needed—just bring your curiosity.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="hero"
                size="xl"
                onClick={onSignUpClick}
                className="group"
              >
                Start Learning
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outlineGlow"
                size="xl"
                asChild
              >
                <a href="#offerings">Explore Courses</a>
              </Button>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex gap-8 mt-12 pt-8 border-t border-border/50"
            >
              <div>
                <p className="text-3xl font-display font-bold text-gradient-primary">500+</p>
                <p className="text-sm text-muted-foreground">Students Taught</p>
              </div>
              <div>
                <p className="text-3xl font-display font-bold text-gradient-secondary">3</p>
                <p className="text-sm text-muted-foreground">Languages</p>
              </div>
              <div>
                <p className="text-3xl font-display font-bold text-foreground">Free</p>
                <p className="text-sm text-muted-foreground">Always & Forever</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="relative"
          >
            {/* Glow effect behind illustration */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 rounded-full blur-3xl scale-110" />
            
            {/* Main illustration */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="relative z-10"
            >
              <img
                src={heroIllustration}
                alt="Diverse community learning to code together"
                className="w-full h-auto max-w-lg mx-auto"
              />
            </motion.div>

            {/* Floating code badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, type: 'spring' }}
              className="absolute -bottom-4 -left-4 glass-card px-4 py-3 rounded-xl"
            >
              <code className="text-sm font-mono text-primary">
                {'<'}
                <span className="text-secondary">uncode</span>
                {' />'}
              </code>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
