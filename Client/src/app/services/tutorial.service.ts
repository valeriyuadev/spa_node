import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

import { Tutorial } from '../models/tutorial.model';
import { ThrowStmt } from '@angular/compiler';
import { apiUrl } from '../../assets/config';
import { ISearchParams } from "../components/tutorial-search/ISearchParams";
import {ISortParams} from "./../components/tutorials-list/ISortParams";
import {TutorialLoginService} from "./tutorial-login.service";

@Injectable({
  providedIn: 'root'
})
export class TutorialService {
  searchUrl = '';

  constructor(
    private http: HttpClient,
    private datePipe: DatePipe,
    private tutorialLoginService: TutorialLoginService
  ) { }

  get( id: any ): Observable< Tutorial > {
    return this.http.get( `${apiUrl}/${id}`);
  }

  create( data: any): Observable< any > {
    return this.http.post( apiUrl, data );
  }

  updatePublished( id: any, data: any ): Observable< any > {
    return this.http.put( `${apiUrl}/${id}/published`, data );
  }

  update( id: any, data: any ): Observable< any > {
    return this.http.put( `${apiUrl}/${id}`, data );
  }

  delete( id: any ): Observable< any > {
    let headers = new HttpHeaders({ 'x-access-token': this.tutorialLoginService.getUserToken() })

    return this.http.delete( `${apiUrl}/${id}`, { headers });
  }

  deleteAll(): Observable< any > {
    return this.http.delete( apiUrl );
  }

  /**
   *
   * @param title
   */
  findByTitle( title: any ): Observable< Tutorial[] >
  {
    return this.http.get< Tutorial[] >( `${apiUrl}?title=${title}`);
  }

  /**
   *
   * @param sortParams
   */
  getAll(sortParams: ISortParams) : Observable< Tutorial[] >
  {
    let url = apiUrl
              + '?'
              + this.getSortParamsStr(sortParams);

    return this.http.get< Tutorial[] >(url);
  }

  /**
   *
   * @param data
   * @param sortParams
   */
  findByParams( data: ISearchParams, sortParams: ISortParams ): Observable< Tutorial[] >
  {
    let params = Object
      .entries(data)
      .map(el=>{
        let [k, v] = el;

        v = encodeURIComponent(String(v).trim());

        return `${k}=${v}`;
      })
      .join('&') ;

    let url = `${apiUrl}?s=1&${params}&` ;

    url += this.getSortParamsStr(sortParams);

    return this.http.get< Tutorial[] >(url);
  }

  /**
   *
   * @param sortParams
   */
  getSortParamsStr(sortParams: ISortParams): string
  {
    let url = `sort=${sortParams.params}|${sortParams.direction}`;
    console.log(url);
    return url;
  }

  /**
   *
   * @param date
   * @param formatDate
   */
  getDateByFormat(date: any, formatDate: string = 'yyyy-MM-dd hh:mm:ss'): string | null
  {
    return this.datePipe.transform(new Date(date), formatDate);
  }
}
