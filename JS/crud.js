const CargarListado = async () => {
  try {
    const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=ff60f9dde54fdfe327e270d3d7cc6307&language=es-MX`);
    const datos = await respuesta.json();

    let peliculas = `
      <table class="table">
        <thead>
          <tr>
            <th>Poster</th>
            <th>ID</th>
            <th>Titulo</th>
            <th>Sinopsis</th>
            <th>Votacion</th>
            <th>ACCIONES</th>
          </tr>
        </thead>
        <tbody>`;

    datos.results.forEach((pelicula) => {
      peliculas += `
            <tr data-id="${pelicula.id}">
              <td class="poster-cell"><img src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}" alt="${pelicula.title}"></td>
              <td class="id-cell">${pelicula.id}</td>
              <td class="title-cell">${pelicula.title}</td>
              <td class="overview-cell">${pelicula.overview}</td>
              <td class="puntuacion">${pelicula.vote_average}</td>
              <td class="botones">
              <button class="crear" onClick="crearPelicula()">Crear</button> 
              <button class="actualizar" onclick="actualizarPelicula(${pelicula.id}, '${pelicula.title}', '${pelicula.overview}', ${pelicula.vote_average})">Actualizar</button>
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
    console.log(error);
  }
};


const eliminarPelicula = async (id) => {
  try {
    const respuesta = await fetch(`http://localhost:1000/delete/${id}`, {
      method: 'DELETE'
    });
    const resultado = await respuesta.json();
    console.log(resultado);
    alert("ELIMINADO CON EXITO")
    CargarListado();
  } catch (error) {
    console.log(error);
  }

};

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
    alert("PELICULA ACTUALIZADA CORRECTAMENTE")
  } catch (error) {
    console.error('Error al actualizar la película:', error);
  }
};

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
    alert('Película creada:', data);
  } catch (error) {
    console.error('Error al crear la película:', error);
  }
};

CargarListado()