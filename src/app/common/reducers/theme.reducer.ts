import * as ThemeActions from '../actions/theme.actions';

export interface State {
    darkTheme: boolean;
}

export const initialState: State = {
    darkTheme: false
};

export function reducer(state = initialState, action: ThemeActions.Actions): State {
    switch (action.type) {
        case ThemeActions.TOGGLE_THEME: {
            return Object.assign({}, state, {
                darkTheme: !(state.darkTheme)
            });
        }
        default:
            return state;
    }
}
