document.addEventListener('DOMContentLoaded', () => {
  const armas = ['🥌', '📜', '✂️'];
  const nombres = ['piedra', 'papel', 'tijera'];
  const emojiMaquina = document.getElementById('emojiMaquina');
  const resultadoMaquina = document.getElementById('resultadoMaquina');
  const resultadoFinal = document.getElementById('resultadoFinal');

  let intervalo;
  let indice = 0;

  
  function iniciarRotacion() {
    intervalo = setInterval(() => {
      emojiMaquina.textContent = armas[indice];
      indice = (indice + 1) % armas.length;
    }, 300);
  }

  function detenerRotacion() {
    clearInterval(intervalo);
  }

  iniciarRotacion();

  
  document.querySelectorAll('.btnInfo').forEach(btn => {
    btn.addEventListener('click', () => {
      const container = btn.parentElement;
      container.classList.toggle('mostrar');
    });
  });

  
  document.querySelectorAll('.btnArma').forEach(btn => {
    btn.addEventListener('click', () => {
      const eleccionJugador = btn.parentElement.getAttribute('data-arma');
      detenerRotacion();

      // Máquina elige aleatoriamente
      const indiceMaquina = Math.floor(Math.random() * armas.length);
      const emojiElegido = armas[indiceMaquina];
      const nombreElegido = nombres[indiceMaquina];

      emojiMaquina.textContent = emojiElegido;
      resultadoMaquina.textContent = `La máquina ha elegido: ${nombreElegido}`;
      resultadoFinal.textContent = determinarGanador(eleccionJugador, nombreElegido);
    });
  });

  function determinarGanador(jugador, maquina) {
    if (jugador === maquina) return '¡Empate!';
    if (
      (jugador === 'piedra' && maquina === 'tijera') ||
      (jugador === 'papel' && maquina === 'piedra') ||
      (jugador === 'tijera' && maquina === 'papel')
    ) {
      return '¡Has ganado!';
    } else {
      return 'La máquina gana...';
    }
  }
});
document.getElementById('btnReiniciar').addEventListener('click', () => {
  location.reload();
});

