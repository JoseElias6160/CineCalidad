// Función para cargar la lista de películas desde la base de datos
const CargarListado = async () => {
  try {
    const respuesta = await fetch('http://localhost:1000/get');
    const datos = await respuesta.json();

    console.log('Datos recibidos:', datos);  // Añadir esta línea para verificar los datos recibidos

    let peliculas = `
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Titulo</th>
            <th>Sinopsis</th>
            <th>Votacion</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>`;

    datos.forEach((pelicula) => {
      peliculas += `
            <tr data-id="${pelicula.id}">
              <td class="id-cell">${pelicula.id}</td>
              <td class="title-cell">${pelicula.titulo}</td>
              <td class="overview-cell">${pelicula.descripcion}</td>
              <td class="puntuacion">${pelicula.votacion}</td>
              <td class="botones">
                <button class="crear" onClick="crearPelicula()">Crear</button>
                <button class="actualizar" onclick="actualizarPelicula(${pelicula.id}, '${pelicula.titulo}', '${pelicula.descripcion}', ${pelicula.votacion})">Actualizar</button>
                <button class="delete" onclick="eliminarPelicula(${pelicula.id})">Eliminar</button>
              </td>
            </tr>
          `;
    });
    peliculas += `
        </tbody>
      </table>`;

    document.getElementById("contenedor_api").innerHTML = peliculas;
  } catch (error) {
    console.log('Error al cargar el listado:', error);
  }
};

// Función para manejar la creación de una película
const crearPelicula = async () => {
  try {
    const titulo = prompt('Ingrese el título de la nueva película:');
    const descripcion = prompt('Ingrese la descripción de la nueva película:');
    const votacion = parseFloat(prompt('Ingrese la votación de la nueva película:'));

    const response = await fetch('http://localhost:1000/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        titulo: titulo,
        descripcion: descripcion,
        votacion: votacion
      })
    });

    const data = await response.json();
    console.log('Película creada:', data);
    CargarListado(); // Actualizar la lista de películas después de la creación
  } catch (error) {
    console.error('Error al crear la película:', error);
  }
};

// Función para manejar la actualización de una película
const actualizarPelicula = async (id, titulo, descripcion, votacion) => {
  try {
    const updatedTitulo = prompt('Ingrese el nuevo título:', titulo);
    const updatedDescripcion = prompt('Ingrese la nueva descripción:', descripcion);
    const updatedVotacion = prompt('Ingrese la nueva votación:', votacion);

    const response = await fetch(`http://localhost:1000/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        titulo: updatedTitulo,
        descripcion: updatedDescripcion,
        votacion: parseFloat(updatedVotacion)
      })
    });

    const data = await response.json();
    console.log('Película actualizada:', data);
    CargarListado(); // Actualizar la lista de películas después de la actualización
  } catch (error) {
    console.error('Error al actualizar la película:', error);
  }
};

// Función para manejar la eliminación de una película
const eliminarPelicula = async (id) => {
  try {
    const response = await fetch(`http://localhost:1000/delete/${id}`, {
      method: 'DELETE'
    });
    const resultado = await response.json();
    console.log(resultado);

    CargarListado();
  } catch (error) {
    console.error('Error al eliminar la película:', error);
  }
};

// Cargar el listado al cargar la página
CargarListado();
