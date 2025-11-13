const unidades = {
  distancia: {
    km: 1000,
    m: 1,
    cm: 0.01,
    dm: 0.1,
    mm: 0.001
  },
  moneda: {
    euros: 1,
    libras: 1.17,
    yenes: 0.0063,
    pesetas: 0.006,
    francos: 0.93,
    tupias: 0.75 // ficticia
  }
};

const tipoSelect = document.getElementById("tipo");
const origenSelect = document.getElementById("origen");
const destinoSelect = document.getElementById("destino");
const intercambiarBtn = document.getElementById("intercambiar");

function actualizarUnidades() {
  const tipo = tipoSelect.value;
  const opciones = Object.keys(unidades[tipo]);

  origenSelect.innerHTML = "";
  destinoSelect.innerHTML = "";

  opciones.forEach(opcion => {
    const opt1 = document.createElement("option");
    opt1.value = opcion;
    opt1.textContent = opcion;
    origenSelect.appendChild(opt1);

    const opt2 = document.createElement("option");
    opt2.value = opcion;
    opt2.textContent = opcion;
    destinoSelect.appendChild(opt2);
  });
}

function convertir() {
  const tipo = tipoSelect.value;
  const origen = origenSelect.value;
  const destino = destinoSelect.value;
  const valor = parseFloat(document.getElementById("valor").value);

  if (isNaN(valor)) {
    document.getElementById("resultado").textContent = "Introduce un valor válido.";
    return;
  }

  const factorOrigen = unidades[tipo][origen];
  const factorDestino = unidades[tipo][destino];
  const resultado = (valor * factorOrigen) / factorDestino;

  document.getElementById("resultado").textContent = `${valor} ${origen} = ${resultado.toFixed(4)} ${destino}`;
}

intercambiarBtn.addEventListener("click", () => {
  const temp = origenSelect.value;
  origenSelect.value = destinoSelect.value;
  destinoSelect.value = temp;
});

tipoSelect.addEventListener("change", actualizarUnidades);
window.addEventListener("load", actualizarUnidades);
