const numeroSecreto = Math.floor(Math.random() * 101);
let intentos = 0;
const maxIntentos = 10;

const input = document.querySelector('input');
const boton = document.querySelector('button');
const volver = document.querySelector('.volver');

boton.addEventListener('click', () => {
  const intento = parseInt(input.value);

  if (isNaN(intento) || intento < 0 || intento > 100) {
    alert("Por favor, escribe un número entre 0 y 100.");
    return;
  }

  intentos++;

  if (intento === numeroSecreto) {
    alert(`¡Correcto! Adivinaste el número en ${intentos} intento(s).`);
    input.disabled = true;
    boton.disabled = true;
    volver.style.display = "inline-block";
  } else if (intento < numeroSecreto) {
    alert(`Demasiado bajo. Intento ${intentos} de ${maxIntentos}`);
  } else {
    alert(`Demasiado alto. Intento ${intentos} de ${maxIntentos}`);
  }

  if (intentos >= maxIntentos && intento !== numeroSecreto) {
    alert(`¡Has superado los ${maxIntentos} intentos! El número era ${numeroSecreto}.`);
    input.disabled = true;
    boton.disabled = true;
    volver.style.display = "inline-block";
  }

  input.value = "";
});
