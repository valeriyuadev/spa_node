import { NgModule } from '@angular/core';
import { DatePipe } from "@angular/common";
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddTutorialComponent } from './components/add-tutorial/add-tutorial.component';
import { TutorialDetailsComponent } from './components/tutorial-details/tutorial-details.component';
import { TutorialsListComponent } from './components/tutorials-list/tutorials-list.component';
import { TutorialLoginComponent } from './components/tutorial-login/tutorial-login.component';
import { TutorialSearchComponent } from './components/tutorial-search/tutorial-search.component';


@NgModule({
  declarations: [
    AppComponent
    , AddTutorialComponent
    , TutorialDetailsComponent
    , TutorialsListComponent
    , TutorialLoginComponent
    , TutorialSearchComponent
  ],
  imports: [
    BrowserModule
    , AppRoutingModule
    , FormsModule
    , HttpClientModule
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
