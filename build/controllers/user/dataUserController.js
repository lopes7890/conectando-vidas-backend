class DataUser {
    async user(req, res) {
        res.status(200).json(req.user);
        return;
    }
    ;
}
;
export { DataUser };
