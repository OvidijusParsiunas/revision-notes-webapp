var express = require('express');
var router = express.Router();
var notesController = require('../app-server/notes.controller.js');

router.get('/notes/:title', function(req, res, next) {
  res.json([
    {id:"0" , text: "note 0"},
    {id:"1" , text: "note 1"},
    {id:"2" , text: "note 2"},
    {id:"3" , text: "note 3"},
    {id:"4" , text: "note 4"},
    {id:"5" , text: "note 1"},
    {id:"6" , text: "note 2"},
    {id:"7" , text: "note 3"},
    {id:"8" , text: "note 4"}]
  );
});

router.get('/topics', function(req, res, next) {
  res.json({topics:[
    {title: "Topic 1"},
    {title: "Topic 2"},
    {title: "Topic 3"},
    {title: "Topic 4"},
    {title: "Topic 1"},
    {title: "Topic 2"},
    {title: "Topic 3"},
    {title: "Topic 4"},
    {title: "Topic 1"},
    {title: "Topic 2"},
    {title: "Topic 3"},
    {title: "Topic 4"},
    {title: "Topic 1"},
    {title: "Topic 2"},
    {title: "Topic 3"},
    {title: "Topic 4"},
    {title: "Topic 1"},
    {title: "Topic 2"},
    {title: "Topic 3"},
    {title: "Topic 4"},
    {title: "Topic 1"},
    {title: "Topic 2"},
    {title: "Topic 3"},
    {title: "Topic 4"},
    {title: "Topic 1"},
    {title: "Topic 2"},
    {title: "Topic 3"},
    {title: "Topic 4"},
    {title: "Topic 1"},
    {title: "Topic 2"},
    {title: "Topic 3"},
    {title: "Topic 4"},
    {title: "Topic 1"},
    {title: "Topic 2"},
    {title: "Topic 3"},
    {title: "Topic 4"},
    {title: "Topic 1"},
    {title: "Topic 2"},
    {title: "Topic 3"},
    {title: "Topic 4"},
    {title: "Topic 1"},
    {title: "Topic 2"},
    {title: "Topic 3"},
    {title: "Topic 4"}]
  });
});

router.post('/savedNotes', notesController.saveNotes);

module.exports = router;
