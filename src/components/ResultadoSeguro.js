import React from 'react';
import AlertaIULInfantil from './AlertaIULInfantil';
import AlertaConyuge from './AlertaConyuge';
import AlertaPadreSoltero from './AlertaPadreSoltero';
import AlertaRetiro from './AlertaRetiro';
import DetallesRecomendacion from './DetallesRecomendacion';

const ResultadoSeguro = ({ resultado }) => {
  const {
    recomendacionPrincipal,
    recomendacionSecundaria,
    coberturaRecomendada,
    aporteIULSugerido,
    capacidadAhorro,
    recomendacionDetallada,
    situacionFamiliar,
    recomendarIULInfantil,
    añosHastaRetiro,
    objetivoRetiro,
    alertaConyuge,
    alertaPadreSoltero
  } = resultado;

  return (
    <div className="mt-8 bg-white p-6 rounded-lg shadow border-2 border-blue-200 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold text-blue-800 mb-4">Recomendación Personalizada</h2>
      
      <div className="bg-blue-50 p-4 rounded-md mb-4">
        <p className="font-bold text-lg">
          Producto Principal: <span className="text-blue-700">{recomendacionPrincipal}</span>
        </p>
        <p className="mt-1">
          Producto Secundario: <span className="font-medium">{recomendacionSecundaria}</span>
        </p>
        
        {/* Alertas condicionales */}
        {alertaConyuge && <AlertaConyuge />}
        {alertaPadreSoltero && <AlertaPadreSoltero />}
        {recomendarIULInfantil && <AlertaIULInfantil />}
        {objetivoRetiro && <AlertaRetiro añosHastaRetiro={añosHastaRetiro} />}
        
        <p className="mt-2">
          Cobertura Mínima Recomendada: <span className="font-medium">{coberturaRecomendada}</span>
        </p>
        
        {recomendacionPrincipal.includes("IUL") && (
          <p className="mt-2 text-green-700 font-medium">
            Aporte Mensual Sugerido al IUL: {aporteIULSugerido}
          </p>
        )}
        
        {capacidadAhorro && (
          <p className="mt-1 text-sm">
            Capacidad de Ahorro Anual Estimada: {capacidadAhorro}
          </p>
        )}
      </div>
      
      <DetallesRecomendacion recomendacionDetallada={recomendacionDetallada} />
      
      <div className="mt-6 border-t border-gray-200 pt-4">
        <p className="text-sm text-gray-600 italic">
          Esta recomendación es una guía inicial basada en la información proporcionada. 
          Siempre consulte con su agente para un análisis personalizado completo.
        </p>
      </div>
    </div>
  );
};

export default ResultadoSeguro; 