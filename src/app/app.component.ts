import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { OverlayContainer } from '@angular/cdk/overlay';

import * as fromRoot from 'app/common/reducers';

@Component({
  selector: 'body',
  template: `
    <app-navbar></app-navbar>
    <app-wish-list></app-wish-list>
  `,
  styles: [],
  host: {
    '[class.dark-theme]': 'isDarkTheme',
    '[class.light-theme]': '!isDarkTheme'
  }
})
export class AppComponent implements OnInit {

  isDarkTheme = false;

  constructor(private overlayContainer: OverlayContainer, private store: Store<fromRoot.State>) {
  }

  ngOnInit(): void {
    this.store.select(state => state.theme.darkTheme).subscribe((darkTheme) => {
        this.isDarkTheme = darkTheme;
        this.setOverlayClass();
      }
    )
  }

  private setOverlayClass() {
    if (this.isDarkTheme) {
      this.overlayContainer.getContainerElement().classList.add('dark-theme');
    } else {
      this.overlayContainer.getContainerElement().classList.remove('dark-theme');
      this.overlayContainer.getContainerElement().classList.add('light-theme');
    }
  }
}
