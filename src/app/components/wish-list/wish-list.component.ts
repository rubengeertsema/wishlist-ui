import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from 'app/common/reducers';

@Component({
  selector: 'app-wish-list',
  template: `
    <md-list class="card-list">
      <app-wish-card *ngFor="let wish of this.wishes$ | async" [wish]="wish">
      </app-wish-card>
    </md-list>
    <app-add-wish-fab-button></app-add-wish-fab-button>
  `,
  styles: [`
    .card-list {
      margin-top: 4em;
      display: flex;
      flex-wrap: wrap;
    }
  `]
})
export class WishListComponent implements OnInit {

  public wishes$;

  constructor(public store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    this.wishes$ = this.store.select(fromRoot.getWishes);
  }
}
