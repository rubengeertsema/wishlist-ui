import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from 'app/common/reducers';
import * as wishActions from '../../common/actions/wishes.actions';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss']
})
export class WishListComponent implements OnInit {

  public wishes$;

  constructor(public store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    this.store.dispatch(new wishActions.GetWishes());
    this.wishes$ = this.store.select(fromRoot.getWishes);
  }
}
