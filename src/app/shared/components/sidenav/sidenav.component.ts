import { ChangeDetectionStrategy, Component, input, OnInit, output } from "@angular/core";
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
    
    ngOnInit(): void {
        
    }
}