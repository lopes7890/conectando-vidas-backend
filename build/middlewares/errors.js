export function errorMiddleware(err, req, res, next) {
    console.error(err);
    res.status(500).json({ error: "internal fail, try again" });
}
