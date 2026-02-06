import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, AlertCircle, CheckCircle, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Lesson } from '@/components/LessonsSection';
import { upcomingLessons } from '@/components/LessonsSection';
import { supabase } from '@/integrations/supabase/client';

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedLesson: Lesson | null;
  onSelectLesson: (lesson: Lesson) => void;
}

interface FormData {
  fullName: string;
  age: string;
  email: string;
}

interface FormErrors {
  fullName?: string;
  age?: string;
  email?: string;
}

const SignUpModal = ({ isOpen, onClose, selectedLesson, onSelectLesson }: SignUpModalProps) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    age: '',
    email: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const showLessonPicker = !selectedLesson;

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Volledige naam is verplicht';
    } else if (formData.fullName.trim().length > 100) {
      newErrors.fullName = 'Naam mag maximaal 100 tekens zijn';
    }

    const age = parseInt(formData.age);
    if (!formData.age) {
      newErrors.age = 'Leeftijd is verplicht';
    } else if (isNaN(age) || age < 14) {
      newErrors.age = 'Je moet 14 jaar of ouder zijn om deel te nemen';
    } else if (age > 100) {
      newErrors.age = 'Voer een geldige leeftijd in';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'E-mailadres is verplicht';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Voer een geldig e-mailadres in';
    } else if (formData.email.trim().length > 255) {
      newErrors.email = 'E-mailadres is te lang';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || !selectedLesson) return;

    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke('send-registration-email', {
        body: {
          fullName: formData.fullName.trim(),
          age: parseInt(formData.age),
          email: formData.email.trim(),
          lessonTitle: selectedLesson.title,
          lessonLanguage: selectedLesson.language,
          lessonLevel: selectedLesson.level,
        },
      });

      if (error) throw error;

      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({ fullName: '', age: '', email: '' });
        onClose();
      }, 2500);
    } catch (err) {
      console.error('Registration error:', err);
      setErrors({ email: 'Er is iets misgegaan. Probeer het opnieuw.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleClose = () => {
    setFormData({ fullName: '', age: '', email: '' });
    setErrors({});
    setIsSuccess(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 bg-foreground/30 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-md bg-foreground rounded-3xl p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-5 right-5 p-2 rounded-full hover:bg-background/10 transition-colors"
              >
                <X className="w-5 h-5 text-background/70" />
              </button>

              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.1 }}
                    className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center"
                  >
                    <CheckCircle className="w-10 h-10 text-primary" />
                  </motion.div>
                  <h3 className="font-display text-2xl font-bold text-background mb-2">
                    Je Bent Aangemeld!
                  </h3>
                  <p className="text-background/60">
                    We hebben je registratie ontvangen.
                  </p>
                </motion.div>
              ) : showLessonPicker ? (
                /* Step 1: Pick a lesson */
                <div>
                  <h3 className="font-display text-2xl font-bold text-background mb-2">
                    Kies een Les
                  </h3>
                  <p className="text-background/50 text-sm mb-6">
                    Selecteer de les waarvoor je je wilt aanmelden.
                  </p>

                  <div className="space-y-3 max-h-[55vh] overflow-y-auto pr-1">
                    {upcomingLessons.map((lesson) => (
                      <button
                        key={lesson.id}
                        onClick={() => onSelectLesson(lesson)}
                        className="w-full text-left p-4 rounded-2xl border border-background/10 hover:border-primary/50 hover:bg-background/5 transition-all duration-200 group"
                      >
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/20 text-primary">
                            {lesson.language}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-medium border border-background/20 text-background/50">
                            {lesson.level}
                          </span>
                        </div>
                        <p className="font-semibold text-background group-hover:text-primary transition-colors">
                          {lesson.title}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                /* Step 2: Fill in details */
                <>
                  <div className="mb-6">
                    <button
                      onClick={() => { handleClose(); }}
                      className="flex items-center gap-1 text-sm text-background/50 hover:text-primary transition-colors mb-4"
                      type="button"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Andere les kiezen
                    </button>
                    <h3 className="font-display text-2xl font-bold text-background mb-1">
                      Aanmelden
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary">
                        {selectedLesson.language}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-medium border border-background/20 text-background/50">
                        {selectedLesson.level}
                      </span>
                      <span className="text-sm text-background/60">
                        {selectedLesson.title}
                      </span>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Full Name */}
                    <div>
                      <label className="block text-sm font-medium text-background/70 mb-2">
                        Volledige Naam
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className={`w-full px-4 py-3.5 rounded-2xl bg-background/5 border ${
                          errors.fullName ? 'border-destructive' : 'border-background/10'
                        } focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-background placeholder:text-background/30`}
                        placeholder="Je volledige naam"
                      />
                      {errors.fullName && (
                        <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    {/* Age */}
                    <div>
                      <label className="block text-sm font-medium text-background/70 mb-2">
                        Leeftijd
                      </label>
                      <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        min="1"
                        max="100"
                        className={`w-full px-4 py-3.5 rounded-2xl bg-background/5 border ${
                          errors.age ? 'border-destructive' : 'border-background/10'
                        } focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-background placeholder:text-background/30`}
                        placeholder="Je leeftijd"
                      />
                      {errors.age && (
                        <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.age}
                        </p>
                      )}
                      <p className="mt-1 text-xs text-background/30">
                        Deelnemers moeten 14 jaar of ouder zijn
                      </p>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-background/70 mb-2">
                        E-mailadres
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3.5 rounded-2xl bg-background/5 border ${
                          errors.email ? 'border-destructive' : 'border-background/10'
                        } focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-background placeholder:text-background/30`}
                        placeholder="je@email.com"
                      />
                      {errors.email && (
                        <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full mt-6 h-14 text-base rounded-2xl"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                          />
                          Aanmelden...
                        </span>
                      ) : (
                        <>
                          Registratie Voltooien
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-background/30 text-center mt-4">
                      Door je aan te melden ga je akkoord met het ontvangen van updates over deze les.
                    </p>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SignUpModal;
