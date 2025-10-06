import { ChangeDetectionStrategy, Component, inject, output, OutputEmitterRef, signal, WritableSignal } from "@angular/core";
import { ThemeService } from "../../../services/theme.service";

@Component({
    selector: 'dl-theme-switcher',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [],
    templateUrl: './theme-switcher.component.html',
    styleUrl: './theme-switcher.component.scss'
})
export class ThemeSwitcherComponent {

    private readonly themeService = inject(ThemeService)

    public readonly currentTheme: WritableSignal<AppTheme> = signal(this.themeService.theme ?? 'dark')
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