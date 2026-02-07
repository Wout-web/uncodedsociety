import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  onSignUpClick: () => void;
}

const HeroSection = ({ onSignUpClick }: HeroSectionProps) => {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-16 overflow-hidden">
      {/* Subtle floating shapes */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 right-[10%] w-64 h-64 rounded-full bg-primary/5 blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-1/4 left-[5%] w-48 h-48 rounded-full bg-primary/8 blur-3xl"
      />

      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl">
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6"
          >
            <span className="text-foreground">Barrières </span>
            <span className="italic text-primary">Doorbreken</span>
            <span className="text-foreground">,</span>
            <br />
            <span className="text-foreground">Toekomsten </span>
            <span className="italic text-primary">Bouwen</span>
            <span className="text-foreground">.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed"
          >
            Uncoded Society biedt gratis programmeeronderwijs aan ondervertegenwoordigde gemeenschappen. 
            Geen ervaring nodig—breng alleen je nieuwsgierigheid mee.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              variant="hero"
              size="xl"
              onClick={onSignUpClick}
              className="group"
            >
              Gratis Aanmelden
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outlineGlow"
              size="xl"
              asChild
            >
              <a href="#lessen">Bekijk Lessen</a>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex gap-8 sm:gap-12 mt-12 sm:mt-16 pt-8 border-t border-border/50"
          >
            <div>
              <p className="text-3xl sm:text-4xl font-display font-bold text-foreground">500+</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Studenten</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-display font-bold text-foreground">3</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Talen</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-display font-bold text-primary">Gratis</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Altijd & Voor Altijd</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
