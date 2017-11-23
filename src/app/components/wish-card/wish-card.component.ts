import { Component, Input, OnInit } from '@angular/core';
import { Wish } from '../../common/models/wish.model';
import { Store } from '@ngrx/store';
import * as fromRoot from 'app/common/reducers';
import * as wishActions from 'app/common/actions/wishes.actions';

@Component({
  selector: 'app-wish-card',
  template: `
    <md-card class="card">
      <md-card-header>
        <md-card-title>
          Title: {{wish.title | truncate: 15}}
        </md-card-title>
        <md-card-subtitle>
          Date: {{wish.date | date: "dd/MM/yy H:mm"}}
        </md-card-subtitle>
      </md-card-header>
      <md-card-content class="content">
        <p>{{wish.description}}</p>
      </md-card-content>
      <md-card-actions>
        <button class="edit-button" color="primary" md-raised-button (click)="editWish(wish)">Edit</button>
        <button class="delete-button" color="warn" md-raised-button (click)="deleteWish(wish)">Delete</button>
      </md-card-actions>
    </md-card>
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

    md-card-content p {
      height: 9em;
      overflow-y: auto;
    }

    /*:host-context(.dark-theme) .delete-button {*/
    /*background-color: #b10909;*/
    /*}*/
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
