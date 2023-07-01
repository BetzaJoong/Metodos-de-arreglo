// Arreglo para almacenar las tareas
let tareas = [
    { id: 1, descripcion: 'Ir a la fiesta con mi amiga Abby', completada: false },
    { id: 2, descripcion: 'Ir de viaje a Cancún con la familia', completada: false },
    { id: 3, descripcion: 'Ir al veterinario', completada: false }
];

// Función para agregar una tarea al arreglo y actualizar la lista en la página
function agregarTarea(descripcion) {
    if (descripcion === '') {
        alert('Por favor, escribe una tarea');
        return;
    }

    const tarea = {
        id: tareas.length + 1,
        descripcion: descripcion,
        completada: false
    };
    tareas.push(tarea);
    actualizarListaTareas();
}

// Función para eliminar una tarea del arreglo y actualizar la lista en la página
function eliminarTarea(id) {
    tareas = tareas.filter(tarea => tarea.id !== id);

    // Actualizar los IDs de las tareas restantes
    for (let i = 0; i < tareas.length; i++) {
        tareas[i].id = i + 1;
    }

    actualizarListaTareas();
}

// Función para marcar una tarea como completada o incompleta
function cambiarEstadoTarea(id) {
    const tarea = tareas.find(tarea => tarea.id === id);
    if (tarea) {
        tarea.completada = !tarea.completada;
        actualizarListaTareas();
    }
}

// Función para contar el total de tareas y tareas realizadas
function contarTareas() {
    const total = tareas.length;
    const realizadas = tareas.filter(tarea => tarea.completada).length;
    document.getElementById('task-total').textContent = total;
    document.getElementById('task-closed').textContent = realizadas;
}

// Función para actualizar la lista de tareas en la página
function actualizarListaTareas() {
    const tareaList = document.getElementById('tarea-list');
    tareaList.innerHTML = '';

    tareas.forEach(tarea => {
        const row = document.createElement('tr');

        const idCell = document.createElement('td');
        idCell.textContent = tarea.id;
        row.appendChild(idCell);

        const descripcionCell = document.createElement('td');
        descripcionCell.textContent = tarea.descripcion;
        row.appendChild(descripcionCell);

        const estadoCell = document.createElement('td');
        if (tarea.completada) {
            estadoCell.textContent = 'Realizado';
            descripcionCell.classList.add('completada');
        } else {
            estadoCell.innerHTML = '<button class="icon-button" onclick="cambiarEstadoTarea(' + tarea.id + ')"><i class="fa-regular fa-clipboard"></i></button>';
            descripcionCell.classList.remove('completada');
        }
        row.appendChild(estadoCell);

        const borrarCell = document.createElement('td');
        borrarCell.innerHTML = '<button class="icon-button" onclick="eliminarTarea(' + tarea.id + ')"><i class="bi bi-trash-fill"></i></button>';
        row.appendChild(borrarCell);

        tareaList.appendChild(row);
    });

    contarTareas();
}

// Obtener referencia a los elementos del DOM
const btnAgregar = document.getElementById('btn-agregar');
const inputTarea = document.getElementById('input-tarea');

// Agregar evento click al botón agregar tarea
btnAgregar.addEventListener('click', function () {
    const descripcion = inputTarea.value.trim();
    if (descripcion !== '') {
        agregarTarea(descripcion);
        inputTarea.value = '';
    } else {
        alert('Por favor, escribe una tarea');
    }
});

// Agregar evento keypress al input tarea para permitir agregar tareas con Enter
inputTarea.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        const descripcion = inputTarea.value.trim();
        if (descripcion !== '') {
            agregarTarea(descripcion);
            inputTarea.value = '';
        } else {
            alert('Por favor, escribe una tarea');
        }
    }
});

// Inicializar la lista de tareas en la página
actualizarListaTareas();
