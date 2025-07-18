import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";

@Component({
  selector: "player-component",
  imports: [],
  standalone: true,
  templateUrl: "./player.component.html",
  styleUrl: "./player.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerComponent implements OnInit {

  ngOnInit() {



  }

}


