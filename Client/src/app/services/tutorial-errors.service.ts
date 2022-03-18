import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TutorialErrorsService {
  constructor( private http: HttpClient ) { }

  showErrors(errors: any) {
    if(Array.isArray(errors)) {
      let text = "Errors\n-" + errors.join("\n-");

      return alert(text);
    }

    alert(errors);
  }
}
