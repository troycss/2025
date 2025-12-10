import { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import { useFormValidation } from '../hooks/useFormValidation';
import styles from '../styles/components/ContactForm.module.css';

const validationRules = {
  name: (value: string) => {
    if (!value.trim()) return 'Name is required';
    if (value.trim().length < 2) return 'Name must be at least 2 characters';
    return '';
  },
  email: (value: string) => {
    if (!value.trim()) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return 'Please enter a valid email address';
    return '';
  },
  message: (value: string) => {
    if (!value.trim()) return 'Message is required';
    if (value.trim().length < 10) return 'Message must be at least 10 characters';
    return '';
  }
};

export default function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { values, errors, touched, handleChange, handleBlur, handleSubmit, resetForm } = useFormValidation(
    { name: '', email: '', message: '' },
    validationRules
  );

  const onSubmit = () => {
    setIsSubmitted(true);
    setTimeout(() => {
      resetForm();
      setIsSubmitted(false);
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <div className={styles.successMessage}>
        <CheckCircle size={48} className={styles.successIcon} />
        <h3>Thank You!</h3>
        <p>Your message has been sent successfully. I'll get back to you soon.</p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.formGroup}>
        <label htmlFor="name" className={styles.label}>Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`${styles.input} ${touched.name && errors.name ? styles.inputError : ''}`}
          placeholder="Your name"
        />
        {touched.name && errors.name && (
          <span className={styles.errorMessage}>{errors.name}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="email" className={styles.label}>Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`${styles.input} ${touched.email && errors.email ? styles.inputError : ''}`}
          placeholder="your.email@example.com"
        />
        {touched.email && errors.email && (
          <span className={styles.errorMessage}>{errors.email}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="message" className={styles.label}>Message</label>
        <textarea
          id="message"
          name="message"
          value={values.message}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`${styles.textarea} ${touched.message && errors.message ? styles.inputError : ''}`}
          placeholder="Your message..."
          rows={5}
        />
        {touched.message && errors.message && (
          <span className={styles.errorMessage}>{errors.message}</span>
        )}
      </div>

      <button type="submit" className={`btn btn-primary ${styles.submitBtn}`}>
        <Send size={18} />
        <span>Send Message</span>
      </button>
    </form>
  );
}
