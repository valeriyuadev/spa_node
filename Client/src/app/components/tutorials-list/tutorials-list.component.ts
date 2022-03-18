import { Component, OnInit } from '@angular/core';

import { Tutorial } from 'src/app/models/tutorial.model';
import { TutorialService } from './../../services/tutorial.service';
import {CathegoriesService} from "../../services/cathegories.service";
import {ISearchParams} from "../tutorial-search/ISearchParams";
import {TutorialErrorsService} from "../../services/tutorial-errors.service";
import {ISortParams} from "./ISortParams";

@Component({
  selector: 'app-tutorials-list',
  templateUrl: './tutorials-list.component.html',
  styleUrls: ['./tutorials-list.component.css']
})
export class TutorialsListComponent implements OnInit {
  tutorials       ?: Tutorial[];

  selectedTutorial : Tutorial =  {
    title: '',
    description: '',
    author: '',
    image: '',
    cathegory: 0,
    createdAt: '',
    published: false
  };

  sortParams: ISortParams = {
    params: 'id',
    direction: 'desc'
  };

  sort = {
    id: 'id',
    title: 'title',
    author: 'author',
    asc: 'asc',
    desc: 'desc',
    createdAt: 'createdAt'
  }

  currentIndex  = -1;
  title         = '';
  searcFormShow = false;
  searcBtnTitle = 'show';
  searchParams  = null;
  sortFormShow  = false;

  constructor(
    private tutorialService: TutorialService,
    private cathegoriesService: CathegoriesService,
    private tutorialErrorsService: TutorialErrorsService
  ) {

  }

  ngOnInit(): void {
    this.retrieveTutorials(this.sortParams);
  }

  myRefreshList() {
    this.tutorials?.splice(this.currentIndex, 1);
    this.currentIndex = -1;
    this.title        = '';

    alert(`Deleted - "${this.selectedTutorial.title}"`);
    this.selectedTutorial = {};
  }

  refreshList(): void {
    this.retrieveTutorials(this.sortParams);

    this.selectedTutorial = {};
    this.currentIndex = -1;
  }

  setActiveTutorial(tutorial: Tutorial, index: number): void {
    this.selectedTutorial = tutorial;
    this.currentIndex = index;
  }

  removeAllTutorials(): void {
    this.tutorialService.deleteAll()
      .subscribe({
        next: (res) => {
          //console.table(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

  onSearchReset() {
    this.retrieveTutorials(this.sortParams);
    this.searchFormToggle();
    this.searchParams = null;
  }

  retrieveTutorials(sortParams: any = ''): void {
    this.tutorialService.getAll(this.sortParams)
      .subscribe({
        next: (data) => {
          this.tutorials = data;

          if(! data.length) {
            alert('Not found');
          }
        },
        error: e => this.tutorialErrorsService.showErrors(e.error.message)
      });
  }

  /**
   *
   * @param searchParams
   */
  onSearchStart(searchParams: any): void {
    this.selectedTutorial = {};
    this.currentIndex = -1;
    this.searchParams = searchParams;

    this.tutorialService.findByParams(searchParams, this.sortParams)
      .subscribe({
        next: (data) => {
          this.tutorials = data;

          if(! data.length) {
            alert('Not found');
          }
        },
        error: e => this.tutorialErrorsService.showErrors(e.error.message || e.message)
      });
  }

  onSortStart() {
    this.searchParams
      ? this.onSearchStart(this.searchParams)
      : this.retrieveTutorials();
  }

  getDate(date: any) {
    return this.tutorialService.getDateByFormat(date);
  }

  getCathegory(id: number = 0) {
    return this.cathegoriesService.getCathegory(id);
  }

  isImageSet(tutorial: Tutorial): boolean {
    return String(tutorial.image).trim().length > 5;
  }

  searchFormToggle() {
    this.searcFormShow = ! this.searcFormShow;

    this.searcBtnTitle = this.searcFormShow ? 'hide' : 'show';
  }
}
