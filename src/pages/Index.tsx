import { useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import OfferingsSection from '@/components/OfferingsSection';
import WhySection from '@/components/WhySection';
import MarqueeSection from '@/components/MarqueeSection';
import LessonsSection from '@/components/LessonsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import SignUpModal from '@/components/SignUpModal';
import type { Lesson } from '@/components/LessonsSection';

const Index = () => {
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  const handleSignUpClick = () => {
    setSelectedLesson(null);
    setIsSignUpModalOpen(true);
  };

  const handleLessonSignUp = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setIsSignUpModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar onSignUpClick={handleSignUpClick} />
      <HeroSection onSignUpClick={handleSignUpClick} />
      <MarqueeSection />
      <AboutSection />
      <OfferingsSection />
      <WhySection />
      <LessonsSection onSignUpClick={handleLessonSignUp} />
      <ContactSection />
      <Footer />
      
      <SignUpModal
        isOpen={isSignUpModalOpen}
        onClose={() => setIsSignUpModalOpen(false)}
        selectedLesson={selectedLesson}
      />
    </div>
  );
};

export default Index;
