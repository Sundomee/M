import { Injectable, signal, Signal } from "@angular/core";
import { AppTheme } from "../shared/components/theme-switcher/theme-switcher.component";

@Injectable({ providedIn: 'root' })
export class ThemeService {

    public _theme: AppTheme = 'light'

    changeTheme(theme: AppTheme) {
        this._theme = theme;
        const oppositeTheme = theme === 'dark' ? 'light' : 'dark';
        document.body.classList.remove(`${oppositeTheme}-theme`);
        document.body.classList.add(`${theme}-theme`)
    }


    public get theme(): AppTheme {
        return this._theme
    }


}