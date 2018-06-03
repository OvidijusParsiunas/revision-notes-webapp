import {NgModule} from '@angular/core';
import {NoteComponent} from './note.component';
import {Autosize} from 'ng-autosize';

@NgModule({
  exports: [NoteComponent],
  declarations: [
    NoteComponent,
    Autosize
  ],
  imports: [
  ],
  entryComponents: [NoteComponent],
  providers: [],
  bootstrap: [NoteComponent]
})
export class NoteModule { }
