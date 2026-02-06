import { useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import OfferingsSection from '@/components/OfferingsSection';
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
    <div className="min-h-screen">
      <Navbar onSignUpClick={handleSignUpClick} />
      <HeroSection onSignUpClick={handleSignUpClick} />
      <AboutSection />
      <OfferingsSection />
      <LessonsSection onSignUpClick={handleLessonSignUp} />
      <ContactSection />
      <Footer />
      
      <SignUpModal
        isOpen={isSignUpModalOpen}
        onClose={() => setIsSignUpModalOpen(false)}
        selectedLesson={selectedLesson}
        onSelectLesson={setSelectedLesson}
      />
    </div>
  );
};

export default Index;
