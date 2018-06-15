import {Component, OnInit, ViewEncapsulation, Inject, Injectable, ViewChildren} from '@angular/core';
import {MatSidenavModule} from '@angular/material';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {DOCUMENT} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

interface noteInterface {
  id: any;
  text: string;
  version: any;
}

interface postResponse{
  newIDs: {[key: string] : number};
  editedNotesVersions: {[key: string] : number};
  note: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})

@Injectable()
export class AppComponent implements OnInit{
  @ViewChildren('notesTemplate') generatedNotes;
  save = () => {
    this.parseRequiredSavedNotesForSending(this.generatedNotes.toArray().map(x => x.nativeElement));
  }

  //assembling the note id on the client side is much more performant as we do not need to iterate through the full array twice on the server side
  private parseRequiredSavedNotesForSending(notes){
    for(let i in notes){
      let textAreaProperties = notes[i].children[0].children[0].children[0];
      if(this.editedNotes[textAreaProperties.id]){
        this.editedNotes[textAreaProperties.id] = {"text":textAreaProperties.value,"version":this.editedNotes[textAreaProperties.id]};
      };
      if(this.newNotes[textAreaProperties.id]){
        //this.newNotes[textAreaProperties.id] = {"text":textAreaProperties.value,"version":version};
        this.newNotes[textAreaProperties.id] = textAreaProperties.value;
      }
    }
    var postBody = {};
    postBody['editedNotes'] = this.editedNotes;
    postBody['newNotes'] = this.newNotes;
    postBody['deletedNotes'] = this.deletedNotes;
    console.log(JSON.stringify(postBody));
    this.sendSavedNotes(postBody);
  }

  //array of new note
  //array of edited notes
  //array of deleted notes
  topics = {};
  notes : noteInterface[] = [];
  newNotesIds = 0;
  newNotes = {};
  newNotesWithParsedIDs = {};
  editedNotes = {};
  editedNotesWithParsedIDs = {};
  deletedNotes = {};
  currentlySelectedHTMLElement = {};
  newNoteId = 0;
  currentElementVersion = 0;
  currentTemplate;
  public changeText = false;
  public visible = false;
  public read = true;
  public pointerEvents = "auto";
  public height = "101%";
  public hoverable = {};
  public hoverable2 = {};
  public backgroundColor = {};
  public backgroundColor2 = {};
  constructor(@Inject(DOCUMENT) private document: any, private http: HttpClient) { }

  ngOnInit() {
    this.retrieveNotes('initialNotes');
    this.http.get('/data/topics')
    .subscribe(data => {
        this.topics = data;
    });
  }

  public retrieveNotes(title){
    this.http.get<noteInterface[]>('/data/notes/' + title).subscribe(data => {
      this.notes = data;
    });
  };

  private sendSavedNotes(body){
    this.http.post('/data/savedNotes', body).subscribe(res => {
      console.log(JSON.stringify(res));
      var response = res as postResponse;
      this.applyIDsToNewNotes(response.newIDs, response.editedNotesVersions);
    }, err => {
      console.log(JSON.stringify(err.error))});
  }

  private applyIDsToNewNotes(Ids, newEditedNotesVersions){
      var notesIndex = 0;
      for(notesIndex; notesIndex < this.notes.length; notesIndex++){
        if(Ids[this.notes[notesIndex].id]){
          this.notes[notesIndex].id = String(Ids[this.notes[notesIndex].id]);
        }
        else if(newEditedNotesVersions[this.notes[notesIndex].id]){
          this.notes[notesIndex].version = newEditedNotesVersions[this.notes[notesIndex].id];
        }
      }
      console.log(JSON.stringify(this.notes));
      this.purgeSavedData();
    }

//Opporrtunity to explore the appearance of an invisible textArea if performance drops
//Adding to a new array to stop the changeEffects from being tracked
  public createNote(){
    this.changeText = true;
    var newNoteDetails = {"id":"New"+this.newNoteId, "text":"empty", "version":1}
    this.notes.push(newNoteDetails);
    this.newNotes["New"+this.newNoteId] = true;
    this.newNoteId++;
    // this.pointerEvents = "none";
    // this.height = "72px";
    // this.read = false;
    // var div = document.createElement("note");
    // div.id = "newNote" + this.newNotesIds;
    // document.getElementById("notesList").appendChild(div).focus();
    // this.newNotesIds++;
    // this.visible = true;
  };

  public purgeSavedData(){
    this.editedNotes = {};
    this.newNotes = {};
    this.deletedNotes = {};
  }

//Using new methods in order to have hove effects for the new note elements
public hoverEffect(i){
  this.hoverable[i] = true;
  this.backgroundColor[i] = "rgb(234, 234, 234)";
}

  public hoverEffectNewNote(i){
    this.hoverable2[i] = true;
    this.backgroundColor2[i] = "rgb(234, 234, 234)";
  }

  public mouseLeave(i){
    this.hoverable[i] = false;
    this.backgroundColor[i] = "rgb(250, 250, 250)";
    console.log('Mouse left');
    if(this.currentTemplate !== undefined && this.currentTemplate.isOpen()){
      this.currentTemplate.close();
    }
}

public mouseLeaveNewNote(i){
  this.hoverable2[i] = false;
  this.backgroundColor2[i] = "rgb(250, 250, 250)";
  console.log('Mouse left');
  if(this.currentTemplate !== undefined && this.currentTemplate.isOpen()){
    this.currentTemplate.close();
  }
}

function1 = () => {this.textAreaDirty(this.currentlySelectedHTMLElement, this.editedNotes)};

public focused(focusedElement, version){
  if(focusedElement.target.id.substring(0,1) != 'N'){
    if(this.editedNotes[focusedElement.target.id] == false || this.editedNotes[focusedElement.target.id] == undefined){
      console.log('focused has been called');
      this.currentlySelectedHTMLElement = focusedElement.target;
      this.currentElementVersion = version;
      focusedElement.target.addEventListener('keydown', this.function1, false);
    }
  }
}

//workaround, keep reference of currently selected textbox
public textAreaDirty(textNote, editedNotes){
  this.changeText = true;
  textNote.removeEventListener('keydown', this.function1, false);
  editedNotes[textNote.id] = this.currentElementVersion;
  console.log(JSON.stringify(editedNotes));
}

public removeNote(note, noteId, version){
  if (note > -1) {
    this.notes.splice(note, 1);
  }
  if(this.editedNotes[noteId] == true){
    delete this.editedNotes[noteId];
  }

  if(noteId.substring(0,1) == 'N')
  {
    delete this.newNotes[noteId];
  }
  else{
    this.changeText = true;
    console.log(noteId);
    this.deletedNotes[noteId] = version;
  }
  this.hoverable[note] = false;
  this.backgroundColor[note] = "rgb(250, 250, 250)";
}

public mouseLeave2(i){
  this.currentTemplate.close();
}

public closeDirective(p){
  console.log(p);
  this.currentTemplate = p;
  this.currentTemplate.toggle();
}

//second deploy
 private identifyOrderOfNotes(){
   //use document to get all ids and their order
   //traverse array to find index position that is bigger than the next
 }
}

//Append a new component
//ComponentFactoryResolver

//Using ComponentFactoryResolver
//https://stackblitz.com/edit/angular-ygz3jg?file=app%2Fdcl-wrapper.component.ts

//Appending components
//http://plnkr.co/edit/tizrf1Nu9pu7gQc8cVTR?p=preview

//Sending data to a component template body
//https://toddmotto.com/angular-ngfor-template-element




//https://toddmotto.com/classes-vs-interfaces-in-typescript

//https://stackoverflow.com/questions/42521393/is-it-possible-to-initialize-an-object-inside-another-object-initialization-with

//https://alligator.io/angular/httpclient-intro/

//https://stackoverflow.com/questions/45426907/type-object-is-not-assignable-to-type-with-new-httpclient-httpgetmodule/45427080

//Class

// class noteInterface {
//     constructor(public text: string) { }
// }
//
// class notesInterface {
//     constructor(public notes: noteInterface[]) { }
// }

// notes: notesInterface = new notesInterface([new noteInterface("")]);

// notes: notesInterface = new notesInterface([new noteInterface("asdsadashu")]);

// public retrieveNotes(title){
//   this.http.get<notesInterface>('/data/notes/' + title).subscribe(data => {
//   });
// };


//Interface

// interface noteInterface {
//   text: string;
// }
//
// interface notesInterface {
//   notes: noteInterface[];
// }

// notes : notesInterface = {
//   notes: [{text: "asdiuas"}]
// };

// notes : notesInterface = {
//   notes: []
// };

// public retrieveNotes(title){
//   this.http.get<notesInterface>('/data/notes/' + title).subscribe(data => {
//     this.notes2 = data;
//   });
// };


//TO-DO retrieve the first topic

//https://stackoverflow.com/questions/34910928/angular2-error-if-dont-check-if-object-field-exists
//{{notes.notes && notes.notes[0].text}}

// interface noteInterface {
//   text: string;
// }
//
// interface notesInterface {
//   notes: noteInterface[];
// }
//
// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css'],
//   encapsulation: ViewEncapsulation.None
// })
//
// export class AppComponent implements OnInit{
//
//   topics = {};
//
//   notes2 : notesInterface = {
//     notes: []
//   };
//
//   constructor(private http: HttpClient) { }
//
//   ngOnInit() {
//     this.retrieveNotes('initialNotes');
//     this.http.get('/data/topics')
//     .subscribe(data => {
//         this.topics = data;
//     });
//   }
//
//   public retrieveNotes(title){
//     this.http.get<notesInterface>('/data/notes/' + title).subscribe(data => {
//       this.notes2 = data;
//     });
//   };
//
//   public createNote(){
//     console.log(JSON.stringify(this.notes2));
//   };
// }
