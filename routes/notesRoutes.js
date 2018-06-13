var express = require('express');
var router = express.Router();
var notesController = require('../app-server/notes.controller.js');

router.get('/notes/:title', function(req, res, next) {
  res.json([
    {id:"10" , text: "note 0", version: 1},
    {id:"11" , text: "note 1", version: 1},
    {id:"12" , text: "note 2", version: 1},
    {id:"13" , text: "note 3", version: 1},
    {id:"14" , text: "note 4", version: 1},
    {id:"15" , text: "note 1", version: 1},
    {id:"16" , text: "note 2", version: 1},
    {id:"17" , text: "note 3", version: 1},
    {id:"18" , text: "note 4", version: 1}]
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
