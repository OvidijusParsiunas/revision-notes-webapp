exports.saveNotes = function(req, res) {
  var savedNotes = req.body;
  var newIDs = addNewNotes(savedNotes.newNotes);
  updateEditedNotes(savedNotes.editedNotes);
  removeDeletedNotes(savedNotes.deletedNotes);
  /////////////////////////!!!!Can still add new note version on the client side
  res.status(returnCode);
  //respond with all the notes
  //if latency is an issue, respond with IDs for the new notes
  //replacement of the old IDs
  res.json({newIDs, editedNotesVersions,
    "note":"successfull-return"
  });
  editedNotesVersions = {};
}

var number = 73;
var editedNotesVersions = {};
var returnCode = 200;
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
  const orderedEditedNotes = orderKeys(editedNotes);
  for(var key in orderedEditedNotes){
    var notesIndex = 0;
    for(notesIndex; notesIndex < notes.length; notesIndex++){
      if(notes[notesIndex].id == key){
        if(notes[notesIndex].version == orderedEditedNotes[key].version){
          notes[notesIndex].text = orderedEditedNotes[key].text;
          editedNotesVersions[key] = ++notes[notesIndex].version;
          console.log('same versions of notes');
        }
        else{
          console.log('we have a conflict');
        }
        break;
      }
    }
  }
}

function orderKeys(JSONObjects){
  const ordered = {};
  Object.keys(JSONObjects).sort().forEach(function(key) {
    ordered[key] = JSONObjects[key];
  });
  return ordered;
}

function removeDeletedNotes(deletedNotes){
  const orderedDeletedNotes = orderKeys(deletedNotes);
  for(var key in orderedDeletedNotes){
    var notesIndex = 0;
    for(notesIndex; notesIndex < notes.length; notesIndex++){
      if(notes[notesIndex] != null && notes[notesIndex].id == key){
        delete notes[notesIndex];
        break;
      }
    }
  }
  notes = filter_array(notes);
}

function filter_array(test_array) {
    let index = -1;
    const arr_length = test_array ? test_array.length : 0;
    let resIndex = -1;
    const result = [];

    while (++index < arr_length) {
        const value = test_array[index];

        if (value) {
            result[++resIndex] = value;
        }
    }

    return result;
}

var notes = [
  {id:"10" , text: "note 0", version: 1},
  {id:"11" , text: "note 1", version: 1},
  {id:"12" , text: "note 2", version: 1},
  {id:"13" , text: "note 3", version: 1},
  {id:"14" , text: "note 4", version: 1},
  {id:"15" , text: "note 1", version: 1},
  {id:"16" , text: "note 2", version: 1},
  {id:"17" , text: "note 3", version: 1},
  {id:"18" , text: "note 4", version: 1}];
