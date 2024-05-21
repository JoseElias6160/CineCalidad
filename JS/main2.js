
function mostrarSeccion(target) {
  const secciones = document.getElementsByTagName("section");
  for (let i = 0; i < secciones.length; i++) {
    secciones[i].style.display = "none";
  }
  const seccionMostrar = document.getElementById(target);
  if (seccionMostrar) {
    seccionMostrar.style.display = "block";
  }
}


let pagina = 1;
const btnAnterior = document.getElementById("btnAnterior");
const btnSiguiente = document.getElementById("btnSiguiente");

btnSiguiente.addEventListener("click", () => {
  pagina += 1;
  CargarPeliculas();
});

btnAnterior.addEventListener("click", () => {
  if (pagina > 1) pagina -= 1;
  CargarPeliculas();
});

const CargarPeliculas = async () => {
  try {
    const respuesta = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=ff60f9dde54fdfe327e270d3d7cc6307&language=es-MX&page=${pagina}`
    );

    if (respuesta.status === 200) {
      const datos = await respuesta.json();
      

      let peliculas = "";

      datos.results.forEach((pelicula) => {
        peliculas += `
        <div class="pelicula" id="${pelicula.id}">
            <a href="detalle_pelicula.html?id=${pelicula.id}"><img class="poster"  src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}"></a>
        </div>
        <h3 class="titulo"> ${pelicula.title}</h3>
        `;
      });
      document.getElementById("contenedor").innerHTML = peliculas;

      // Agregar evento de clic a cada póster de película
      const posters = document.querySelectorAll('.pelicula');
      posters.forEach(poster => {
        poster.addEventListener('click', function() {
          const peliculaId = this.getAttribute('id');
          window.location.href = `detalle_pelicula.html?id=${peliculaId}`;
        });
      });
    } else if (respuesta.status == 404) {
      console.log("LA PELICULA NO EXISTE EN LA BASE DE DATOS");
    }
  } catch (error) {
    console.log(error);
  }

};

CargarPeliculas();



const CargarSeries = async () => {
  try {
    const serie = await fetch(
      `https://api.themoviedb.org/3/tv/popular?api_key=ff60f9dde54fdfe327e270d3d7cc6307&language=es-ES&page=${pagina}`
    );

    if (serie.status === 200) {
      const datos = await serie.json();

      let series = "";
      datos.results.forEach((serie) => {
        series += `
        <div class="series">
            <img class="poster"  src="https://image.tmdb.org/t/p/w500/${serie.poster_path}">
        </div>
        <h3 class="titulo"> ${serie.name}</h3>
        `;
      });
      document.getElementById("conte").innerHTML = series;
    } else if (serie.status == 404) {
      console.log("LA SERIE NO EXISTE EN LA BASE DE DATOS");
    }
  } catch (error) {
    console.log(error);
  }
};
CargarSeries();



  