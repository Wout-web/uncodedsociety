import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, Instagram, MapPin, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="relative py-24 overflow-hidden" ref={ref}>
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-start max-w-5xl mx-auto">
          {/* Left - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-primary" />
              <span className="text-primary font-medium tracking-wider uppercase text-sm">
                Contact
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-8">
              Neem
              <br />
              <span className="italic text-primary">Contact Op</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-md">
              Heb je vragen over onze programma's? Wil je vrijwilliger worden of samenwerken? 
              We horen graag van je.
            </p>

            {/* Contact Methods */}
            <div className="space-y-6">
              <motion.a
                href="mailto:info@uncodesociety.org"
                className="flex items-center gap-4 group"
                whileHover={{ x: 8 }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">E-mail</p>
                  <p className="text-foreground font-medium">info@uncodesociety.org</p>
                </div>
              </motion.a>

              <motion.a
                href="https://instagram.com/uncodesociety"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
                whileHover={{ x: 8 }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Instagram className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Instagram</p>
                  <p className="text-foreground font-medium">@uncodesociety</p>
                </div>
              </motion.a>

              <motion.div
                className="flex items-center gap-4"
                whileHover={{ x: 8 }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Locatie</p>
                  <p className="text-foreground font-medium">Nederland</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-8 border border-border">
              <h3 className="font-display text-xl font-bold mb-6">Stuur ons een bericht</h3>
              
              <div className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-2">
                    Naam
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-foreground placeholder:text-muted-foreground/50"
                    placeholder="Je naam"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-2">
                    E-mailadres
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-foreground placeholder:text-muted-foreground/50"
                    placeholder="je@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-2">
                    Bericht
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-foreground placeholder:text-muted-foreground/50 resize-none"
                    placeholder="Hoe kunnen we je helpen?"
                  />
                </div>

                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full"
                  disabled={submitted}
                >
                  {submitted ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Bericht Verzonden!
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Verstuur Bericht
                    </>
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
