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

  // Determinar recomendación principal y secundaria
  let recomendacionPrincipal = puntajeIUL > puntajeTermino ? 'IUL' : 'Término';
  let recomendacionSecundaria = puntajeIUL > puntajeTermino ? 'Término' : 'IUL';

  // Formatear valores monetarios
  const coberturaRecomendada = formatearMoneda(necesidadCobertura);
  const aporteIULSugerido = formatearMoneda(sugerenciaAporteIUL);
  const capacidadAhorroFormateada = formatearMoneda(capacidadAhorro);

  // Generar recomendación detallada
  const recomendacionDetallada = {
    principal: {
      producto: recomendacionPrincipal,
      razones: []
    },
    secundaria: {
      producto: recomendacionSecundaria,
      razones: []
    }
  };

  // Razones para la recomendación principal
  if (recomendacionPrincipal === 'IUL') {
    if (puntajeIUL > puntajeTermino + 2) {
      recomendacionDetallada.principal.razones.push(
        'Excelente candidato para IUL debido a su perfil financiero y objetivos'
      );
    }
    if (formData.objetivoFinanciero.includes('retiro')) {
      recomendacionDetallada.principal.razones.push(
        'Ideal para complementar su plan de retiro'
      );
    }
    if (formData.objetivoFinanciero.includes('legado')) {
      recomendacionDetallada.principal.razones.push(
        'Perfecto para la planificación de legado'
      );
    }
  } else {
    if (puntajeTermino > puntajeIUL + 2) {
      recomendacionDetallada.principal.razones.push(
        'Término es la mejor opción para su necesidad inmediata de protección'
      );
    }
    if (formData.tieneHipoteca === 'si') {
      recomendacionDetallada.principal.razones.push(
        'Ideal para proteger su hipoteca'
      );
    }
  }

  // Razones para la recomendación secundaria
  if (recomendacionSecundaria === 'IUL') {
    recomendacionDetallada.secundaria.razones.push(
      'Complemento ideal para sus objetivos a largo plazo'
    );
  } else {
    recomendacionDetallada.secundaria.razones.push(
      'Protección adicional para sus dependientes'
    );
  }

  // Alertas y consideraciones especiales
  const alertaConyuge = 
    (formData.situacionFamiliar === 'casado' || formData.situacionFamiliar === 'union_libre') &&
    !formData.edadConyuge;

  const alertaPadreSoltero = formData.situacionFamiliar === 'padre_soltero';

  const objetivoRetiro = formData.objetivoFinanciero.includes('retiro');

  return {
    recomendacionPrincipal,
    recomendacionSecundaria,
    coberturaRecomendada,
    aporteIULSugerido,
    capacidadAhorro: capacidadAhorroFormateada,
    recomendacionDetallada,
    situacionFamiliar: formData.situacionFamiliar,
    recomendarIULInfantil,
    añosHastaRetiro,
    objetivoRetiro,
    alertaConyuge,
    alertaPadreSoltero
  };
}; 