import { ChangeDetectionStrategy, Component, ElementRef, inject, OnInit, signal, viewChild } from "@angular/core";
import { TrackService } from "../../../services/track.service";
import { Track } from "../../models/track-model";
import { ActivatedRoute } from "@angular/router";
import { BUCKET_URL } from "../../../utils/files/constants";

@Component({
  selector: "player-component",
  imports: [],
  standalone: true,
  templateUrl: "./player.component.html",
  styleUrl: "./player.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerComponent implements OnInit {

  public readonly audioSrc = viewChild<ElementRef<HTMLAudioElement>>('audio')
  public readonly track = signal<Track | null>(null);
  public readonly canAnimate = signal<boolean>(false);

  private readonly trackService = inject(TrackService);
  private readonly route = inject(ActivatedRoute);

  async ngOnInit() {
    let currTrack = this.trackService.currentTrack;

    if (!currTrack) {

      const track_id = this.route.snapshot.paramMap.get('trackId');
      if (track_id) {
        currTrack = (await this.trackService.getTrackById(track_id)).data;
      }
    }

    if( currTrack ) {
      // currTrack.path = 'http://localhost:3000/public' + currTrack.path;
      currTrack.path = `${BUCKET_URL}/tracce/${currTrack.title}`;
      currTrack.imagePath = `${BUCKET_URL}/img/${currTrack._id}/${currTrack.imageId}`
      this.track.set(currTrack);
    }

    console.log(this.track());
  }

  playAudio() {
    
    if( this.audioSrc() ){
      this.audioSrc().nativeElement.play();
      this.canAnimate.set(true);
    }

  }
}


