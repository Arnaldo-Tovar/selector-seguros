import React from 'react';

const AlertaRetiro = ({ añosHastaRetiro }) => {
  return (
    <div className="mt-2 bg-blue-100 p-2 rounded border border-blue-200">
      <p className="font-medium text-blue-800">
        {añosHastaRetiro > 0 
          ? `Planificación para retiro: ${añosHastaRetiro} años hasta la edad tradicional de retiro.` 
          : `Ya se encuentra en edad de retiro o cerca de ella.`}
      </p>
    </div>
  );
};

export default AlertaRetiro; 