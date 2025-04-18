class DataUserController {
    async user(req, res) {
        res.status(200).json(req.user);
        return;
    }
    ;
}
;
export { DataUserController };
