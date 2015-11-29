var express = require('express'),
  _ = require('lodash'),
  Project = require('./project');



var app = module.exports = express.Router();

app.get('/', function(req, res) {
  Project.find({
    userId: req.user.sub
  }).exec().then(function(projects) {
    res.status(200).send(projects);
  }, function(error) {
    res.status(400).send(err);
  });
});

app.get('/:id', function(req, res) {
  Project.findOne({
    _id: req.params.id,
    userId: req.user.sub
  }, function(err, project) {
    if (err) {
      res.status(400).send(err);
    } else if (!project) {
      res.status(404).send(err);
    } else {
      res.status(200).send(project);
    }
  });
});

app.put('/:id', function(req, res) {
  Project.update({
    _id: req.params.id,
    userId: req.user.sub
  }, _.omit(req.body, '_id'), function(err, project) {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(req.body);
    }
  });
});

app.delete('/:id', function(req, res) {
  Project.remove({
    _id: req.params.id,
    userId: req.user.sub
  }, function(err, project) {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(req.body);
    }
  });
});

app.post('/', function(req, res) {
  var project = new Project(_.extend(req.body, {
    userId: req.user.sub
  }));
  project.save(function(err, newProjectCreated) {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(201).send(newProjectCreated);
    }
  });
});
