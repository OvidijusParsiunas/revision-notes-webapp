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
  var identifiedValues = {};
  for(var key in deletedNotes){
    var val = key;
    notes.find(function(item, i){
      if(item.id == val){
        identifiedValues[key] = i;
      }
    })
  }
  for(var key in identifiedValues){
    delete notes[identifiedValues[key]];
  }
  notes = filter_array(notes);
  console.log(JSON.stringify(notes));
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
  {id:"10" , text: "note 0"},
  {id:"11" , text: "note 1"},
  {id:"12" , text: "note 2"},
  {id:"13" , text: "note 3"},
  {id:"14" , text: "note 4"},
  {id:"15" , text: "note 1"},
  {id:"16" , text: "note 2"},
  {id:"17" , text: "note 3"},
  {id:"18" , text: "note 4"}];
