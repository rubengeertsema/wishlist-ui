import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { of } from 'rxjs/observable/of';
import * as wishes from 'app/common/actions/wishes.actions';
import { WishListService } from '../services/wishlist.service';

@Injectable()
export class WishesEffects {
  @Effect()
  getWishes$: Observable<Action> = this.actions$
    .ofType(wishes.GET_WISHES)
    .startWith(new wishes.GetWishes())
    .switchMap(() => {
      return this.wishListApi.getWishes()
        .map((res) => {
          return new wishes.GetWishesSuccess(res);
        })
        .catch(error => of(new wishes.GetWishesFailed(error)))
    });

  @Effect()
  addWish$: Observable<Action> = this.actions$
    .ofType(wishes.ADD_WISH)
    .switchMap((action) => {
      const addWishAction = action as wishes.AddWish;
      return this.wishListApi.postWish(addWishAction.payload)
        .map((res) => {
          return new wishes.AddWishSuccess(res);
        })
        .catch(error => of(new wishes.AddWishFailed(error)))
    });

  @Effect()
  deleteWish$: Observable<Action> = this.actions$
    .ofType(wishes.DELETE_WISH)
    .switchMap((action) => {
      const deleteWishAction = action as wishes.DeleteWish;
      return this.wishListApi.deleteWish(deleteWishAction.payload)
        .map((res) => new wishes.DeleteWishSuccess(res))
        .catch(error => of(new wishes.DeleteWishFailed(error)))
    });

  @Effect()
  deleteAllWishes$: Observable<Action> = this.actions$
    .ofType(wishes.DELETE_ALL_WISHES)
    .switchMap(() => {
      return this.wishListApi.deleteAll()
        .map((res) => {
          return new wishes.DeleteAllWishesSuccess(res);
        })
        .catch(error => of(new wishes.DeleteAllWishesFailed(error)))
    });

  constructor(private actions$: Actions,
              private wishListApi: WishListService) {
  }
}
