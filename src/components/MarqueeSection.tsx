import { motion } from 'framer-motion';

const MarqueeSection = () => {
  const keywords = [
    'HTML', 'CSS', 'Python', 'Java', 'Free Education', 'Community', 
    'Diversity', 'Inclusion', 'Coding', 'Web Development', 'Programming',
    'Empowerment', 'Future Builders', 'Tech For All',
  ];

  return (
    <section className="py-12 overflow-hidden border-y border-border/30">
      <div className="marquee">
        <div className="marquee-content">
          {[...keywords, ...keywords].map((keyword, index) => (
            <span
              key={index}
              className="mx-8 text-2xl md:text-3xl font-display font-bold text-muted-foreground/30 whitespace-nowrap"
            >
              {keyword}
              <span className="mx-8 text-primary">•</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarqueeSection;
