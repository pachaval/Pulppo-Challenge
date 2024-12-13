# Instrucciones para levantar el proyecto

**Requerimientos:** tener instalado Node y Git

**Clonar repositorio:** 'git clone https://github.com/pachaval/Pulppo-Challenge.git' o ir a mi cuenta https://github.com/pachaval y buscar el repositorio.

**Incluir variables de ambiente:** agregar la URI de mongoDB provista al '.env' del proyecto.

**Instalar dependencias y levantar:** correr 'npm run pulppo' y una vez que aparezca el tic verde en la terminal de 'Ready' -> navegar a http://localhost:3000/.

Alternativamente, ejecutar los comandos encadenados 'npm install && npm run build && npm run dev' en el script individualmente.

**Issues y mejoras:** Hay algunos issues/mejoras/bugs que detecté pero que no llegué a solucionar.

- Visualización de errores. Falta algún mensaje al usuario si falla el endpoint o alguna ciudad no trae resultados.

- Mejoras visuales: se podría mejorar el layout en general, los loaders, los placeholders.

- Mas data: se podría agregar más información en la página para ayudar a tomar mejores conclusiones.

- Mejoras de propiedades: se podría clickear en una propiedad en el gráfico de barras para navegar a la propiedad en si y ver mas data. O incluso agregar abajo de los gráficos una tabla con toda la lista de propiedades y mas detalles.

- Comparador de ciudades: seleccionar varias ciudades y comparar su precio por m2 en un gráfico. No llegue a hacerlo, me parece una muy buena idea.

- Bug: algunas barras del gráfico de barras se chocan entre si y el tooltip muestra más datos de los que debería.
