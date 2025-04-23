export function errorMiddleware(error, req, res, next) {
    const statusCode = error.statusCode ?? 500;
    const message = error.statusCode ? error.message : 'Internal Server Error';
    console.error(error);
    res.status(statusCode).json({ error: message });
    return;
}
;
