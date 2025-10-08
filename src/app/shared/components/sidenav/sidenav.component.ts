import { ChangeDetectionStrategy, Component, input, OnInit, output, OutputEmitterRef, signal, WritableSignal } from "@angular/core";
import { AppTheme, ThemeSwitcherComponent } from "../theme-switcher/theme-switcher.component";

@Component({
    selector: 'dl-sidenav',
    imports: [ThemeSwitcherComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './sidenav.component.html',
    styleUrl: './sidenav.component.scss',
})
export class DlSidenavComponent implements OnInit {

    public readonly sidenavToggled = input.required<boolean>()
    public readonly position = input<'left' | 'right'>('right');
    public readonly backdropClick = output();
    public readonly toggleComplete: WritableSignal<boolean> = signal(false);
    public readonly themeChanged: OutputEmitterRef<AppTheme> = output();
    
    ngOnInit(): void {
        console.log(this.position());
    }

    onAnimationEnd(event: AnimationEvent) {
        const animationName = event.animationName.toLowerCase()
        if (animationName.includes('sidenav')) this.toggleComplete.set(animationName.includes('opensidenav'));    
    }

    onThemeChanged(event: AppTheme) {
        this.themeChanged.emit(event)
    }
}