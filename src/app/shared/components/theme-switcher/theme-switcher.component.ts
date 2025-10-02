import { ChangeDetectionStrategy, Component, output, OutputEmitterRef, signal, WritableSignal } from "@angular/core";

@Component({
    selector: 'dl-theme-switcher',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [],
    templateUrl: './theme-switcher.component.html',
    styleUrl: './theme-switcher.component.scss'
})
export class ThemeSwitcherComponent {

    public readonly currentTheme: WritableSignal<AppTheme> = signal('light')

    public readonly themeChanged: OutputEmitterRef<AppTheme> = output()

    onPlayAnimation() {
        this.currentTheme.set(
            this.currentTheme() === 'light' ? 'dark' : 'light'
        )
    }

    stopAnimation(event: AnimationEvent) {

        console.log(event.animationName.split('toggle'));
        
        if (event.animationName.includes('toggle')) {
            const currTheme: AppTheme = (event.animationName.split('toggle').pop()?.toLowerCase() as AppTheme)
            if (currTheme) {
                this.themeChanged.emit(currTheme)
            }
        }
    }

}

export type AppTheme = 'light' | 'dark'