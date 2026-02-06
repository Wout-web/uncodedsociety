import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  onSignUpClick: () => void;
}

const Navbar = ({ onSignUpClick }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-background/80 backdrop-blur-md py-4 shadow-sm'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
          {/* Text Logo */}
          <a href="#" className="flex items-center gap-1">
            <span className="font-display text-2xl md:text-3xl font-bold text-foreground">
              Uncode
            </span>
            <span className="font-display text-2xl md:text-3xl font-bold text-primary">
              Society
            </span>
          </a>

          {/* CTA Button - Desktop */}
          <div className="hidden md:flex items-center gap-4">
            <Button
              variant="hero"
              size="lg"
              onClick={onSignUpClick}
            >
              Gratis Aanmelden
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-md pt-24 md:hidden"
          >
            <nav className="container mx-auto px-6 flex flex-col gap-6 items-center">
              <Button
                variant="hero"
                size="xl"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onSignUpClick();
                }}
              >
                Gratis Aanmelden
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
