import {Component, output} from "@angular/core";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'c-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class Header {

  /* Evento apertura sidenav sinistra*/
  public readonly toggleMenu = output()

}
