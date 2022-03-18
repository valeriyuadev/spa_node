import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { CathegoriesService } from "../../services/cathegories.service";
import { ISearchParams } from "./ISearchParams";


@Component({
  selector: 'app-tutorial-search',
  templateUrl: './tutorial-search.component.html',
  styleUrls: ['./tutorial-search.component.css']
})
export class TutorialSearchComponent implements OnInit {
  @Output() onSearchEvent = new EventEmitter<ISearchParams>();
  @Output() onSearchResetEvent = new EventEmitter();

  searchParams !: ISearchParams;

  constructor(public cathegoriesService: CathegoriesService) {
    this.searchReset();
  }

  ngOnInit(): void {

  }

  searchStart() {
    this.onSearchEvent.emit(this.searchParams);
  }

  searchReset() {
    this.searchParams = {
      title:       '',
      description: '',
      cathegory:   0,
      hasImage:    -1,
      published:   -1,
      author:      '',
      intersect:   0,
    }

    this.onSearchResetEvent.emit();
  }

  getCathegories() {
    return [
      ...this.cathegoriesService.getCathegories(),
      'Any variant'
    ];
  }
}
