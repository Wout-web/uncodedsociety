import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Lesson } from '@/components/LessonsSection';

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedLesson: Lesson | null;
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

const SignUpModal = ({ isOpen, onClose, selectedLesson }: SignUpModalProps) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    age: '',
    email: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full legal name is required';
    }

    const age = parseInt(formData.age);
    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else if (isNaN(age) || age < 14) {
      newErrors.age = 'You must be 14 or older to participate';
    } else if (age > 100) {
      newErrors.age = 'Please enter a valid age';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate sending email notification
    // In production, this would connect to your backend/email service
    await new Promise(resolve => setTimeout(resolve, 1500));

    console.log('Registration submitted:', {
      ...formData,
      lesson: selectedLesson?.title,
      language: selectedLesson?.language,
      level: selectedLesson?.level,
    });

    setIsSubmitting(false);
    setIsSuccess(true);

    // Reset after showing success
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({ fullName: '', age: '', email: '' });
      onClose();
    }, 2500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-lg glass-card rounded-3xl p-8 lg:p-10 shadow-2xl">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>

              {isSuccess ? (
                /* Success State */
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
                  <h3 className="font-display text-2xl font-bold mb-2">You're Signed Up!</h3>
                  <p className="text-muted-foreground">
                    We've received your registration. Check your email for confirmation details.
                  </p>
                </motion.div>
              ) : (
                /* Form */
                <>
                  <div className="mb-8">
                    <h3 className="font-display text-2xl font-bold mb-2">Sign Up for Class</h3>
                    {selectedLesson && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary border border-primary/30">
                          {selectedLesson.language}
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-secondary/20 text-secondary border border-secondary/30">
                          {selectedLesson.level}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {selectedLesson.title}
                        </span>
                      </div>
                    )}
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Full Legal Name */}
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-muted-foreground mb-2">
                        Full Legal Name *
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl bg-muted/50 border ${
                          errors.fullName ? 'border-destructive' : 'border-border'
                        } focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-foreground placeholder:text-muted-foreground/50`}
                        placeholder="Your full legal name"
                      />
                      {errors.fullName && (
                        <p className="mt-2 text-sm text-destructive flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    {/* Age */}
                    <div>
                      <label htmlFor="age" className="block text-sm font-medium text-muted-foreground mb-2">
                        Age *
                      </label>
                      <input
                        type="number"
                        id="age"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        min="1"
                        max="100"
                        className={`w-full px-4 py-3 rounded-xl bg-muted/50 border ${
                          errors.age ? 'border-destructive' : 'border-border'
                        } focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-foreground placeholder:text-muted-foreground/50`}
                        placeholder="Your age"
                      />
                      {errors.age && (
                        <p className="mt-2 text-sm text-destructive flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.age}
                        </p>
                      )}
                      <p className="mt-1 text-xs text-muted-foreground">
                        Participants must be 14 years or older
                      </p>
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl bg-muted/50 border ${
                          errors.email ? 'border-destructive' : 'border-border'
                        } focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-foreground placeholder:text-muted-foreground/50`}
                        placeholder="your@email.com"
                      />
                      {errors.email && (
                        <p className="mt-2 text-sm text-destructive flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      variant="hero"
                      size="lg"
                      className="w-full mt-6"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                          />
                          Signing Up...
                        </span>
                      ) : (
                        <>
                          Complete Registration
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center mt-4">
                      By signing up, you agree to receive updates about this lesson.
                      Your information will only be used to contact you about this registration.
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
