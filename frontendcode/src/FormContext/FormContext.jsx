import React, { createContext, useState } from 'react';

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
    username: '',
    password: '',
    role: '1',
    department: '',
  });

  const updateFormData = (newData) => {
    setFormData((prevData) => ({ ...prevData, ...newData }));
  };

  const resetFormData = () => {
    setFormData({
      name: '',
      email: '',
      phoneNumber: '',
      address: '',
      username: '',
      password: '',
      role: '1',
      department: '',
    });
  };
  
  return (
    <FormContext.Provider value={{ formData, updateFormData , resetFormData }}>
      {children}
    </FormContext.Provider>
  );
};
