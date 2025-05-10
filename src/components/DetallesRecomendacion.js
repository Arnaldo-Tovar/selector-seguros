import React from 'react';

const DetallesRecomendacion = ({ recomendacionDetallada }) => {
  const { principal, secundaria } = recomendacionDetallada;

  return (
    <div className="mt-4">
      <h3 className="font-bold text-gray-700 mb-2">Detalles de la recomendación:</h3>
      
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-blue-800">Producto Principal: {principal.producto}</h4>
          <ul className="list-disc list-inside mt-1 space-y-1">
            {principal.razones.map((razon, index) => (
              <li key={index} className="text-gray-600">{razon}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-blue-800">Producto Secundario: {secundaria.producto}</h4>
          <ul className="list-disc list-inside mt-1 space-y-1">
            {secundaria.razones.map((razon, index) => (
              <li key={index} className="text-gray-600">{razon}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DetallesRecomendacion; 