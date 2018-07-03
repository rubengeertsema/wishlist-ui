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
        .map((res) => new wishes.GetWishesSuccess(res))
        .catch(error => of(new wishes.GetWishesFailed(error)))
    });

  @Effect()
  addWish$: Observable<Action> = this.actions$
    .ofType(wishes.ADD_WISH)
    .switchMap((action) => {
      const addWishAction = action as wishes.AddWish;
      return this.wishListApi.postWish(addWishAction.payload)
        .map((res) => new wishes.AddWishSuccess(res))
        .catch(error => of(new wishes.AddWishFailed(error)))
    });

  @Effect()
  editWish$: Observable<Action> = this.actions$
    .ofType(wishes.EDIT_WISH)
    .switchMap((action) => {
      const editWishAction = action as wishes.EditWish;
      return this.wishListApi.editWish(editWishAction.payload)
        .map((res) => {
          console.log(`In edit wish effect log: ${JSON.stringify(res)}`);
          return new wishes.EditWishSuccess(res)
        })
        .catch(error => of(new wishes.EditWishFailed(error)))
    });

  @Effect()
  deleteWish$: Observable<Action> = this.actions$
    .ofType(wishes.DELETE_WISH)
    .switchMap((action) => {
      const deleteWishAction = action as wishes.DeleteWish;
      return this.wishListApi.deleteWish(deleteWishAction.payload.id)
        .map((res) => new wishes.DeleteWishSuccess(res))
        .catch(error => of(new wishes.DeleteWishFailed(error)))
    });

  @Effect()
  deleteAllWishes$: Observable<Action> = this.actions$
    .ofType(wishes.DELETE_ALL_WISHES)
    .switchMap(() => {
      return this.wishListApi.deleteAll()
        .map(() => new wishes.DeleteAllWishesSuccess())
        .catch(error => of(new wishes.DeleteAllWishesFailed(error)))
    });

  constructor(private actions$: Actions,
              private wishListApi: WishListService) {
  }
}
