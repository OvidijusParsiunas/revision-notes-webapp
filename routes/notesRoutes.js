var express = require('express');
var router = express.Router();
var notesController = require('../app-server/notes.controller.js');

router.get('/notes/:title', function(req, res, next) {
  res.json([
    {text: "note 1"},
    {text: "note 2"},
    {text: "note 3"},
    {text: "note 4"},
    {text: "note 1"},
    {text: "note 2"},
    {text: "note 3"},
    {text: "note 4"},
    {text: "note 1"},
    {text: "note 2"},
    {text: "note 3"},
    {text: "note 4"},
    {text: "note 1"},
    {text: "note 2"},
    {text: "note 3"},
    {text: "note 4"},
    {text: "note 1"},
    {text: "note 2"},
    {text: "note 3"},
    {text: "note 4"},
    {text: "note 1"},
    {text: "note 2"},
    {text: "note 3"},
    {text: "note 4"},
    {text: "note 1"},
    {text: "note 2"},
    {text: "note 3"},
    {text: "note 4"},
    {text: "note 1"},
    {text: "note 2"},
    {text: "note 3"},
    {text: "note 4"}]
  );
});

router.get('/topics', function(req, res, next) {
  res.json({topics:[
    {title: "Topic 1"},
    {title: "Topic 2"},
    {title: "Topic 3"},
    {title: "Topic 4"}]
  });
});

router.post('/postSomething', notesController.saveNotes);

module.exports = router;
