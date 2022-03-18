import { Component, OnInit } from '@angular/core';

import { TutorialService } from './../../services/tutorial.service';
import { Tutorial } from './../../models/tutorial.model';
import { CathegoriesService } from "../../services/cathegories.service";
import {TutorialErrorsService} from "../../services/tutorial-errors.service";

@Component({
  selector: 'app-add-tutorial',
  templateUrl: './add-tutorial.component.html',
  styleUrls: ['./add-tutorial.component.css']
})
export class AddTutorialComponent implements OnInit {
  tutorial: Tutorial = {
    title       : '',
    description : '',
    author : '',
    image : '',
    cathegory: 0,
    published   : false,
  }

  submited : boolean = false;

  constructor(
    public cathegoriesService: CathegoriesService,
    private tutorialService: TutorialService,
    private tutorialErrorsService: TutorialErrorsService
  ) { }

  ngOnInit(): void {
  }

  saveTutorial(): void {
    this.tutorialService.create( this.tutorial )
      .subscribe({
        next: ( res ) => {
          console.log( 'saveTutorial() -> res -> ', res );

          this.submited = true;
        },
        error: (e) => this.tutorialErrorsService.showErrors(e.error.message )
      })
  };

  newTutorial(): void {
    this.submited = false;

    this.tutorial = {
      title       : '',
      description : '',
      published   : false,
    }
  }
}
