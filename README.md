# Animal CRUD (Simulación de Datos)
Este es un proyecto sencillo de una Single Page Application (SPA) que permite gestionar un inventario de animales salvajes. Es un ejercicio práctico para demostrar operaciones CRUD (Create, Read, Update, Delete) utilizando lógica de programación en JavaScript y persistencia de datos simulada en memoria.


## Funcionalidades
- Lectura (Read): Visualización de una lista precargada de animales en una tabla dinámica.
- Creación (Create): Formulario para añadir nuevos animales con validación simple.
- Actualización (Update): Capacidad de editar los detalles de cualquier animal existente.
- Eliminación (Delete): Opción para borrar registros de la lista con confirmación de seguridad.
- Interfaz Adaptable: Diseño responsivo gracias al uso de componentes modernos.

## Tecnologías Utilizadas
- HTML5: Estructura semántica del sitio.
- JavaScript (Vanilla JS): Lógica del CRUD, manipulación del DOM y manejo de eventos.
- Materialize CSS: Framework de diseño basado en Material Design para una estética limpia y profesional.
- Material Icons: Para una interfaz intuitiva mediante el uso de iconos.

## Cómo funciona el código
1. Datos en Memoria: Los datos se almacenan en un array de objetos (animales). No requiere base de datos externa, lo que lo hace ideal para demostraciones rápidas.
1. Renderizado Dinámico: La función renderizarTabla() se encarga de actualizar la vista cada vez que el array de datos sufre un cambio.
1. Identificadores Únicos: Para los nuevos registros, se utiliza Date.now() para generar IDs únicos de forma sencilla.

## Uso
Copia la URL https://proyecto-18f7a.web.app/ en tu navegador preferido.
¡Listo! Ya puedes interactuar con el gestor de animales.
