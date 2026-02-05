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
    // Placeholder for form submission
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="relative py-32 overflow-hidden" ref={ref}>
      {/* Diagonal background */}
      <div className="absolute inset-0 diagonal-cut-reverse bg-gradient-to-br from-card to-muted/50" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-12 bg-secondary" />
              <span className="text-secondary font-semibold tracking-wider uppercase text-sm">
                Get In Touch
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
              Let's
              <br />
              <span className="text-gradient-primary">Connect</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-md">
              Have questions about our programs? Want to volunteer or partner with us? 
              We'd love to hear from you.
            </p>

            {/* Contact Methods */}
            <div className="space-y-6">
              <motion.a
                href="mailto:info@uncodesociety.org"
                className="flex items-center gap-4 group"
                whileHover={{ x: 10 }}
              >
                <div className="w-12 h-12 rounded-2xl glass-card flex items-center justify-center group-hover:border-primary/50 transition-colors">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email us</p>
                  <p className="text-foreground font-medium">{/* Email to be filled */}info@uncodesociety.org</p>
                </div>
              </motion.a>

              <motion.a
                href="https://instagram.com/uncodesociety"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
                whileHover={{ x: 10 }}
              >
                <div className="w-12 h-12 rounded-2xl glass-card flex items-center justify-center group-hover:border-secondary/50 transition-colors">
                  <Instagram className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Follow us</p>
                  <p className="text-foreground font-medium">@uncodesociety</p>
                </div>
              </motion.a>

              <motion.div
                className="flex items-center gap-4"
                whileHover={{ x: 10 }}
              >
                <div className="w-12 h-12 rounded-2xl glass-card flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Based in</p>
                  <p className="text-foreground font-medium">{/* Location to be filled */}Your City</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="glass-card rounded-3xl p-8 lg:p-10">
              <h3 className="font-display text-2xl font-bold mb-6">Send us a message</h3>
              
              <div className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-foreground placeholder:text-muted-foreground/50"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-foreground placeholder:text-muted-foreground/50"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-foreground placeholder:text-muted-foreground/50 resize-none"
                    placeholder="How can we help you?"
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
                      Message Sent!
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
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
