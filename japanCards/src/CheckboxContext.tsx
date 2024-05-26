import React, { createContext, useState, useContext, ReactNode } from 'react';

interface CheckboxContextType {
  checkboxes: { [key: string]: boolean };
  toggleCheckbox: (name: string) => void;
}

const CheckboxContext = createContext<CheckboxContextType | undefined>(undefined);

export const CheckboxProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [checkboxes, setCheckboxes] = useState<{ [key: string]: boolean }>({
    kanji: true,
    hiragana: true,
    NOMI:true,
    AGGETTIVI:true,
    VERBI:true,
    AVVERBI:true,
    SUFFISSI:true,
    ESPRESSIONI:true,
  });

  const toggleCheckbox = (name: string) => {
    setCheckboxes(prev => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <CheckboxContext.Provider value={{ checkboxes, toggleCheckbox }}>
      {children}
    </CheckboxContext.Provider>
  );
};

export const useCheckboxContext = () => {
  const context = useContext(CheckboxContext);
  if (!context) {
    throw new Error('useCheckboxContext must be used within a CheckboxProvider');
  }
  return context;
};
