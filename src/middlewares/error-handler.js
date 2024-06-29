import NotFoundError from "../errors/not-found-error.js";


export default function errorHandler(err, req, res, next) {

    // NotFoundError
    if (err instanceof NotFoundError) {
        return res.status(err.statusCode).send({errors: err.serializeErrors()})
    }

    // Default error
    res.status(500).send([{message: "Something went wrong!"}]);
}