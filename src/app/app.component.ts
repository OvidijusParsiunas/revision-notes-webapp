import {Component, OnInit, ViewEncapsulation, Inject, Injectable, ViewChild} from '@angular/core';
import {MatSidenavModule} from '@angular/material';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {DOCUMENT} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

interface noteInterface {
  text: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})

@Injectable()
export class AppComponent implements OnInit{
  //array of new note
  //array of edited notes
  //array of deleted notes
  topics = {};
  notes : noteInterface[] = [];
  newNotesIds = 0;
  editedNotes = {};
  currentTemplate;
  public changeText = false;
  public visible = false;
  public read = true;
  public pointerEvents = "auto";
  public height = "101%";
  public hoverable = {};
  public backgroundColor = {};
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

//Opporrtunity to explore the appearance of an invisible textArea if performance drops
  public createNote(){
    //this.notes.push({"text":"empty"});
    this.pointerEvents = "none";
    this.height = "72px";
    this.read = false;
    // var div = document.createElement("note");
    // div.id = "newNote" + this.newNotesIds;
    // document.getElementById("notesList").appendChild(div).focus();
    // this.newNotesIds++;
    // this.visible = true;
  };

  public hoverEffect(i){
    this.hoverable[i] = true;
    this.backgroundColor[i] = "rgb(234, 234, 234)";
  }

  public mouseLeave(i){
    this.hoverable[i] = false;
    this.backgroundColor[i] = "rgb(250, 250, 250)";
    console.log('Mouse left');
    if(this.currentTemplate !== undefined && this.currentTemplate.isOpen()){
      this.currentTemplate.close();
    }
}
public textAreaDirty(noteNumber){
  this.changeText = true;
  if(this.editedNotes[noteNumber] == undefined){
    this.editedNotes[noteNumber] = true;
  }
}
public removeNote(note){
  if (note > -1) {
    this.notes.splice(note, 1);
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
