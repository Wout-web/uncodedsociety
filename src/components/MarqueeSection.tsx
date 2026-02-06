import { motion } from 'framer-motion';

const MarqueeSection = () => {
  const keywords = [
    'HTML', 'CSS', 'Python', 'Java', 'Gratis Onderwijs', 'Community', 
    'Programmeren', 'Webontwikkeling', 'Toekomst', 'Inclusie',
  ];

  return (
    <section className="py-8 overflow-hidden border-y border-border/50">
      <div className="marquee">
        <div className="marquee-content">
          {[...keywords, ...keywords].map((keyword, index) => (
            <span
              key={index}
              className="mx-8 text-xl md:text-2xl font-display font-semibold text-muted-foreground/20 whitespace-nowrap"
            >
              {keyword}
              <span className="mx-8 text-primary/30">•</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarqueeSection;
