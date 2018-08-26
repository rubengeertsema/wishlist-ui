import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Wish } from '../models/wish.model';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';

const BASE_URL = 'http://localhost:8080/api/wishes';
const RETRIES = 3;
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable()
export class WishListService {

  constructor(private http: HttpClient) {
  }

  public getWishes(): Observable<Wish[]> {
    return this.http.get(BASE_URL + '?page=0&size=200')
      .pipe(retry(RETRIES), catchError(this.handleError))
      .map(res => res.content);
  }

  public postWish(wish: Wish): Observable<Wish> {
    return this.http.post<Wish>(BASE_URL, wish, httpOptions)
      .pipe(retry(RETRIES), catchError(this.handleError));
  }

  public editWish(wish: Wish): Observable<Wish> {
    return this.http.put(BASE_URL, wish, httpOptions)
      .pipe(retry(RETRIES), catchError(this.handleError));
  }

  public deleteWish(id: string): Observable<Wish> {
    return this.http.delete<Wish>(BASE_URL + '/' + id)
      .pipe(retry(RETRIES), catchError(this.handleError));
  }

  public deleteAll(): Observable<void> {
    return this.http.delete<void>(BASE_URL)
      .pipe(retry(RETRIES), catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('A client-side or network error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable(
      'Something bad happened; please try again later.');
  };
}
