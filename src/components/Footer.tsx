import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-10 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <a href="#" className="flex items-center gap-1">
              <span className="font-display text-lg font-bold text-foreground">Uncode</span>
              <span className="font-display text-lg font-bold text-primary">Society</span>
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm text-muted-foreground"
          >
            © {currentYear} Uncode Society — Een non-profit initiatief
          </motion.p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
