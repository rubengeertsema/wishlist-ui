import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Wish } from '../../common/models/wish.model';
import { Store } from '@ngrx/store';
import * as fromRoot from 'app/common/reducers';
import * as wishActions from 'app/common/actions/wishes.actions';
import { EditWishDialogComponent } from 'app/components/edit-wish-dialog/edit-wish-dialog';

@Component({
  selector: 'app-wish-card',
  template: `
    <mat-card class="card">
      <mat-card-header>
        <mat-card-title>
          Title: {{wish.title | truncate: 15}}
        </mat-card-title>
        <mat-card-subtitle>
          Date: {{wish.dateTime | date: "dd/MM/yy H:mm"}}
        </mat-card-subtitle>
      </mat-card-header>
      <mat-card-content class="content">
        <p>{{wish.description}}</p>
      </mat-card-content>
      <mat-card-actions>
        <button class="edit-button" color="primary" mat-raised-button (click)="onEditWish()">Edit</button>
        <button class="delete-button" color="warn" mat-raised-button (click)="onDeleteWish(wish)">Delete</button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [`
    :host {
      margin: 1em;
      flex: 1 0 20%;
      min-width: 12.5em;
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
export class WishComponent implements OnInit, OnChanges {

  @Input() wish: Wish;

  constructor(private dialog: MatDialog, public store: Store<fromRoot.State>) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  onDeleteWish(wish: Wish) {
    this.store.dispatch(new wishActions.DeleteWish(wish));
  }

  onEditWish() {
    this.dialog.open(EditWishDialogComponent, {
      data: this.wish
    });
  }
}
