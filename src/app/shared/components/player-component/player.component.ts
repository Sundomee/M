import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";
import { DlHeaderComponent } from "../header/header.component";

@Component({
  selector: "player-component",
  imports: [DlHeaderComponent],
  standalone: true,
  templateUrl: "./player.component.html",
  styleUrl: "./player.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerComponent implements OnInit {

  ngOnInit() {



  }

}


