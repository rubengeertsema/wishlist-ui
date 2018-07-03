import * as wishes from 'app/common/actions/wishes.actions';
import { Wish } from '../models/wish.model';

export interface State {
  wishes: Array<Wish>;
}

export const initialState: State = {
  wishes: []
};

export function reducer(state = initialState, action: wishes.Actions): State {
  switch (action.type) {
    case wishes.GET_WISHES_SUCCESS: {
      return Object.assign({}, state, {wishes: action.payload});
    }
    case wishes.ADD_WISH_SUCCESS: {
      return Object.assign({}, state, {
        wishes: [...state.wishes, action.payload]
      });
    }
    case wishes.EDIT_WISH_SUCCESS: {
      return Object.assign({}, state, {
        wishes: state.wishes.map(wish => {
          if (wish.id === action.payload.id) {
            wish.title = action.payload.title;
            wish.description = action.payload.description;
            wish.date = action.payload.date;
          }
          return wish
        })
      });
    }
    case wishes.DELETE_WISH_SUCCESS: {
      const newWishes = state.wishes.filter((wish) => action.payload.id !== wish.id);

      return Object.assign({}, state, {
        wishes: newWishes
      });
    }
    case wishes.DELETE_ALL_WISHES_SUCCESS: {
      return Object.assign({}, state, {
        wishes: null
      });
    }
    default:
      return state;
  }
}

export const getWishes = (state: State) => state.wishes;
