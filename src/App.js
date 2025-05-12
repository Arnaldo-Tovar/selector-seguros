import React, { useState } from 'react';
import { SeguroProvider } from './context/SeguroContext';
import FormularioSeguro from './components/FormularioSeguro';
import ResultadoSeguro from './components/ResultadoSeguro';

function App() {
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [resultado, setResultado] = useState(null);

  const manejarEnvioFormulario = (datos) => {
    setResultado(datos);
    setMostrarResultado(true);
  };

  const manejarNuevaConsulta = () => {
    setMostrarResultado(false);
    setResultado(null);
  };

  return (
    <SeguroProvider>
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-4">
            <img
              src={process.env.PUBLIC_URL + '/logo.png'}
              alt="Next Level Logo"
              className="h-20 w-auto"
              style={{ maxWidth: 320 }}
            />
          </div>
          <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">
            Selector de Seguros de Vida
          </h1>
          
          {!mostrarResultado ? (
            <FormularioSeguro onSubmit={manejarEnvioFormulario} />
          ) : (
            <div>
              <ResultadoSeguro resultado={resultado} />
              <button
                onClick={manejarNuevaConsulta}
                className="mt-4 w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Realizar Nueva Consulta
              </button>
            </div>
          )}
        </div>
      </div>
      <footer className="py-4 bg-gray-50 text-center text-gray-500 text-sm">
        <span className="font-bold">Arnaldo Tovar</span> Ceo Next Level
      </footer>
    </SeguroProvider>
  );
}

export default App; 