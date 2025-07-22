import { ChangeDetectionStrategy, Component, input, OnInit, output } from "@angular/core";

@Component({
    selector: 'dl-sidenav',
    imports: [],
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