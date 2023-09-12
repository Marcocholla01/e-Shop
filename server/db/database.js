const mongoose = require(`mongoose`)
const port = 27017

const connectDatabase =()=>{
    mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology:true,
    }).then((data) => {
    console.log(`mongoDB connected with server on : http://${data.connection.host}:${port}`)
    })
}

module.exports = connectDatabase;
