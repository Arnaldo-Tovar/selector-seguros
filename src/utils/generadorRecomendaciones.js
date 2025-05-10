import { formatearMoneda } from './formateadorMoneda';

// Funciones para generar recomendaciones
export const generarRecomendaciones = (formData, puntajes) => {
  const {
    puntajeIUL,
    puntajeTermino,
    necesidadCobertura,
    capacidadAhorro,
    sugerenciaAporteIUL,
    añosHastaRetiro,
    recomendarIULInfantil
  } = puntajes;

  // Determinar recomendación principal
  let recomendacionPrincipal = '';
  let recomendacionSecundaria = '';

  if (puntajeIUL > puntajeTermino) {
    recomendacionPrincipal = "IUL (Seguro de Vida Universal Indexado)";
    if (puntajeTermino > 3) {
      recomendacionSecundaria = "Póliza a Término como complemento para protección adicional";
    } else {
      recomendacionSecundaria = "Considerar IUL como única solución para maximizar acumulación";
    }
  } else if (puntajeTermino > puntajeIUL) {
    recomendacionPrincipal = "Póliza a Término";
    recomendacionSecundaria = "Considerar IUL como complemento para ventajas de acumulación";
  } else {
    recomendacionPrincipal = "Enfoque Híbrido";
    recomendacionSecundaria = "Combinar Póliza a Término e IUL en proporción 50/50";
  }

  // Generar texto detallado de recomendación
  let recomendacionDetallada = '';

  // Recomendación basada en etapa de vida
  if (formData.etapaVida === 'formador' || parseInt(formData.edad) < 35) {
    recomendacionDetallada += "• Como Formador de Familia, necesita protección alta pero también tiene la mayor ventaja del tiempo para acumulación en IUL.\n";
  } else if (formData.etapaVida === 'constructor' || (parseInt(formData.edad) >= 35 && parseInt(formData.edad) <= 45)) {
    recomendacionDetallada += "• Como Constructor Patrimonial, está en la fase ideal para maximizar los beneficios de crecimiento fiscal del IUL mientras mantiene protección.\n";
  } else if (formData.etapaVida === 'prejubilacion' || (parseInt(formData.edad) > 45 && parseInt(formData.edad) <= 55)) {
    recomendacionDetallada += "• En etapa de Pre-Jubilación, el IUL ofrece grandes ventajas para acumulación acelerada con acceso al efectivo libre de impuestos.\n";
  } else if (formData.etapaVida === 'legado' || parseInt(formData.edad) > 55) {
    recomendacionDetallada += "• En etapa de Planificación de Legado, el IUL es ideal para transferencia de riqueza fiscalmente eficiente y protección de activos.\n";
  }

  // Recomendación basada en ingresos
  const ingresoAnualNum = parseFloat(formData.ingresoAnual);
  recomendacionDetallada += `• Basado en su ingreso anual de ${formatearMoneda(ingresoAnualNum)}, `;
  
  if (ingresoAnualNum > 120000) {
    recomendacionDetallada += "su nivel de ingresos lo coloca en un rango donde las ventajas fiscales del IUL son particularmente valiosas.\n";
  } else if (ingresoAnualNum > 75000) {
    recomendacionDetallada += "tiene capacidad para aprovechar las ventajas de acumulación del IUL.\n";
  } else {
    recomendacionDetallada += "se recomienda una cobertura mínima de 10 veces ese valor.\n";
  }

  // Recomendación basada en hijos
  if (formData.tieneHijos === 'si') {
    if (formData.edadHijos === 'pequeños') {
      recomendacionDetallada += "• Con hijos pequeños, necesita protección financiera y también planificación para su educación futura.\n";
    } else if (formData.edadHijos === 'adolescentes') {
      recomendacionDetallada += "• Con hijos adolescentes, el IUL permite acumular fondos para educación universitaria próxima con ventajas fiscales.\n";
    } else if (formData.edadHijos === 'adultos') {
      recomendacionDetallada += "• Con hijos adultos, puede enfocarse más en acumulación patrimonial y planificación de legado mediante IUL.\n";
    } else if (formData.edadHijos === 'mixto') {
      recomendacionDetallada += "• Con hijos de diferentes edades, necesita una estrategia flexible que combine protección inmediata y planificación a largo plazo.\n";
    }
  }

  // Recomendación basada en hipoteca
  if (formData.tieneHipoteca === 'si' && formData.montoHipoteca) {
    const montoHipotecaNum = parseFloat(formData.montoHipoteca);
    recomendacionDetallada += `• Su hipoteca de ${formatearMoneda(montoHipotecaNum)} requiere protección, ya sea mediante término o como parte de su estrategia IUL.\n`;
  }

  // Recomendación basada en otras deudas
  if (formData.tieneDeudas === 'si' && formData.montoDeudas) {
    const montoDeudasNum = parseFloat(formData.montoDeudas);
    recomendacionDetallada += `• Sus deudas adicionales de ${formatearMoneda(montoDeudasNum)} deben ser consideradas en su estrategia de protección.\n`;
  }

  // Recomendación basada en objetivos financieros
  const objetivos = formData.objetivoFinanciero;
  
  if (objetivos.includes('proteccion')) {
    recomendacionDetallada += "• Su objetivo de protección familiar se puede lograr con póliza de término o como parte de una estrategia IUL.\n";
  }
  
  if (objetivos.includes('ahorro')) {
    recomendacionDetallada += "• Su objetivo de ahorro e inversión se alinea perfectamente con las ventajas de crecimiento indexado del IUL.\n";
  }
  
  if (objetivos.includes('educacion')) {
    recomendacionDetallada += "• Para planificación educativa, el IUL ofrece acceso a fondos libre de impuestos sin las restricciones de planes 529.\n";
  }
  
  if (objetivos.includes('retiro')) {
    // Mensaje sobre planificación para retiro
    if (añosHastaRetiro > 0) {
      recomendacionDetallada += `• Planificación para retiro: Le quedan aproximadamente ${añosHastaRetiro} años hasta la edad tradicional de retiro (65 años).\n`;
      
      if (añosHastaRetiro > 20) {
        recomendacionDetallada += "• Con más de 20 años para acumular, tiene una excelente ventana de tiempo para maximizar el crecimiento en un IUL.\n";
        recomendacionDetallada += "• Estrategia recomendada: Maximizar aportes para aprovechar el poder del interés compuesto a largo plazo.\n";
      } else if (añosHastaRetiro > 10) {
        recomendacionDetallada += "• Con 10-20 años para acumular, un IUL sigue siendo muy ventajoso para sus metas de retiro.\n";
        recomendacionDetallada += "• Estrategia recomendada: Balancear acumulación con acceso a efectivo en la próxima década.\n";
      } else {
        recomendacionDetallada += "• Con menos de 10 años para el retiro, el IUL proporciona una estrategia complementaria a sus planes existentes.\n";
        recomendacionDetallada += "• Estrategia recomendada: Enfoque en protección de activos y creación de fuente de ingresos libre de impuestos.\n";
      }
    } else {
      recomendacionDetallada += "• Ya se encuentra en edad de retiro o cerca de ella. El IUL puede ser una fuente inmediata de ingresos libre de impuestos.\n";
      recomendacionDetallada += "• Estrategia recomendada: Utilizar IUL para optimización fiscal y planificación patrimonial.\n";
    }
    
    recomendacionDetallada += "• Su enfoque en planificación de retiro hace del IUL una opción ideal para complementar otras estrategias con ingresos libres de impuestos.\n";
  }
  
  if (objetivos.includes('legado')) {
    recomendacionDetallada += "• Su objetivo de dejar un legado se maximiza con un IUL por su eficiencia en transferencia de riqueza libre de impuestos.\n";
  }

  // Beneficios clave del IUL para la situación específica
  let beneficiosIUL = [];
  
  if (parseInt(formData.edad) < 40) {
    beneficiosIUL.push("Mayor tiempo para crecimiento compuesto libre de impuestos");
  }
  
  if (ingresoAnualNum > 75000) {
    beneficiosIUL.push("Capacidad para maximizar contribuciones por encima del límite de planes calificados");
  }
  
  if (formData.tieneHijos === 'si' && formData.edadHijos === 'pequeños') {
    beneficiosIUL.push("Fondo para educación con acceso libre de impuestos");
  }
  
  if (objetivos.includes('retiro')) {
    beneficiosIUL.push("Ingresos de retiro libres de impuestos mediante préstamos contra la póliza");
    beneficiosIUL.push("Sin obligación de retiros mínimos (RMDs) como en planes calificados");
  }
  
  if (objetivos.includes('legado')) {
    beneficiosIUL.push("Beneficio por fallecimiento libre de impuestos sobre la renta");
  }
  
  if (formData.tieneHipoteca === 'si' && ingresoAnualNum > 100000) {
    beneficiosIUL.push("Posibilidad de usar el valor en efectivo para pagar la hipoteca anticipadamente");
  }
  
  if (objetivos.includes('ahorro')) {
    beneficiosIUL.push("Potencial de crecimiento vinculado al mercado sin riesgo de pérdidas");
  }
  
  if (objetivos.includes('educacion')) {
    beneficiosIUL.push("Flexibilidad para usar fondos educativos para cualquier propósito sin penalidades");
  }

  // Resumen de beneficios IUL únicos
  if (beneficiosIUL.length > 0) {
    recomendacionDetallada += "\nBeneficios clave del IUL para su situación:\n";
    // Eliminar duplicados y mostrar solo los 5 más relevantes
    const beneficiosUnicos = [...new Set(beneficiosIUL)].slice(0, 5);
    beneficiosUnicos.forEach(beneficio => {
      recomendacionDetallada += `✓ ${beneficio}\n`;
    });
  }
  
  // Recomendaciones basadas en situación familiar
  recomendacionDetallada += "\nConsideraciones basadas en su situación familiar:\n";
  
  const alertaConyuge = formData.situacionFamiliar === 'casado' || formData.situacionFamiliar === 'union_libre';
  const alertaPadreSoltero = formData.situacionFamiliar === 'padre_soltero';
  
  if (alertaConyuge) {
    recomendacionDetallada += "• Como persona casada/con pareja, es importante considerar la protección de ambos cónyuges.\n";
    
    if (formData.edadConyuge) {
      const edadConyugeNum = parseInt(formData.edadConyuge);
      recomendacionDetallada += `• Recomendamos evaluar una póliza complementaria para su cónyuge/pareja de ${edadConyugeNum} años.\n`;
      
      // Si el cónyuge está en edad pre-retiro, sugerir IUL también para él/ella
      if (edadConyugeNum > 40 && ingresoAnualNum > 80000) {
        recomendacionDetallada += "• Dado el nivel de ingresos del hogar, considere una póliza IUL también para su cónyuge como estrategia complementaria de retiro.\n";
      } else {
        recomendacionDetallada += "• Para su cónyuge, al menos una póliza de término proporcionaría protección básica para la familia.\n";
      }
    } else {
      recomendacionDetallada += "• Recomendamos complementar con una póliza para su cónyuge/pareja para protección integral familiar.\n";
    }
  } else if (alertaPadreSoltero) {
    recomendacionDetallada += "• Como padre/madre soltero/a, su seguro de vida es CRÍTICO para el futuro de sus hijos.\n";
    recomendacionDetallada += "• Recomendamos maximizar la cobertura y considerar un fideicomiso como parte de su planificación.\n";
    recomendacionDetallada += "• Hemos aumentado su cobertura recomendada en un 20% debido a su rol como único proveedor familiar.\n";
    
    if (formData.tieneHijos === 'si' && formData.edadHijos === 'pequeños') {
      recomendacionDetallada += "• Con hijos pequeños, considere también un rider de beneficio para educación universitaria como complemento.\n";
    }
  } else if (formData.situacionFamiliar === 'soltero') {
    if (formData.tieneHijos === 'no') {
      recomendacionDetallada += "• Como persona soltera sin dependientes, puede enfocarse más en los beneficios de acumulación que en la cobertura.\n";
      if (parseInt(formData.edad) < 40) {
        recomendacionDetallada += "• Su juventud le da una ventaja significativa para maximizar el crecimiento a largo plazo en un IUL.\n";
      }
    } else {
      recomendacionDetallada += "• Aunque es soltero/a, tiene dependientes, por lo que la protección sigue siendo una prioridad importante.\n";
    }
  } else if (formData.situacionFamiliar === 'divorciado') {
    recomendacionDetallada += "• Como persona divorciada, revise que los beneficiarios de su póliza estén actualizados según sus deseos actuales.\n";
    if (formData.tieneHijos === 'si') {
      recomendacionDetallada += "• Asegúrese de que la póliza incluya provisiones claras para la distribución de beneficios a sus hijos.\n";
    }
  } else if (formData.situacionFamiliar === 'viudo') {
    recomendacionDetallada += "• Como persona viuda, es importante reevaluar sus necesidades de cobertura y planificación patrimonial.\n";
    if (formData.tieneHijos === 'si') {
      recomendacionDetallada += "• La protección de sus hijos sigue siendo prioritaria, pero también puede enfocarse en estrategias de legado.\n";
    } else {
      recomendacionDetallada += "• Sin dependientes directos, puede considerar el IUL principalmente como vehículo de planificación para retiro y legado.\n";
    }
  }

  // Recomendaciones específicas para IUL infantil
  if (recomendarIULInfantil) {
    const gastosMensualesNum = parseFloat(formData.gastosMensuales);
    const gastosAnuales = gastosMensualesNum * 12;
    const capacidadAhorroEstimada = ingresoAnualNum - gastosAnuales;
    
    recomendacionDetallada += "\nConsideraciones especiales para IUL infantil:\n";
    recomendacionDetallada += "• Su situación financiera permite considerar un IUL infantil, que ofrece ventajas únicas para el futuro de sus hijos.\n";
    
    if (formData.edadHijos === 'pequeños') {
      recomendacionDetallada += "• Con hijos pequeños, un IUL infantil tendría décadas para crecer, maximizando el potencial de acumulación.\n";
      recomendacionDetallada += "• Ventajas clave: primas extremadamente bajas, asegurabilidad garantizada, y posible fondo para universidad o primer hogar.\n";
      // Sugerir monto
      const sugerenciaIULInfantil = Math.min(300, Math.round((capacidadAhorroEstimada * 0.05) / 12 / 50) * 50);
      recomendacionDetallada += `• Aporte mensual sugerido para IUL infantil: ${formatearMoneda(sugerenciaIULInfantil)} por hijo.\n`;
    } else if (formData.edadHijos === 'adolescentes') {
      recomendacionDetallada += "• Aunque sus hijos son adolescentes, aún es momento ideal para iniciar un IUL infantil antes de la edad adulta.\n";
      recomendacionDetallada += "• Beneficios principales: protección de asegurabilidad futura, inicio de acumulación para objetivos próximos.\n";
      // Sugerir monto mayor por menos tiempo de acumulación
      const sugerenciaIULInfantil = Math.min(500, Math.round((capacidadAhorroEstimada * 0.07) / 12 / 50) * 50);
      recomendacionDetallada += `• Aporte mensual sugerido para IUL infantil: ${formatearMoneda(sugerenciaIULInfantil)} por hijo.\n`;
    } else { // mixto
      recomendacionDetallada += "• Con hijos de diferentes edades, puede implementar una estrategia escalonada de IULs infantiles.\n";
      recomendacionDetallada += "• Considere mayores aportes para los hijos mayores y aportes a más largo plazo para los menores.\n";
      // Sugerir monto promedio
      const sugerenciaIULInfantil = Math.min(400, Math.round((capacidadAhorroEstimada * 0.06) / 12 / 50) * 50);
      recomendacionDetallada += `• Aporte mensual promedio sugerido: ${formatearMoneda(sugerenciaIULInfantil)} por hijo, ajustado según edad.\n`;
    }
    
    recomendacionDetallada += "• El IUL infantil proporciona un vehículo para enseñar educación financiera mientras crea un activo para su futuro.\n";
  }

  // Información sobre capacidad de ahorro y aporte mensual
  if (capacidadAhorro > 0) {
    const gastosMensualesNum = parseFloat(formData.gastosMensuales);
    recomendacionDetallada += `\nBasado en sus ingresos anuales de ${formatearMoneda(ingresoAnualNum)} y gastos mensuales de ${formatearMoneda(gastosMensualesNum)}:\n`;
    recomendacionDetallada += `• Su capacidad anual de ahorro estimada es: ${formatearMoneda(capacidadAhorro)}\n`;
    recomendacionDetallada += `• Aporte mensual sugerido al IUL: ${formatearMoneda(sugerenciaAporteIUL)}\n`;
    
    if (sugerenciaAporteIUL > 0) {
      const porcentajeAhorroAnual = Math.round((sugerenciaAporteIUL * 12 / capacidadAhorro) * 100);
      recomendacionDetallada += `• Este aporte representa aproximadamente el ${porcentajeAhorroAnual}% de su capacidad de ahorro anual\n`;
    }
  } else {
    recomendacionDetallada += "\nSus gastos actuales exceden sus ingresos declarados. Recomendamos revisar su presupuesto antes de considerar un aporte al IUL.\n";
  }

  // Construir objeto de resultado completo
  return {
    recomendacionPrincipal,
    recomendacionSecundaria,
    coberturaRecomendada: formatearMoneda(necesidadCobertura),
    recomendacionDetallada,
    aporteIULSugerido: sugerenciaAporteIUL > 0 ? formatearMoneda(sugerenciaAporteIUL) : "N/A",
    capacidadAhorro: capacidadAhorro > 0 ? formatearMoneda(capacidadAhorro) : "Revisar presupuesto",
    situacionFamiliar: formData.situacionFamiliar,
    tieneHijos: formData.tieneHijos,
    edadHijos: formData.edadHijos,
    recomendarIULInfantil,
    añosHastaRetiro,
    objetivoRetiro: formData.objetivoFinanciero.includes('retiro'),
    alertaConyuge,
    alertaPadreSoltero
  };
}; 