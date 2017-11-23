import { Action } from '@ngrx/store';

export const TOGGLE_THEME = '[Theme] Toggle theme color';

export class ToggleTheme implements Action {
    readonly type = TOGGLE_THEME;
}

export type Actions = ToggleTheme;
