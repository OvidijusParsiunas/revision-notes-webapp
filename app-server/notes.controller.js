exports.saveNotes = function(req, res) {
  var savedNotes = req.body;
  res.status(200);
    //respond with all the notes
    //if latency is an issue, respond with IDs for the new notes
    //replacement of the old IDs
    res.json({
      "note":"successfull-return"
    });
    var newIDs = addNewNotes(savedNotes.newNotes);
    updateEditedNotes(savedNotes.editedNotes);
    removeDeletedNotes(savedNotes.deletedNotes);
}

var number = 73;

function addNewNotes(newNotes){
  var newIDs = {};
  for(var key in newNotes){
    newIDs[key] = number;
    notes.push({"id": number, "text":newNotes[key]});
    number++;
  }
  return newIDs;
}

function updateEditedNotes(editedNotes){
  //console.log('Edited notes ' + JSON.stringify(editedNotes));
}

function removeDeletedNotes(deletedNotes){
  //console.log('Removed notes ' + JSON.stringify(deletedNotes));
}

var notes = [
  {id:"0" , text: "note 0"},
  {id:"1" , text: "note 1"},
  {id:"2" , text: "note 2"},
  {id:"3" , text: "note 3"},
  {id:"4" , text: "note 4"},
  {id:"5" , text: "note 1"},
  {id:"6" , text: "note 2"},
  {id:"7" , text: "note 3"},
  {id:"8" , text: "note 4"}];
