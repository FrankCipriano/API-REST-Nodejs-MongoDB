`use strict`

const dao=require(`../models/modelo_conexion`)

function Controlador(){}

Controlador.prototype.get=function(req,res,next){
    dao.get((err,docs)=>{
        if(err){
            const respuestas={
                title:`No fue posible obtener los datos`,
                descripcion: `Puede ser que la base de datos esta fuera de servicio`,
                error:err
            }
            return res.render(`404`,respuestas)
        }
        
        const respuestas={
            title:`Lista de Peliculas`,
            results:docs
        }
        return res.render(`index`,respuestas)
    })
}
Controlador.prototype.getOne=function(req,res,next){
    const movie_id=req.params.MovieID

    dao.getOne(movie_id,(err,docs)=>{
        if(err){
            const respuestas={
                title:`Ups.! no puedes editar la pelicula con ID: ${movie_id}`,
                descripcion: `Puede haber un error de Sintaxis SQL al tratar de obtener los datos o que la base de datos esta fuera de servicio`,
                error:err
            }
            return res.render(`404`,respuestas)
        }

        const opciones={
            title:`Volver a la página de Inicio`,
            pelicula:docs
        }
        return res.render(`edit_peli`,opciones)
    })
}
Controlador.prototype.postOrPut=function(req,res,next){
    const afiche={
        MovieID:    req.body.MovieID,
        Title:      req.body.Title,
        ReleaseMovie:req.body.ReleaseMovie,
        Rating:     parseFloat(req.body.Rating),
        Image:      req.body.Image
    }

    dao.postOrPut(afiche,(err,docs)=>{
        if(err){
            const respuestas={
                title:`No fue posible guardar los datos de la pelicula con ID: ${afiche.MovieID}`,
                descripcion: `Puede ser un error de Sintaxis NoSQL o que la base de datos esta fuera de servicio`,
                error:err
            }
            return res.render(`404`,respuestas)
        }
        return res.redirect(`/`)
    })
}
Controlador.prototype.delete=function(req,res,next){
    const movie_id=req.params.MovieID

    dao.delete(movie_id,(err,docs)=>{
        if(err){
            const respuestas={
                title:`Ups.! no fue posible eliminar la pelicula con ID: ${movie_id}`,
                descripcion: `Puede haber un error de Sintaxis SQL al tratar de obtener los datos o que la base de datos esta fuera de servicio`,
                error:err
            }
            return res.render(`404`,respuestas)
        }
        return res.redirect(`/`)
    })
}
Controlador.prototype.generarFormulario=function(req,res,next){
    res.render(`add_peli`,{title:`volver a la página de Inicio`})
}
Controlador.prototype.error404=function(req,res,next){
    const error=new Error()
    error.statusCode=404
    error.statusText=`Recurso no encontrado`

    const opciones={
        title: error.statusCode,
        descripcion:error.statusText,
    }
    res.render(`404`,opciones)
}

module.exports = new Controlador()