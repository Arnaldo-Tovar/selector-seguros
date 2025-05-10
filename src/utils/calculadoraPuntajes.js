// Funciones para calcular puntajes
export const calcularPuntajes = (formData) => {
  let puntajeIUL = 0;
  let puntajeTermino = 0;
  let necesidadCobertura = 0;
  let capacidadAhorro = 0;
  let sugerenciaAporteIUL = 0;

  const ingresoAnualNum = parseFloat(formData.ingresoAnual);
  const gastosMensualesNum = parseFloat(formData.gastosMensuales);
  const edadNum = parseInt(formData.edad);
  const añosHastaRetiro = Math.max(65 - edadNum, 0);

  // Cálculo basado en edad/etapa de vida
  if (formData.etapaVida === 'formador' || edadNum < 35) {
    puntajeTermino += 2;
    puntajeIUL += 2;
  } else if (formData.etapaVida === 'constructor' || (edadNum >= 35 && edadNum <= 45)) {
    puntajeTermino += 1;
    puntajeIUL += 3;
  } else if (formData.etapaVida === 'prejubilacion' || (edadNum > 45 && edadNum <= 55)) {
    puntajeTermino += 1;
    puntajeIUL += 4;
  } else if (formData.etapaVida === 'legado' || edadNum > 55) {
    puntajeIUL += 5;
  }

  // Factor crítico: Si tiene buenos ingresos, favorece fuertemente IUL
  if (ingresoAnualNum > 75000) {
    puntajeIUL += 3;
  }
  if (ingresoAnualNum > 120000) {
    puntajeIUL += 2;
  }

  // Cálculo basado en hijos
  if (formData.tieneHijos === 'si') {
    puntajeTermino += 2;
    puntajeIUL += 1;

    if (formData.edadHijos === 'pequeños') {
      puntajeTermino += 1;
      puntajeIUL += 1;
    } else if (formData.edadHijos === 'adolescentes') {
      puntajeTermino += 1;
      puntajeIUL += 2;
    } else if (formData.edadHijos === 'adultos') {
      puntajeIUL += 2;
    }
  }

  // Cálculo basado en hipoteca
  if (formData.tieneHipoteca === 'si' && formData.montoHipoteca) {
    const montoHipotecaNum = parseFloat(formData.montoHipoteca);
    puntajeTermino += 2;
    
    if (ingresoAnualNum > 100000 && montoHipotecaNum < ingresoAnualNum * 3) {
      puntajeIUL += 1;
    }
    
    necesidadCobertura += montoHipotecaNum;
  }

  // Cálculo basado en otras deudas
  if (formData.tieneDeudas === 'si' && formData.montoDeudas) {
    const montoDeudasNum = parseFloat(formData.montoDeudas);
    puntajeTermino += 1;
    necesidadCobertura += montoDeudasNum;
  }

  // Cálculo basado en necesidad de cobertura por ingresos
  if (ingresoAnualNum) {
    necesidadCobertura += ingresoAnualNum * 10;
    
    if (ingresoAnualNum > 85000) {
      puntajeIUL += 1;
    }
  }

  // Cálculo basado en objetivos financieros
  if (formData.objetivoFinanciero.includes('proteccion')) {
    puntajeTermino += 2;
    puntajeIUL += 1;
  }
  
  if (formData.objetivoFinanciero.includes('ahorro')) {
    puntajeIUL += 3;
  }
  
  if (formData.objetivoFinanciero.includes('educacion')) {
    puntajeIUL += 3;
    puntajeTermino += 1;
  }
  
  if (formData.objetivoFinanciero.includes('retiro')) {
    puntajeIUL += 4;
  }
  
  if (formData.objetivoFinanciero.includes('legado')) {
    puntajeIUL += 4;
  }

  // Si el cliente es padre soltero, aumentamos la cobertura recomendada
  if (formData.situacionFamiliar === 'padre_soltero') {
    necesidadCobertura *= 1.2;
  }

  // Cálculo de capacidad de ahorro
  if (ingresoAnualNum && gastosMensualesNum) {
    const gastosAnuales = gastosMensualesNum * 12;
    capacidadAhorro = ingresoAnualNum - gastosAnuales;
    
    // Calculamos un aporte mensual sugerido
    if (capacidadAhorro > 0) {
      // Base mínima del 10% de la capacidad de ahorro
      sugerenciaAporteIUL = (capacidadAhorro * 0.1) / 12;
      
      // Ajustes basados en etapa de vida y objetivos
      if (formData.etapaVida === 'prejubilacion' || 
          formData.etapaVida === 'legado' || 
          formData.objetivoFinanciero.includes('retiro') || 
          formData.objetivoFinanciero.includes('legado')) {
        // Aumentar al 15% para personas centradas en retiro/legado
        sugerenciaAporteIUL = (capacidadAhorro * 0.15) / 12;
      }
      
      // Ajuste para ingresos altos
      if (ingresoAnualNum > 150000) {
        sugerenciaAporteIUL = Math.max(sugerenciaAporteIUL, 1000);
      } else if (ingresoAnualNum > 100000) {
        sugerenciaAporteIUL = Math.max(sugerenciaAporteIUL, 500);
      }
      
      // Redondear a un número más "amigable"
      sugerenciaAporteIUL = Math.round(sugerenciaAporteIUL / 50) * 50;
    }
  }

  // Ajuste para favorecer IUL en casos de igualdad o casi igualdad cuando hay buenos ingresos
  if (ingresoAnualNum > 80000 && puntajeTermino >= puntajeIUL && puntajeTermino - puntajeIUL <= 2) {
    puntajeIUL = puntajeTermino + 1;
  }

  // Determinar si recomendar IUL infantil
  const recomendarIULInfantil = 
    formData.tieneHijos === 'si' && 
    capacidadAhorro > 12000 && 
    (formData.edadHijos === 'pequeños' || formData.edadHijos === 'adolescentes' || formData.edadHijos === 'mixto');

  return {
    puntajeIUL,
    puntajeTermino,
    necesidadCobertura,
    capacidadAhorro,
    sugerenciaAporteIUL,
    añosHastaRetiro,
    recomendarIULInfantil
  };
}; 