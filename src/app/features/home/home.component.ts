import {Component, OnInit, WritableSignal, inject, signal} from "@angular/core";
import {MatIconModule} from '@angular/material/icon'
import {MatButtonModule} from '@angular/material/button';
import {MatRippleModule} from '@angular/material/core';
import {TrackService} from "../../core/track-service";
import {MatSliderModule} from "@angular/material/slider";
import {Track} from "../../shared/models/track-model";
import {Router} from "@angular/router";

@Component({
  selector: 'c-home',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatRippleModule, MatSliderModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class Home implements OnInit {

  public tracks: WritableSignal<Track[]> = signal([]);
  private trackService: TrackService = inject(TrackService);
  private router: Router = inject(Router);

  async ngOnInit(): Promise<void> {

    const tracks = (await this.trackService.getTracks()).data;
    this.tracks.set(tracks);

    console.log(this.tracks());
  }


  navigateToTrack(track: Track) {
    this.router.navigateByUrl(`/listen/${track._id}`)
  }

}
