exports.signifyEdit = (req, res, next) => {
    req.session.isEditing = true;
    next();
}