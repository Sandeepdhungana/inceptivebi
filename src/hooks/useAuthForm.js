
import { useState } from 'react';
import { zodSchemaForLogin, zodSchemaForSignup } from '../schemas/validationSchemas';

export const useAuthForm = (isLogin = true) => {
  const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  const schema = isLogin ? zodSchemaForLogin : zodSchemaForSignup;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = schema.safeParse(formData);
    if (!validation.success) {
      setErrors(validation.error.formErrors.fieldErrors);
    } else {
      setErrors({});
    
    }
  };

  return {
    formData,
    errors,
    handleInputChange,
    handleSubmit,
  };
};
