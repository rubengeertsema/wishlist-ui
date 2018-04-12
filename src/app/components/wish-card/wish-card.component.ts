import { Component, Input, OnInit } from '@angular/core';
import { Wish } from '../../common/models/wish.model';
import { Store } from '@ngrx/store';
import * as fromRoot from 'app/common/reducers';
import * as wishActions from 'app/common/actions/wishes.actions';

@Component({
  selector: 'app-wish-card',
  template: `
    <mat-card class="card">
      <mat-card-header>
        <mat-card-title>
          Title: {{wish.title | truncate: 15}}
        </mat-card-title>
        <mat-card-subtitle>
          Date: {{wish.date | date: "dd/MM/yy H:mm"}}
        </mat-card-subtitle>
      </mat-card-header>
      <mat-card-content class="content">
        <p>{{wish.description}}</p>
      </mat-card-content>
      <mat-card-actions>
        <button class="edit-button" color="primary" mat-raised-button (click)="editWish(wish)">Edit</button>
        <button class="delete-button" color="warn" mat-raised-button (click)="deleteWish(wish)">Delete</button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [`
    :host {
      margin: 1em;
      flex: 1 0 20%;
      min-width: 15em;
    }

    .content {
      white-space: pre-line;
      height: 10em;
    }

    mat-card-content p {
      height: 9em;
      overflow-y: auto;
    }
  `]
})
export class WishComponent implements OnInit {

  @Input() wish: Wish;

  constructor(public store: Store<fromRoot.State>) {
  }

  ngOnInit() {
  }

  deleteWish(wish: Wish) {
    this.store.dispatch(new wishActions.DeleteWish(wish));
  }

  editWish(wish: Wish) {
    // TODO: implement method
  }
}
