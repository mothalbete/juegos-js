let preguntaActual = 0;
const fieldsets = Array.from(document.querySelectorAll('fieldset'));
const pantallaInicial = document.getElementById('pantalla-inicial');
const pantallaError = document.getElementById('pantalla-error');
const formulario = document.getElementById('trivial-form');
const botonComenzar = document.getElementById('comenzar');
const botonReiniciar = document.getElementById('reiniciar');
const botonIntentarNuevo = document.getElementById('intentar-nuevo');

function mostrarPregunta(index) {
  fieldsets.forEach((fs, i) => {
    fs.style.display = i === index ? 'block' : 'none';
  });
}

function mezclarOpciones() {
  fieldsets.forEach(fieldset => {
    const labels = Array.from(fieldset.querySelectorAll('label'));
    const resultado = fieldset.querySelector('.resultado');
    const mezcladas = labels.sort(() => Math.random() - 0.5);
    labels.forEach(label => label.remove());
    mezcladas.forEach(label => fieldset.insertBefore(label, resultado));
  });
}

function limpiarRespuestas() {
  document.querySelectorAll('input[type="radio"]').forEach(input => {
    input.checked = false;
  });
  document.querySelectorAll('.resultado').forEach(p => {
    p.textContent = '';
  });
  preguntaActual = 0;
}

function configurarEventos() {
  document.querySelectorAll('input[type="radio"]').forEach(input => {
    input.addEventListener('change', () => {
      const fieldset = input.closest('fieldset');
      const resultado = fieldset.querySelector('.resultado');
      const esCorrecta = input.parentElement.classList.contains('verdad');

      resultado.textContent = esCorrecta ? '✅ ¡Correcto!' : '❌ Incorrecto';
      resultado.style.color = esCorrecta ? 'green' : 'red';

      if (esCorrecta) {
        setTimeout(() => {
          preguntaActual++;
          if (preguntaActual < fieldsets.length) {
            mostrarPregunta(preguntaActual);
          } else {
            alert('🎉 ¡Has completado el trivial!');
            botonReiniciar.style.display = 'inline-block';
          }
        }, 800);
      } else {
        setTimeout(() => {
          mostrarPantallaError();
        }, 1000);
      }
    });
  });
}

function mostrarPantallaError() {
  formulario.style.display = 'none';
  pantallaInicial.style.display = 'none';
  pantallaError.style.display = 'block';
}

function reiniciarJuego() {
  limpiarRespuestas();
  mezclarOpciones();
  configurarEventos();
  preguntaActual = 0;
  pantallaInicial.style.display = 'block';
  pantallaError.style.display = 'none';
  formulario.style.display = 'none';
  botonReiniciar.style.display = 'none';
}

// Evento para comenzar el juego
botonComenzar.addEventListener('click', () => {
  pantallaInicial.style.display = 'none';
  pantallaError.style.display = 'none';
  formulario.style.display = 'block';
  botonReiniciar.style.display = 'none';
  mostrarPregunta(preguntaActual);
});

// Evento para reiniciar manualmente
botonReiniciar.addEventListener('click', () => {
  reiniciarJuego();
});

// Evento para intentar de nuevo desde pantalla de error
botonIntentarNuevo.addEventListener('click', () => {
  reiniciarJuego();
  pantallaInicial.style.display = 'none';
  formulario.style.display = 'block';
  mostrarPregunta(preguntaActual);
});

// Inicialización al cargar la página
mezclarOpciones();
configurarEventos();
formulario.style.display = 'none';
pantallaInicial.style.display = 'block';
pantallaError.style.display = 'none';
botonReiniciar.style.display = 'none';
