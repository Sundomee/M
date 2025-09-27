import {Component, output} from "@angular/core";
import { DlInputComponent } from "../input/input.component";
import { FormControl, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: 'dl-header',
  standalone: true,
  imports: [DlInputComponent, ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class DlHeaderComponent {

  /* Evento apertura sidenav sinistra*/
  public readonly toggleSidenav = output()

  protected readonly search_controller = new FormControl<string>('')

}
