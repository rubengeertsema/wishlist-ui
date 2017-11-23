import { Component } from '@angular/core';
import { NewWishDialogComponent } from '../add-wish-dialog/add-wish-dialog';
import { MdDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import * as fromRoot from 'app/common/reducers';
import * as wishActions from 'app/common/actions/wishes.actions';
import * as themeActions from 'app/common/actions/theme.actions';

@Component({
  selector: 'app-navbar',
  template: `
    <md-toolbar class="navbar" color="primary" id="navbar">
      <span>WISHLIST</span>
      <span class="spacer"></span>
      <button md-button (click)="toggleTheme()">TOGGLE THEME</button>
      <button md-icon-button [mdMenuTriggerFor]="menu" id="menuButton">
        <md-icon>more_vert</md-icon>
      </button>
      <md-menu #menu="mdMenu">
        <button md-menu-item (click)="openNewWishDialog()" id="createNewWishDialogButton">
          <md-icon>create</md-icon>
          <span>Create new wish</span></button>
        <button md-menu-item (click)="deleteAll()" id="deleteAllButton">
          <md-icon>delete</md-icon>
          <span>Delete all wishes</span></button>
      </md-menu>
    </md-toolbar>
  `,
  styles: [`
    .navbar {
      right: 0;
      top: 0;
      position: fixed;
      box-shadow: 0 3px 5px -1px rgba(0, 0, 0, .2), 0 6px 10px 0 rgba(0, 0, 0, .14), 0 1px 18px 0 rgba(0, 0, 0, .12);
      z-index: 2;
    }

    .spacer {
      -webkit-box-flex: 1;
      -ms-flex: 1 1 auto;
      flex: 1 1 auto;
    }
  `]
})
export class NavbarComponent {

  constructor(private dialog: MdDialog, public store: Store<fromRoot.State>) {
  }

  toggleTheme() {
    this.store.dispatch(new themeActions.ToggleTheme());
  }

  openNewWishDialog(): void {
    this.dialog.open(NewWishDialogComponent);
  }

  deleteAll(): void {
    this.store.dispatch(new wishActions.DeleteAllWishes());
  }
}
