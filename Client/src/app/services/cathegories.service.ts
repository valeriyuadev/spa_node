import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CathegoriesService {
  private cathegories : string[] = [
    'Not set',
    'Php',
    'Javascript',
    'Symfony',
    'Node.js',
    'Angular'
  ];

  constructor( private http: HttpClient ) { }

  getCathegories() : string[]
  {
    return this.cathegories;
  }

  getCathegory(id: number): string {
    // @ts-ignore
    if(id > -1 && 'undefined' !== typeof this.cathegories[id]) {
      // @ts-ignore
      return this.cathegories[id];
    }

    return '';
  }
}
