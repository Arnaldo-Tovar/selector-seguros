import { useState } from 'react';
import { calcularPuntajes } from '../utils/calculadoraPuntajes';
import { generarRecomendaciones } from '../utils/generadorRecomendaciones';

export const useFormularioSeguro = (setResultado) => {
  const [formData, setFormData] = useState({
    etapaVida: '',
    edad: '',
    situacionFamiliar: '',
    edadConyuge: '',
    ingresoAnual: '',
    gastosMensuales: '',
    tieneHijos: '',
    cantidadHijos: '',
    edadHijos: '',
    tieneHipoteca: '',
    montoHipoteca: '',
    tieneDeudas: '',
    montoDeudas: '',
    objetivoFinanciero: [],
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { value } = e.target;
    const objetivoFinanciero = [...formData.objetivoFinanciero];

    if (objetivoFinanciero.includes(value)) {
      const index = objetivoFinanciero.indexOf(value);
      objetivoFinanciero.splice(index, 1);
    } else {
      objetivoFinanciero.push(value);
    }

    setFormData({
      ...formData,
      objetivoFinanciero,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.etapaVida) {
      newErrors.etapaVida = 'La etapa de vida es obligatoria';
    }

    if (!formData.edad) {
      newErrors.edad = 'La edad es obligatoria';
    }

    if (!formData.situacionFamiliar) {
      newErrors.situacionFamiliar = 'La situación familiar es obligatoria';
    }

    if (!formData.ingresoAnual) {
      newErrors.ingresoAnual = 'El ingreso anual es obligatorio';
    }

    if (!formData.gastosMensuales) {
      newErrors.gastosMensuales = 'Los gastos mensuales son obligatorios';
    }

    if (!formData.tieneHijos) {
      newErrors.tieneHijos = 'Debe indicar si tiene hijos';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Calcular puntajes y recomendaciones
    const puntajes = calcularPuntajes(formData);
    const recomendaciones = generarRecomendaciones(formData, puntajes);

    // Enviar resultados
    setResultado(recomendaciones);
  };

  return {
    formData,
    handleChange,
    handleCheckboxChange,
    handleSubmit,
    errors,
  };
}; 