import { ChangeDetectionStrategy, Component, input, OnInit, output, signal, WritableSignal } from "@angular/core";
import { UserBadgeComponent } from "../user-badge/user-badge.component";

@Component({
    selector: 'dl-sidenav',
    imports: [UserBadgeComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './sidenav.component.html',
    styleUrl: './sidenav.component.scss',
})
export class DlSidenavComponent implements OnInit {

    public readonly sidenavToggled = input.required<boolean>()
    public readonly backdropClick = output()
    public readonly toggleComplete: WritableSignal<boolean> = signal(false);
    
    ngOnInit(): void {
        
    }

    onAnimationEnd(event: AnimationEvent) {
        console.log(event);
        const animationName = event.animationName.toLowerCase()
        if (animationName.includes('sidenav')) this.toggleComplete.set(animationName.includes('opensidenav'));    
    }
}