const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');

const prisma = new PrismaClient();
const app = express();

app.use(cors({ origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE'], allowedHeaders: ['Content-Type', 'Authorization'] }));
app.use(express.json());

async function saveMoviesToDatabase() {
  const response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=ff60f9dde54fdfe327e270d3d7cc6307&language=es-MX');
  const data = await response.json();

  for (const movieData of data.results) {
    await prisma.post.create({
      data: {
        id: movieData.id,
        titulo: movieData.title,
        descripcion: movieData.overview,
        votacion: movieData.vote_average
      }
    });
  }
}
saveMoviesToDatabase();


app.get('/get', async (req, res) => {
  const result = await prisma.post.findMany();
  res.json(result);
});

app.post('/post', async (req, res) => {
  const { titulo, descripcion, votacion } = req.body;
  const result = await prisma.post.create({
    data: {
      titulo,
      descripcion,
      votacion
    }
  });
  res.json(result);
});

app.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { titulo, descripcion, votacion } = req.body;

  const result = await prisma.post.update({
    where: { id: Number(id) },
    data: {
      titulo,
      descripcion,
      votacion
    }
  });

  res.json({ message: 'Película actualizada correctamente', updatedPost: result });
});


app.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  const result = await prisma.post.delete({
    where: { id: Number(id) }
  });
  res.json('ELIMINADO CORRECTAMENTE');
});

app.listen(5500, () => {
  console.log('Server is running on port 5500');
});

