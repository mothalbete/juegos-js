const input = document.getElementById("nueva-tarea");
const horaInput = document.getElementById("hora-tarea");
const agregarBtn = document.getElementById("agregar");
const lista = document.getElementById("lista-tareas");
const filtro = document.getElementById("filtro-fecha");

const fechasSet = new Set();

agregarBtn.addEventListener("click", () => {
  const texto = input.value.trim();
  const horaManual = horaInput.value;

  if (texto === "") return;

  const hoy = new Date();
  const fechaFormateada = hoy.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  const horaFinal = horaManual || hoy.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit"
  });

  fechasSet.add(fechaFormateada);
  actualizarFiltro();

  const li = document.createElement("li");
  li.setAttribute("data-fecha", fechaFormateada);

  const contenido = document.createElement("span");
  contenido.textContent = texto;

  const fechaElemento = document.createElement("small");
  fechaElemento.textContent = `📅 ${fechaFormateada} 🕒 ${horaFinal}`;
  fechaElemento.classList.add("fecha");

  const btnHecho = document.createElement("button");
  btnHecho.textContent = "✔";
  btnHecho.title = "Marcar como hecha";
  btnHecho.onclick = () => li.classList.toggle("completada");

  const btnImportante = document.createElement("button");
  btnImportante.textContent = "❗";
  btnImportante.title = "Marcar como importante";
  btnImportante.onclick = () => li.classList.toggle("importante");

  const btnEliminar = document.createElement("button");
  btnEliminar.textContent = "🗑";
  btnEliminar.title = "Eliminar tarea";
  btnEliminar.onclick = () => {
    li.remove();
    verificarFechas();
  };

  li.appendChild(contenido);
  li.appendChild(fechaElemento);
  li.appendChild(btnHecho);
  li.appendChild(btnImportante);
  li.appendChild(btnEliminar);

  lista.appendChild(li);
  input.value = "";
  horaInput.value = "";
});

filtro.addEventListener("change", () => {
  const seleccion = filtro.value;
  const tareas = lista.querySelectorAll("li");

  tareas.forEach(tarea => {
    const fecha = tarea.getAttribute("data-fecha");
    tarea.style.display = (seleccion === "todas" || fecha === seleccion) ? "block" : "none";
  });
});

function actualizarFiltro() {
  const seleccionActual = filtro.value;
  filtro.innerHTML = '<option value="todas">Todas las fechas</option>';
  [...fechasSet].sort().forEach(fecha => {
    const option = document.createElement("option");
    option.value = fecha;
    option.textContent = fecha;
    filtro.appendChild(option);
  });
  filtro.value = seleccionActual;
}

function verificarFechas() {
  const tareas = lista.querySelectorAll("li");
  fechasSet.clear();
  tareas.forEach(t => fechasSet.add(t.getAttribute("data-fecha")));
  actualizarFiltro();
}
