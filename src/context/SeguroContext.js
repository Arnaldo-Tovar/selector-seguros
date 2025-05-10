import React, { createContext, useContext, useState } from 'react';

const SeguroContext = createContext();

export const useSeguroContext = () => useContext(SeguroContext);

export const SeguroProvider = ({ children }) => {
  const [historico, setHistorico] = useState([]);

  const guardarHistorico = (data) => {
    setHistorico([...historico, { ...data, fecha: new Date() }]);
  };

  return (
    <SeguroContext.Provider value={{ historico, guardarHistorico }}>
      {children}
    </SeguroContext.Provider>
  );
}; 