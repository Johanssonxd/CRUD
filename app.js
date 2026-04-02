    // --- (Datos) ---
    let animales = [
        { id: 1, nombre: 'León', especie: 'Felino', habitat: 'Sabana', dieta: 'Carnívoro' },
        { id: 2, nombre: 'Elefante', especie: 'Mamífero', habitat: 'Sabana', dieta: 'Herbívoro' },
        { id: 3, nombre: 'Pingüino', especie: 'Ave', habitat: 'Antártida', dieta: 'Piscívoro' },
        { id: 4, nombre: 'Canguro', especie: 'Mamífero', habitat: 'Zonas Áridas', dieta: 'Herbívoro' },
        { id: 5, nombre: 'Oso Polar', especie: 'Mamífero', habitat: 'Regiones Árticas', dieta: 'Carnívoro' },
        { id: 6, nombre: 'Águila', especie: 'Ave', habitat: 'Montañas', dieta: 'Carnívoro' },
        { id: 7, nombre: 'Oso Panda', especie: 'Mamífero', habitat: 'Bosques', dieta: 'Herbívoro' },
        { id: 8, nombre: 'Tiburón Blanco', especie: 'Pez', habitat: 'Océanos', dieta: 'Carnívoro' },
        { id: 9, nombre: 'Lobo Gris', especie: 'Mamífero', habitat: 'Bosques/Tundras/Praderas', dieta: 'Carnívoro' },
        { id: 10, nombre: 'Delfín', especie: 'Mamífero', habitat: 'Océanos', dieta: 'Carnívoro' }
    ];

    let editando = false; //flag para saber si estamos editando
    let animalIdActual = null; //almacena el id del animal que se está editando (cuando editando=true)

    // --- DOM ---
    const form = document.getElementById('animal-form'); // Formulario de animales
    const tableBody = document.getElementById('tabla-animales'); // Cuerpo de la tabla
    const formTitle = document.getElementById('titulo-form'); // Título del formulario
    const btnCancelar = document.getElementById('btn-cancelar'); // Botón para cancelar edición

    // Inputs
    const inputId = document.getElementById('animal-id'); // Input oculto para el ID del animal
    const inputNombre = document.getElementById('nombre'); // Input para el nombre del animal
    const inputEspecie = document.getElementById('especie'); // Input para la especie del animal
    const inputHabitat = document.getElementById('habitat'); // Input para el hábitat del animal
    const inputDieta = document.getElementById('dieta'); // Input para la dieta del animal

    // Inicializar componentes de Materialize CSS
    M.AutoInit(); //Activa los componentes de Materialize
    M.updateTextFields(); //Dice a Materialize que actualice los labels de los inputs

    function renderizarTabla() { //Dibuja la tabla de animales basandose en el array "animales"
        tableBody.innerHTML = ''; // Limpia el cuerpo de la tabla para evitar duplicados

        animales.forEach(animal => { // Recorre el array de animales (iteración)
            const tr = document.createElement('tr'); // Crea una fila para cada animal
            tr.innerHTML = ` // Contenido de la fila con datos del animal
                <td>${animal.nombre}</td>
                <td>${animal.especie}</td>
                <td>${animal.habitat}</td>
                <td>${animal.dieta}</td>
                <td>
                    <a class="btn-floating btn-small waves-effect waves-light blue btn-editar" data-id="${animal.id}">
                        <i class="material-icons">edit</i>
                    </a>
                    <a class="btn-floating btn-small waves-effect waves-light red btn-eliminar" data-id="${animal.id}">
                        <i class="material-icons">delete</i> 
                    </a> // Arriba se marcan los botones de Editar y Eliminar con sus respectivos íconos para eliminar 
                    o editar el animal
                </td>
            `;
            tableBody.appendChild(tr); // Añade la fila al cuerpo de la tabla con los datos del animal agregados
        });

        asignarListenersBotones(); // Asigna los listeners a los botones de Editar y Eliminar
    }
    // --- FUNCIÓN (C)REATE y (U)PDATE ---
    form.addEventListener('submit', (e) => { // Maneja la creación y actualización de animales al enviar el formulario
        e.preventDefault(); // Evita el comportamiento por defecto del formulario (que recarga la página)

        // Recoge datos del formulario
        const datosAnimal = {
            nombre: inputNombre.value,
            especie: inputEspecie.value,
            habitat: inputHabitat.value,
            dieta: inputDieta.value
        };

        if (editando) { // Si estamos editando un animal existente
            animales = animales.map(animal => // Recorre el array de animales y actualiza el animal correspondiente que se está editando
                animal.id === animalIdActual ? { ...datosAnimal, id: animalIdActual } : animal
            );
            M.toast({ html: '¡Animal actualizado!' });

        } else { // Si estamos creando un nuevo animal cuando no estamos en modo edición
            datosAnimal.id = Date.now(); // Genera un ID único basado en la marca de tiempo actual
            animales.push(datosAnimal); // Añade el nuevo animal al array de animales
            M.toast({ html: '¡Animal añadido!' }); // Muestra un mensaje de confirmación de materialize
        }

        resetForm(); // Resetea el formulario después de enviar 
        
        renderizarTabla(); // Muestra los datos actualizados
    });

    // ---(D)ELETE ---
    function eliminarAnimal(id) { // Elimina un animal del array basado en su ID
        if (confirm('¿Seguro de eliminar este animal?')) { // Pregunta de confirmación antes de eliminar
            animales = animales.filter(animal => animal.id !== id); // Filtra el array para eliminar el animal con el ID especificado
            
            renderizarTabla(); // Actualiza la tabla para reflejar los cambios
            M.toast({ html: 'Animal eliminado' }); // Muestra un mensaje de confirmación de materialize
        }
    }

    function cargarDatosFormulario(id) {
        const animal = animales.find(a => a.id === id); // Busca el animal en el array por su ID

        if (!animal) return; // Si no se encuentra el animal, salir de la función

        // Cambiar estado a "editando"
        editando = true;
        animalIdActual = id;
        inputId.value = animal.id;
        inputNombre.value = animal.nombre;
        inputEspecie.value = animal.especie;
        inputHabitat.value = animal.habitat;
        inputDieta.value = animal.dieta;

        // Actualizar los labels de Materialize CSS
        M.updateTextFields();

        formTitle.textContent = 'Editar Animal';
        btnCancelar.classList.remove('hide');
    }

    // --- Resetear el formulario ---
    function resetForm() {
        form.reset();
        editando = false;
        animalIdActual = null;
        inputId.value = '';

        formTitle.textContent = 'Añadir Nuevo Animal';
        btnCancelar.classList.add('hide');

        M.updateTextFields();
    }

    function asignarListenersBotones() {
        // Botones de Editar
        document.querySelectorAll('.btn-editar').forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Obtener el ID desde el atributo data-id
                const id = parseInt(e.currentTarget.getAttribute('data-id'));
                cargarDatosFormulario(id);
            });
        });

        // Botones de Eliminar
        document.querySelectorAll('.btn-eliminar').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.currentTarget.getAttribute('data-id'));
                eliminarAnimal(id);
            });
        });
    }

    btnCancelar.addEventListener('click', resetForm);

    renderizarTabla();
;