`use strict`

const conexion=require(`./modelo`)

function DAO(){}

DAO.prototype.get=function(callback){
    conexion.find().exec((err,docs)=>{
        callback(err,docs)
    })
}
DAO.prototype.getOne=function(id,callback){
    conexion.findOne({MovieID:id}).exec((err,docs)=>{
        if(err) return err
        return callback(err,docs)
    })
}
DAO.prototype.postOrPut=function(afiche,callback){
    conexion.count({MovieID:afiche.MovieID}).exec((err,doc)=>{
        if(err) return err
        return (!doc)
            ? conexion.create(afiche,(err)=>{
                if (err)    return err
                return callback(err)
            })
            : conexion.findOneAndUpdate({MovieID:afiche.MovieID},
                {
                    Title: afiche.Title,
                    ReleaseMovie: afiche.ReleaseMovie,
                    Rating: afiche.Rating,
                    Image: afiche.Image
                },(err)=>{
                    if (err)    return err
                    return callback(err)
                })
    })
}
DAO.prototype.delete=function(id,callback){
    conexion.remove({MovieID:id},(err,docs)=>{
        if (err) return err
        return callback(err,docs)
    })
}
DAO.prototype.close=function(){
    conexion.end()
}

module.exports = new DAO()