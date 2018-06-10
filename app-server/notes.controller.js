exports.saveNotes = function(req, res) {
  notes = req.body;
  res.status(200);
    //respond with all the notes
    //if latency is an issue, respond with IDs for the new notes
    //replacement of the old ids
    res.json({
      "note":"successfull-return"
    });
    console.log(JSON.stringify(notes));
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
