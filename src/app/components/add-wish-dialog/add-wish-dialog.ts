import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
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
          <md-form-field class="full-dialog-width">
            <input mdInput
                   placeholder="title"
                   id="titleInput"
                   name="title"
                   maxlength={{maxTitleLength}}
            [(ngModel)]="title"
            required>
            <md-hint align="end">{{title.length}} / {{maxTitleLength}}</md-hint>
          </md-form-field>
          <md-form-field class="full-dialog-width">
        <textarea mdInput
                  placeholder="description"
                  id="descriptionInput"
                  name="description"
                  maxlength={{maxDescriptionLength}}
            mdAutosizeMinRows="5"
            mdAutosizeMaxRows="8"
            mdTextareaAutosize
            [(ngModel)]="description"
            required>
            </textarea>
            <md-hint align="end">{{description.length}} / {{maxDescriptionLength}}</md-hint>
          </md-form-field>
          <div class="form-buttons">
            <button type="submit" md-raised-button color="primary" [disabled]="!wishForm.form.valid">Post wish</button>
            <button md-raised-button color="warn" (click)="closeDialog()">Cancel</button>
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
export class NewWishDialogComponent implements OnInit {

  maxTitleLength = 100;
  maxDescriptionLength = 300;

  title = '';
  description = '';

  constructor(public dialogRef: MdDialogRef<NewWishDialogComponent>,
              public store: Store<fromRoot.State>) {
  }

  ngOnInit(): void {
  }

  postWish() {
    const wish: Wish = {
      id: null,
      title: this.title,
      description: this.description,
      date: null
    };

    this.store.dispatch(new wishActions.AddWish(wish));
    this.dialogRef.close();
  }

  closeDialog() {
    this.dialogRef.close(null);
  }
}
