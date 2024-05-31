
document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const peliculaId = params.get("id");

    cargarDetallesPelicula(peliculaId);
});

async function cargarDetallesPelicula(peliculaId) {
    try {
        const peliculaRespuesta = await fetch(
            `https://api.themoviedb.org/3/movie/${peliculaId}?api_key=ff60f9dde54fdfe327e270d3d7cc6307&language=es-MX`
        );

        const trailerRespuesta = await fetch(
            `https://api.themoviedb.org/3/movie/${peliculaId}/videos?api_key=ff60f9dde54fdfe327e270d3d7cc6307&language=es-MX`
        );

        if (peliculaRespuesta.status === 200 && trailerRespuesta.status === 200) {
            const pelicula = await peliculaRespuesta.json();
            const trailers = await trailerRespuesta.json();

            // Encuentra el tráiler oficial en YouTube
            const trailer = trailers.results.find(
                (video) => video.type === "Trailer" && video.site === "YouTube"
            );

            const detallesHTML = `
                <a href="Principal.html"><button>⬅️ Back</button></a>
                <h2>${pelicula.title}</h2>
                <div class="contenedor">
                    <img src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}" alt="${pelicula.title}">
                    </div>
                <p>${pelicula.overview}</p>
                <p>Fecha de lanzamiento: ${pelicula.release_date}</p>
                <p> Calificacion: ⭐ ${pelicula.vote_average} ⭐</p>
                ${trailer
                    ? `<iframe width="560" height="315" src="https://www.youtube.com/embed/${trailer.key}" frameborder="0" allowfullscreen></iframe>`
                    : "<p>Tráiler no disponible.</p>"
                }
            `;

            document.getElementById("detalles-pelicula").innerHTML = detallesHTML;
        } else {
            console.log("Error al cargar los detalles de la película o el tráiler");
        }
    } catch (error) {
        console.log(error);
    }
}
