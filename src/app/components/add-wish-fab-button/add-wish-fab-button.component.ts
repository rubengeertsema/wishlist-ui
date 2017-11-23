import { Component, OnInit } from '@angular/core';
import { NewWishDialogComponent } from '../add-wish-dialog/add-wish-dialog';
import { MdDialog } from '@angular/material';

@Component({
  selector: 'app-add-wish-fab-button',
  template: `
    <button md-fab
            id="add-wish-fab-button"
            (click)="openAddWishDialog($event)">
      <md-icon>add</md-icon>
    </button>
  `,
  styles: [`
    #add-wish-fab-button {
      background-color: #3161ad;
      position: fixed;
      bottom: 30px;
      right: 40px;
    }

    :host-context(.dark-theme) #add-wish-fab-button {
      background-color: #c0c0c0;
    }
  `]
})
export class AddWishFabButtonComponent implements OnInit {

  constructor(private dialog: MdDialog) {
  }

  ngOnInit() {
  }

  openAddWishDialog(): void {
    this.dialog.open(NewWishDialogComponent);
  }
}
