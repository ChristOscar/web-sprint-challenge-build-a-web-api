// add middlewares here related to projects

function logger(req, res, next) {
    console.log({
        method: `${req.method}`,
        url: `${req.url}`,
        timestamp: `${Date.now()}`
    });
    next();
}

function validateProject(req, res, next) {
    const project = req.body;
    if(!project.name || !project.description){
        res.status(400).json({message: 'missing required field(s)'});
    } else if(!project.completed) {
        req.project = {
            completed: false,
            ...project
        }
        next();
    } else {
        req.project = project;
        next();
    }
}

module.exports = {logger, validateProject};