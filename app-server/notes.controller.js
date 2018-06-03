exports.saveNotes = function(req, res) {
  notes = req.body;
  res.status(200);
    res.json({
      "note":"successfull-return"
    });
}

function compareNotes(localNote, clientNote){
}

var notes = [
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
  {text: "note 4"},];
