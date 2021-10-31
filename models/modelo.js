`use strict`

const mongoose=require(`mongoose`),
    db_options=require(`./dboptions.json`),
    Schema=mongoose.Schema,
    MovieSchema=new Schema({
        MovieID: String,
        Title: String,
        ReleaseMovie: String,
        Rating: Number,
        Image: String
    },{
        collection: `Movie`
    }),
    MovieModel=mongoose.model(`Movie`,MovieSchema)

mongoose.connect(`mongodb://${db_options.host}/${db_options.database}`)
//-CONEXION ATLAS
//mongoose.connect(`mongodb+srv://FrankCipriano:Swordfish19.@frankdev.5jihp.mongodb.net/Movies?retryWrites=true&w=majority`)

module.exports=MovieModel