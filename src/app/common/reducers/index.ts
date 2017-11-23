import { ActionReducer, createFeatureSelector, createSelector, MetaReducer } from '@ngrx/store';
import * as fromWishes from './wishes.reducer';
import * as fromTheme from './theme.reducer';
import { localStorageSync } from 'ngrx-store-localstorage';

export interface State {
  wishes: fromWishes.State,
  theme: fromTheme.State
}

export const reducers = {
  wishes: fromWishes.reducer,
  theme: fromTheme.reducer
};

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys: [
      {
        theme: ['darkTheme']
      }
    ],
    rehydrate: true
  })(reducer);
}

export const metaReducers: MetaReducer<State>[] = [localStorageSyncReducer];

export const getWishesState = createFeatureSelector<State>('wishes');
export const getWishes = createSelector(getWishesState, state => state.wishes);
