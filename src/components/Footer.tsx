import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 border-t border-border">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <a href="#" className="flex items-center gap-1">
              <span className="font-display text-xl font-bold text-foreground">
                Uncode
              </span>
              <span className="font-display text-xl font-bold text-primary">
                Society
              </span>
            </a>
            <p className="text-sm text-muted-foreground mt-2">
              Gratis programmeeronderwijs voor iedereen.
            </p>
          </motion.div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-center md:text-right"
          >
            <p className="text-sm text-muted-foreground">
              © {currentYear} Uncode Society
            </p>
            <p className="text-xs text-muted-foreground/60 mt-1">
              Een non-profit initiatief
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
