import { Action } from '@ngrx/store';

export const GET_WISHES = '[Wishes] Get wishes';
export const GET_WISHES_SUCCESS = '[Wishes] Get wishes success';
export const GET_WISHES_FAILED = '[Wishes] Get wishes failed';
export const ADD_WISH = '[Wishes] Add wish';
export const ADD_WISH_SUCCESS = '[Wishes] Add wish success';
export const ADD_WISH_FAILED = '[Wishes] Add wish failed';
export const EDIT_WISH = '[Wishes] Edit wish';
export const EDIT_WISH_SUCCESS = '[Wishes] Edit wish success';
export const EDIT_WISH_FAILED = '[Wishes] Edit wish failed';
export const DELETE_WISH = '[Wishes] Delete wish';
export const DELETE_WISH_SUCCESS = '[Wishes] Delete wish success';
export const DELETE_WISH_FAILED = '[Wishes] Delete wish failed';
export const DELETE_ALL_WISHES = '[Wishes] Delete all wishes';
export const DELETE_ALL_WISHES_SUCCESS = '[Wishes] Delete all wishes success';
export const DELETE_ALL_WISHES_FAILED = '[Wishes] Delete all wishes failed';

/**
 * Get wishes actions
 */
export class GetWishes implements Action {
  readonly type = GET_WISHES;

  constructor() {
  }
}

export class GetWishesSuccess implements Action {
  readonly type = GET_WISHES_SUCCESS;

  constructor(public payload: any) {
  }
}

export class GetWishesFailed implements Action {
  readonly type = GET_WISHES_FAILED;

  constructor(public payload: any) {
  }
}

/**
 * Add wish actions
 */
export class AddWish implements Action {
  readonly type = ADD_WISH;

  constructor(public payload: any) {
  }
}

export class AddWishSuccess implements Action {
  readonly type = ADD_WISH_SUCCESS;

  constructor(public payload: any) {
  }
}

export class AddWishFailed implements Action {
  readonly type = ADD_WISH_FAILED;

  constructor(public payload: any) {
  }
}

/**
 * Edit wish actions
 */
export class EditWish implements Action {
  readonly type = EDIT_WISH;

  constructor(public payload: any) {
  }
}

export class EditWishSuccess implements Action {
  readonly type = EDIT_WISH_SUCCESS;

  constructor(public payload: any) {
  }
}

export class EditWishFailed implements Action {
  readonly type = EDIT_WISH_FAILED;

  constructor(public payload: any) {
  }
}

/**
 * Delete wish actions
 */
export class DeleteWish implements Action {
  readonly type = DELETE_WISH;

  constructor(public payload: any) {
  }
}

export class DeleteWishSuccess implements Action {
  readonly type = DELETE_WISH_SUCCESS;

  constructor(public payload: any) {
  }
}

export class DeleteWishFailed implements Action {
  readonly type = DELETE_WISH_FAILED;

  constructor(public payload: any) {
  }
}

/**
 * Delete all wishes actions
 */
export class DeleteAllWishes implements Action {
  readonly type = DELETE_ALL_WISHES;

  constructor() {
  }
}

export class DeleteAllWishesSuccess implements Action {
  readonly type = DELETE_ALL_WISHES_SUCCESS;

  constructor() {
  }
}

export class DeleteAllWishesFailed implements Action {
  readonly type = DELETE_ALL_WISHES_FAILED;

  constructor(public payload: any) {
  }
}

export type Actions = GetWishes | GetWishesSuccess | GetWishesFailed
  | AddWish | AddWishSuccess | AddWishFailed
  | EditWish | EditWishSuccess | EditWishFailed
  | DeleteWish | DeleteWishSuccess | DeleteWishFailed
  | DeleteAllWishes | DeleteAllWishesSuccess | DeleteAllWishesFailed;
