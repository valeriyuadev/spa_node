import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TutorialDetailsComponent } from './components/tutorial-details/tutorial-details.component';
import { TutorialsListComponent } from './components/tutorials-list/tutorials-list.component';
import { AddTutorialComponent } from './components/add-tutorial/add-tutorial.component';
import { TutorialLoginComponent } from "./components/tutorial-login/tutorial-login.component";

const routes: Routes = [
  { path: 'login',         component: TutorialLoginComponent },
  { path: '',              redirectTo: 'tutorials', pathMatch: 'full' },
  { path: 'tutorials',     component: TutorialsListComponent },
  { path: 'add',           component: AddTutorialComponent },
  //{ path: 'tutorial/:id',  component: TutorialDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
