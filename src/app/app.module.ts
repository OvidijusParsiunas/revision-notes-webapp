import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MatListModule, MatSidenavModule, MatToolbarModule, MatIconModule, MatButtonModule} from '@angular/material';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Autosize} from 'ng-autosize';
import {HttpClientModule} from '@angular/common/http';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {ScrollToModule} from '@nicky-lenaers/ngx-scroll-to';
//import {NoteModule} from './notes/note.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  exports: [
    MatSidenavModule
  ],
  declarations: [
    AppComponent,
    Autosize,
    AppComponent
  ],
  imports: [
    ScrollToModule.forRoot(),
    BrowserAnimationsModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    BrowserModule,
    HttpClientModule,
    MatButtonModule,
    NgbModule.forRoot()
  ],
  entryComponents: [AppComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
//platformBrowserDynamic().bootstrapModule(AppModule);
