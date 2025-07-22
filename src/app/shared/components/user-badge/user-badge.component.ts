import { ChangeDetectionStrategy, Component, input, output } from "@angular/core";

@Component({
    selector: 'dl-user-badge',
    imports: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './user-badge.component.html',
    styleUrl: './user-badge.component.scss'
})
export class UserBadgeComponent {

    public readonly user = input()
    public readonly clickable = input(true)
    public readonly toggleSidenav = output()
    
}