import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Tutorial } from 'src/app/models/tutorial.model';
import { TutorialService } from 'src/app/services/tutorial.service';
import { TutorialErrorsService } from "../../services/tutorial-errors.service";
import { CathegoriesService } from "../../services/cathegories.service";
import { TutorialLoginService } from "../../services/tutorial-login.service";

@Component({
  selector: 'app-tutorial-details',
  templateUrl: './tutorial-details.component.html',
  styleUrls: ['./tutorial-details.component.css']
})
export class TutorialDetailsComponent implements OnInit {
  @Input() viewMode = false;

  @Input('currentTutorial') currentTutorial !: Tutorial ;

  // @Input() currentTutorial : Tutorial = {
  //   title: '',
  //   description: '',
  //   published: false
  // };

  @Output() forceRefreshListEvent = new EventEmitter<string>();

  message = '';

  cathegories !: string[];

  private is_alert : boolean = false;

  constructor(
    private tutorialService: TutorialService,
    private tutorialErrorsService: TutorialErrorsService,
    private cathegoriesService: CathegoriesService,
    private tutorialLoginService: TutorialLoginService,
    private route: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getTutorial(this.route.snapshot.params["id"]);
    }
  }

  fnForceRefreshList() {
    this.forceRefreshListEvent.emit( String(this.currentTutorial.id) );
  }

  getTutorial(id: string): void {
    this.tutorialService.get(id)
      .subscribe({
        next: (res) => {
          console.log(res);

          this.currentTutorial = res;
        },
        error: (e) => console.error(e)
      });
  }

  updatePublished(status: boolean): void {
    const data = {
      //title: this.currentTutorial.title,
      //description: this.currentTutorial.description,
      published: status
    };

    this.message = '';

    this.tutorialService.updatePublished(this.currentTutorial.id, data)
      .subscribe({
        next: (res) => {
          console.log(res);

          this.currentTutorial.published = status;
          this.message = res.message ? res.message : 'The status was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  updateTutorial(): void {
    this.message = '';

    this.tutorialService.update(this.currentTutorial.id, this.currentTutorial)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This tutorial was updated successfully!';
        },
        error: (e) => {
          //console.error('Error', e.error.message);
          console.error('Error', e);
          this.tutorialErrorsService.showErrors(e.error.message);
        }
      });
  }

  deleteTutorial(): void {
    if(! this.tutorialLoginService.isUserLogined()) {
      return alert('Pleace login first');
    }

    if(! confirm(`Delete this record - "${this.currentTutorial.title}"?`)) {
      return;
    }

    this.tutorialService.delete(this.currentTutorial.id)
      .subscribe({
        next: (res) => {
          console.log('responce deleteTutorial()');

          this.router.navigate(['/tutorials']);

          this.fnForceRefreshList();
        },
        error: (e) => console.error(e)
      });
  }

  getCathegories() {
    this.cathegories = this.cathegoriesService.getCathegories();

    return this.cathegories;
  }
}
