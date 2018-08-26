import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Wish } from '../../common/models/wish.model';
import { Store } from '@ngrx/store';
import * as fromRoot from 'app/common/reducers';
import * as wishActions from 'app/common/actions/wishes.actions';

@Component({
  selector: 'app-add-wish-dialog',
  template: `
    <div class="dialog" id="newWishDialog">
      <div><h2>New Wish</h2></div>
      <div class="dialog-body">
        <form (ngSubmit)="wishForm.form.valid && postWish()" #wishForm="ngForm">
          <mat-form-field class="full-dialog-width">
            <input matInput
                   placeholder="title"
                   id="titleInput"
                   name="title"
                   maxlength={{maxTitleLength}}
            [(ngModel)]="title"
            required>
            <mat-hint align="end">{{title.length}} / {{maxTitleLength}}</mat-hint>
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
            [(ngModel)]="description"
            required>
            </textarea>
            <mat-hint align="end">{{description.length}} / {{maxDescriptionLength}}</mat-hint>
          </mat-form-field>
          <div class="form-buttons">
            <button type="submit" mat-raised-button color="primary" [disabled]="!wishForm.form.valid">Post wish</button>
            <button mat-raised-button color="warn" (click)="closeDialog()">Cancel</button>
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
export class AddWishDialogComponent implements OnInit {

  maxTitleLength = 100;
  maxDescriptionLength = 300;

  title = '';
  description = '';

  constructor(public dialogRef: MatDialogRef<AddWishDialogComponent>,
              public store: Store<fromRoot.State>) {
  }

  ngOnInit(): void {
  }

  postWish() {
    const wish: Wish = {
      id: null,
      title: this.title,
      description: this.description,
      dateTime: null
    };

    this.store.dispatch(new wishActions.AddWish(wish));
    this.dialogRef.close();
  }

  closeDialog() {
    this.dialogRef.close(null);
  }
}
