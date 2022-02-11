// Write your "projects" router here!
const Project = require('../projects/projects-model');
const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    Project.get()
    .then(projects => {
        if(!projects) {
          res.status(200).json([])
        } else {
        res.status(200).json(projects);
        }
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({message: "The Projects are running into a error, Try again!"});
    })
});

router.get('/:id', (req, res) => {
    Project.get(req.params.id)
      .then(project => {
        if (!project) {
            res.status(404).json({
              message: "The project with the specified ID does not exist, Try again!"
            })
          } else {
          res.status(200).json(project)}
      })
      .catch(err => {
        res.status(500).json({
          message: "The post information could not be retrieved, Try again!",
          error: err.message
        })
      })
  })

module.exports = router;