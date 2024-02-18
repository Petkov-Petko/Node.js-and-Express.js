export const errorHandler = ( err, req, res, next ) => {
    const statusCode = res.statusCode ? res.statusCode : 5000;

    switch (statusCode) {
        case 400:
            res.json({title: "Validation Failed", message: err.message, stackTrace: err.stack});
            break;
        case 404:
            res.json({title: "Not Found", message: err.message, stackTrace: err.stack});
            break
        default:
            break;
    }
};