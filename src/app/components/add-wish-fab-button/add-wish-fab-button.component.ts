import { Component, OnInit } from '@angular/core';
import { AddWishDialogComponent } from '../add-wish-dialog/add-wish-dialog';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-add-wish-fab-button',
  template: `
    <button mat-fab
            id="add-wish-fab-button"
            (click)="openAddWishDialog()">
      <mat-icon>add</mat-icon>
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

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  openAddWishDialog(): void {
    this.dialog.open(AddWishDialogComponent);
  }
}
