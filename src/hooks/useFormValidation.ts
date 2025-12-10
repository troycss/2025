import { useState } from 'react';

export interface FormValues {
  [key: string]: string;
}

export interface FormErrors {
  [key: string]: string;
}

export interface FormTouched {
  [key: string]: boolean;
}

export interface ValidationRules {
  [key: string]: (value: string) => string;
}

export interface UseFormValidationReturn {
  values: FormValues;
  errors: FormErrors;
  touched: FormTouched;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (onSubmit: (values: FormValues) => void) => (e: React.FormEvent) => void;
  resetForm: () => void;
  isValid: boolean;
}

export function useFormValidation(
  initialValues: FormValues,
  validationRules: ValidationRules
): UseFormValidationReturn {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<FormTouched>({});

  const validateField = (name: string, value: string): string => {
    if (validationRules[name]) {
      return validationRules[name](value);
    }
    return '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (onSubmit: (values: FormValues) => void) => (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: FormErrors = {};
    const newTouched: FormTouched = {};

    Object.keys(values).forEach((key) => {
      newTouched[key] = true;
      const error = validateField(key, values[key]);
      if (error) {
        newErrors[key] = error;
      }
    });

    setTouched(newTouched);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmit(values);
    }
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  const isValid = Object.keys(errors).length === 0 && Object.keys(touched).length > 0;

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    isValid
  };
}
