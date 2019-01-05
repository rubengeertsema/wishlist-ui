import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as wishes from 'app/common/actions/wishes.actions';
import { WishListService } from '../services/wishlist.service';
import { catchError, startWith, switchMap } from 'rxjs/internal/operators';
import { Observable, of } from 'rxjs';

@Injectable()
export class WishesEffects {
  @Effect()
  getWishes$: Observable<Action> = this.actions$.pipe(
    ofType(wishes.GET_WISHES),
    switchMap(() => this.wishListApi.getWishes().map((res) => new wishes.GetWishesSuccess(res))),
    catchError(error => of(new wishes.GetWishesFailed(error)))
  );

  @Effect()
  addWish$: Observable<Action> = this.actions$.pipe(
    ofType(wishes.ADD_WISH),
    switchMap((action) => {
      const addWishAction = action as wishes.AddWish;
      return this.wishListApi.postWish(addWishAction.payload).map((res) => new wishes.AddWishSuccess(res))
    }),
    catchError(error => of(new wishes.AddWishFailed(error)))
  );

  @Effect()
  editWish$: Observable<Action> = this.actions$.pipe(
    ofType(wishes.EDIT_WISH),
    switchMap((action) => {
      const editWishAction = action as wishes.EditWish;
      return this.wishListApi.editWish(editWishAction.payload)
        .map((res) => new wishes.EditWishSuccess(res))
    }),
    catchError(error => of(new wishes.EditWishFailed(error)))
  );

  @Effect()
  deleteWish$: Observable<Action> = this.actions$.pipe(
    ofType(wishes.DELETE_WISH),
    switchMap((action) => {
      const deleteWishAction = action as wishes.DeleteWish;
      return this.wishListApi.deleteWish(deleteWishAction.payload.id)
        .map((res) => new wishes.DeleteWishSuccess(res));
    }),
    catchError(error => of(new wishes.DeleteWishFailed(error)))
  );

  @Effect()
  deleteAllWishes$: Observable<Action> = this.actions$.pipe(
    ofType(wishes.DELETE_ALL_WISHES),
    switchMap(() => this.wishListApi.deleteAll().map(() => new wishes.DeleteAllWishesSuccess())),
    catchError(error => of(new wishes.DeleteAllWishesFailed(error)))
  );

  constructor(private actions$: Actions,
              private wishListApi: WishListService) {
  }
}
