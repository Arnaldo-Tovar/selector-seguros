import React from 'react';
import { useFormularioSeguro } from '../hooks/useFormularioSeguro';
import { opcionesEtapaVida } from '../data/opcionesEtapaVida';
import { opcionesSituacionFamiliar } from '../data/opcionesSituacionFamiliar';

const FormularioSeguro = ({ onSubmit }) => {
  const {
    formData,
    handleChange,
    handleCheckboxChange,
    handleSubmit,
    errors,
  } = useFormularioSeguro(onSubmit);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Columna izquierda */}
          <div className="space-y-6">
            {/* Etapa de Vida */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Etapa de Vida *
              </label>
              <select
                name="etapaVida"
                value={formData.etapaVida}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
              >
                <option value="">Seleccione</option>
                {opcionesEtapaVida.map(opcion => (
                  <option key={opcion.valor} value={opcion.valor}>
                    {opcion.texto}
                  </option>
                ))}
              </select>
              {errors.etapaVida && (
                <p className="text-red-500 text-xs mt-1">{errors.etapaVida}</p>
              )}
            </div>

            {/* Situación Familiar */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Situación Familiar *
              </label>
              <select
                name="situacionFamiliar"
                value={formData.situacionFamiliar}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
              >
                <option value="">Seleccione</option>
                {opcionesSituacionFamiliar.map(opcion => (
                  <option key={opcion.valor} value={opcion.valor}>
                    {opcion.texto}
                  </option>
                ))}
              </select>
              {errors.situacionFamiliar && (
                <p className="text-red-500 text-xs mt-1">{errors.situacionFamiliar}</p>
              )}
            </div>

            {/* Edad del Cónyuge (condicional) */}
            {(formData.situacionFamiliar === 'casado' || formData.situacionFamiliar === 'union_libre') && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Edad del Cónyuge/Pareja
                </label>
                <input
                  type="number"
                  name="edadConyuge"
                  value={formData.edadConyuge}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                  placeholder="Ej: 38"
                />
              </div>
            )}

            {/* Edad */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Edad *
              </label>
              <input
                type="number"
                name="edad"
                value={formData.edad}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                placeholder="Ej: 42"
              />
              {errors.edad && (
                <p className="text-red-500 text-xs mt-1">{errors.edad}</p>
              )}
            </div>

            {/* Ingreso Anual */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Ingreso Anual ($) *
              </label>
              <input
                type="number"
                name="ingresoAnual"
                value={formData.ingresoAnual}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                placeholder="Ej: 75000"
              />
              {errors.ingresoAnual && (
                <p className="text-red-500 text-xs mt-1">{errors.ingresoAnual}</p>
              )}
            </div>

            {/* Gastos Mensuales */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Gastos Mensuales Promedio ($) *
              </label>
              <input
                type="number"
                name="gastosMensuales"
                value={formData.gastosMensuales}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                placeholder="Ej: 3500"
              />
              {errors.gastosMensuales && (
                <p className="text-red-500 text-xs mt-1">{errors.gastosMensuales}</p>
              )}
            </div>

            {/* ¿Tiene Hijos? */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                ¿Tiene Hijos? *
              </label>
              <div className="mt-1 flex space-x-6">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="tieneHijos"
                    value="si"
                    checked={formData.tieneHijos === 'si'}
                    onChange={handleChange}
                    className="form-radio"
                  />
                  <span className="ml-2">Sí</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="tieneHijos"
                    value="no"
                    checked={formData.tieneHijos === 'no'}
                    onChange={handleChange}
                    className="form-radio"
                  />
                  <span className="ml-2">No</span>
                </label>
              </div>
              {errors.tieneHijos && (
                <p className="text-red-500 text-xs mt-1">{errors.tieneHijos}</p>
              )}
            </div>

            {/* Campos condicionales para hijos */}
            {formData.tieneHijos === 'si' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Cantidad de Hijos
                  </label>
                  <input
                    type="number"
                    name="cantidadHijos"
                    value={formData.cantidadHijos}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                    placeholder="Ej: 2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Edad de Hijos
                  </label>
                  <select
                    name="edadHijos"
                    value={formData.edadHijos}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                  >
                    <option value="">Seleccione</option>
                    <option value="pequeños">Pequeños (0-12 años)</option>
                    <option value="adolescentes">Adolescentes (13-18 años)</option>
                    <option value="adultos">Adultos (19+ años)</option>
                    <option value="mixto">Edades mixtas</option>
                  </select>
                </div>

                <div className="mt-2 bg-green-50 p-3 rounded border border-green-200">
                  <p className="text-sm text-green-800 font-medium mb-1">
                    ¿Sabía que puede iniciar un IUL para sus hijos?
                  </p>
                  <p className="text-xs text-green-700">
                    Un IUL infantil ofrece: primas bajas, acumulación a largo plazo, y
                    asegurabilidad futura garantizada.
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Columna derecha */}
          <div className="space-y-6">
            {/* ¿Tiene Hipoteca? */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                ¿Tiene Hipoteca?
              </label>
              <div className="mt-1 flex space-x-6">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="tieneHipoteca"
                    value="si"
                    checked={formData.tieneHipoteca === 'si'}
                    onChange={handleChange}
                    className="form-radio"
                  />
                  <span className="ml-2">Sí</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="tieneHipoteca"
                    value="no"
                    checked={formData.tieneHipoteca === 'no'}
                    onChange={handleChange}
                    className="form-radio"
                  />
                  <span className="ml-2">No</span>
                </label>
              </div>
            </div>

            {/* Monto de Hipoteca (condicional) */}
            {formData.tieneHipoteca === 'si' && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Monto restante de hipoteca ($)
                </label>
                <input
                  type="number"
                  name="montoHipoteca"
                  value={formData.montoHipoteca}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                  placeholder="Ej: 250000"
                />
              </div>
            )}

            {/* ¿Tiene otras deudas? */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                ¿Tiene otras deudas significativas?
              </label>
              <div className="mt-1 flex space-x-6">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="tieneDeudas"
                    value="si"
                    checked={formData.tieneDeudas === 'si'}
                    onChange={handleChange}
                    className="form-radio"
                  />
                  <span className="ml-2">Sí</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="tieneDeudas"
                    value="no"
                    checked={formData.tieneDeudas === 'no'}
                    onChange={handleChange}
                    className="form-radio"
                  />
                  <span className="ml-2">No</span>
                </label>
              </div>
            </div>

            {/* Monto de Deudas (condicional) */}
            {formData.tieneDeudas === 'si' && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Monto total de otras deudas ($)
                </label>
                <input
                  type="number"
                  name="montoDeudas"
                  value={formData.montoDeudas}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                  placeholder="Ej: 30000"
                />
              </div>
            )}

            {/* Objetivos Financieros */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Objetivos Financieros (seleccione todos los que apliquen)
              </label>
              <div className="mt-1 space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="objetivoFinanciero"
                    value="proteccion"
                    checked={formData.objetivoFinanciero.includes('proteccion')}
                    onChange={handleCheckboxChange}
                    className="form-checkbox h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2">Protección familiar inmediata</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="objetivoFinanciero"
                    value="ahorro"
                    checked={formData.objetivoFinanciero.includes('ahorro')}
                    onChange={handleCheckboxChange}
                    className="form-checkbox h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2">Ahorro e inversión</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="objetivoFinanciero"
                    value="educacion"
                    checked={formData.objetivoFinanciero.includes('educacion')}
                    onChange={handleCheckboxChange}
                    className="form-checkbox h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2">Educación de hijos</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="objetivoFinanciero"
                    value="retiro"
                    checked={formData.objetivoFinanciero.includes('retiro')}
                    onChange={handleCheckboxChange}
                    className="form-checkbox h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2">Planificación de retiro</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="objetivoFinanciero"
                    value="legado"
                    checked={formData.objetivoFinanciero.includes('legado')}
                    onChange={handleCheckboxChange}
                    className="form-checkbox h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2">Legado/herencia</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg"
          >
            Obtener Recomendación
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormularioSeguro; 