import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import * as fromRoot from 'app/common/reducers';
import * as wishActions from 'app/common/actions/wishes.actions';
import * as themeActions from 'app/common/actions/theme.actions';

@Component({
  selector: 'app-navbar',
  template: `
    <mat-toolbar class="navbar" color="primary" id="navbar">
      <span>WISHLIST</span>
      <span class="spacer"></span>
      <button mat-button (click)="toggleTheme()">TOGGLE THEME</button>
      <button mat-icon-button [matMenuTriggerFor]="menu" id="menuButton">
        <mat-icon>more_vert</mat-icon>
      </button>
      <mat-menu #menu="matMenu">
        <button mat-menu-item (click)="deleteAll()" id="deleteAllButton">
          <mat-icon>delete</mat-icon>
          <span>Delete all wishes</span></button>
      </mat-menu>
    </mat-toolbar>
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

  constructor(public store: Store<fromRoot.State>) {
  }

  toggleTheme() {
    this.store.dispatch(new themeActions.ToggleTheme());
  }

  deleteAll(): void {
    this.store.dispatch(new wishActions.DeleteAllWishes());
  }
}
