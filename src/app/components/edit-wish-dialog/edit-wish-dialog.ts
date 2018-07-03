import { Component, Input, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Wish } from '../../common/models/wish.model';
import { Store } from '@ngrx/store';
import * as fromRoot from 'app/common/reducers';
import * as wishActions from 'app/common/actions/wishes.actions';

@Component({
  selector: 'app-edit-wish-dialog',
  template: `
    <div class="dialog" id="editWishDialog">
      <div><h2>Edit Wish</h2></div>
      <div class="dialog-body">
        <form (ngSubmit)="wishForm.form.valid && onSaveWish()" #wishForm="ngForm">
          <mat-form-field class="full-dialog-width">
            <input matInput
                   placeholder="title"
                   id="titleInput"
                   name="title"
                   maxlength={{maxTitleLength}}
            [(ngModel)]="wish.title"
            required>
            <mat-hint align="end">{{wish.title.length}} / {{maxTitleLength}}</mat-hint>
          </mat-form-field>
          <mat-form-field class="full-dialog-width">
        <textarea matInput
                  placeholder="description"
                  id="descriptionInput"
                  name="description"
                  maxlength={{maxDescriptionLength}}
            matAutosizeMinRows="5"
            matAutosizeMaxRows="8"
            matTextareaAutosize
            [(ngModel)]="wish.description"
            required>
            </textarea>
            <mat-hint align="end">{{wish.description.length}} / {{maxDescriptionLength}}</mat-hint>
          </mat-form-field>
          <div class="form-buttons">
            <button type="submit" mat-raised-button color="primary" [disabled]="!wishForm.form.valid">Save wish</button>
            <button mat-raised-button color="warn" (click)="onCloseDialog()">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .dialog {
      font-family: Roboto, "Helvetica Neue", sans-serif;
      display: flex;
      flex-direction: column;
    }

    .dialog-body {
      display: flex;
      overflow-y: auto;
    }

    .full-dialog-width {
      width: 100%;
    }

    .form-buttons {
      margin-top: 1em;
      margin-bottom: 0.2em;
    }
  `]
})
export class EditWishDialogComponent implements OnInit {

  wish: Wish;

  maxTitleLength = 100;
  maxDescriptionLength = 300;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<EditWishDialogComponent>,
              public store: Store<fromRoot.State>) {
  }

  ngOnInit(): void {
    this.wish = Object.assign({}, this.data);
  }

  onSaveWish() {
    this.store.dispatch(new wishActions.EditWish(this.wish));
    this.dialogRef.close();
  }

  onCloseDialog() {
    this.dialogRef.close();
  }
}
