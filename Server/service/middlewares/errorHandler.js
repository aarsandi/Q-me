const errorHandler = (err, req, res, next) => {
    switch(err.name) {
        case "BadRequest":
            res.status(400).json({error: err.error});
            break;
        case "NotFound":
            res.status(404).json({error: err.error});
            break;
    }
}

module.exports = errorHandler