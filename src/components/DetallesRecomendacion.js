import React from 'react';

const DetallesRecomendacion = ({ recomendacionDetallada }) => (
  <div>
    <h3 className="font-bold text-gray-700 mb-2">Detalles de la recomendación:</h3>
    {typeof recomendacionDetallada === 'string' ? (
      <pre className="whitespace-pre-line bg-gray-50 p-3 rounded text-sm">
        {recomendacionDetallada}
      </pre>
    ) : (
      <div className="text-red-600 font-bold">
        Error: El formato de la recomendación no es válido.
      </div>
    )}
  </div>
);

export default DetallesRecomendacion; 