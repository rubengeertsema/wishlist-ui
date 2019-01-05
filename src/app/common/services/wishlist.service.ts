import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { retry } from 'rxjs/operators';
import { Wish } from '../models/wish.model';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import * as env from '../../../environments/environment';

const baseUrl = env.environment.wishes_base_url;
const RETRIES = 0;
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
    return this.http.get(baseUrl + '?page=0&size=200', httpOptions)
      .pipe(retry(RETRIES))
      .map(res => res.content as Wish[]);
  }

  public postWish(wish: Wish): Observable<Wish> {
    return this.http.post<Wish>(baseUrl, wish, httpOptions)
      .pipe(retry(RETRIES));
  }

  public editWish(wish: Wish): Observable<Wish> {
    return this.http.put<Wish>(baseUrl, wish, httpOptions)
      .pipe(retry(RETRIES));
  }

  public deleteWish(id: string): Observable<Wish> {
    return this.http.delete<Wish>(baseUrl + '/' + id)
      .pipe(retry(RETRIES));
  }

  public deleteAll(): Observable<void> {
    return this.http.delete<void>(baseUrl)
      .pipe(retry(RETRIES));
  }
}
