const express= require('express')
const {PrismaClient}=require('@prisma/client')

const prisma = new PrismaClient()
const app= express()

app.use(express.json())

// SOLO SE EJECUTA UNICA VEZ
/* async function saveMoviesToDatabase() {
    // Hacer solicitud a la API
    const response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=ff60f9dde54fdfe327e270d3d7cc6307&language=es-MX');
    const data = await response.json();
    
    // Procesar los datos y guardar en la base de datos
    for (const movieData of data.results) {
      await prisma.post.create({
        data: {
          id:movieData.id,
          titulo: movieData.title,
          descripcion: movieData.overview,
          votacion: movieData.vote_average
      
        }
      });
    }
  }
  
  saveMoviesToDatabase()
     */




//CONSULTAR REGISTROS EN MI BASE DE DATOS
app.get(`/get`,async(req,res)=>{
    const result= await prisma.post.findMany()
    res.json(result)
})

//ACTUALIZAR UN REGISTRO
app.put(`/put/:id`,async(req,res)=>{
    const {id}= req.params
    const {titulo,descripcion,votacion}=req.body
    const result= await prisma.post.update({
        where: {id: Number(id)},
        data: {
            titulo,
            descripcion,
            votacion
        }
            })
            res.json(result)
})

//ELIMINAR UN REGISTRO DE LA BASE DE DATOS
app.delete(`/delete/:id`,async(req,res)=>{
    const {id}= req.params
    const result= await prisma.post.delete({
        where: {id: Number(id)}
        })
        res.json('ELIMINADO CORRECTAMENTE')

})


app.listen(1000,()=>{
    console.log('Server is running on port 1000')
})