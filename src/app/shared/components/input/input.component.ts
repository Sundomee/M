import { ChangeDetectionStrategy, Component, ElementRef, input, viewChild } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatIcon } from "@angular/material/icon";
import { DlControlBaseComponent } from "../dl-control-base/dl-control-base.component";

@Component({
    selector: 'dl-input',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [MatIcon, ReactiveFormsModule],
    templateUrl: './input.component.html',
    styleUrl: './input.component.scss',
    providers: [
      
    ]
})
export class DlInputComponent extends DlControlBaseComponent<string> {
    public readonly width = input<number>();
    public readonly widthAnimation = input<boolean>();
    public readonly icon = input<boolean>();
}