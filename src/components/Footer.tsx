import { motion } from 'framer-motion';
import logo from '@/assets/logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-16 border-t border-border/50">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-3 gap-12 items-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <img src={logo} alt="Uncode Society" className="h-8 w-auto mb-4" />
            <p className="text-sm text-muted-foreground max-w-xs">
              Empowering underrepresented communities through free coding education.
            </p>
          </motion.div>

          {/* Links */}
          <motion.nav
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap gap-x-8 gap-y-3 justify-center"
          >
            {['About', 'Offerings', 'Our Why', 'Lessons', 'Contact'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(' ', '-')}`}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link}
              </a>
            ))}
          </motion.nav>

          {/* Social & Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-right"
          >
            <p className="text-sm text-muted-foreground">
              © {currentYear} Uncode Society
            </p>
            <p className="text-xs text-muted-foreground/60 mt-1">
              A nonprofit initiative
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
