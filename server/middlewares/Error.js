const ErrorHandler = require(`./ErrorHandler`);

module.exports = (err, res, req, next) =>{
    err.statusCode = err.statusCode || 500
    err.message = err.message || `Internal Server Error`

    // wrong MongoDb
    if (err.name === `CastError`) {
        const message = `Resources not Found with this id.. Invalid ${err.path}`;
        err = new ErrorHandler(message, 400)
    }
    // Duplicate key error
    if (err.code === 11000) {
        const message = `Duplicate key ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message, 400);
    }

    // wrong jwt error
    if (err.name === `JsonWebTokenError`) {
        const message = `Your URL is invalid try again latter`;
        err = new ErrorHandler(message, 400);
    }

    //if jwt expired
    if (err.name === `TokenExpiredError`) {
        const message = `Your URL is expired please try again later`;
        err = new ErrorHandler(message, 400);
    }
    res.status(err.statusCode).json({
        succes: false,
        message: err.message,
    })

}
