import { ChangeDetectionStrategy, Component, computed, effect, ElementRef, inject, OnInit, signal, viewChild } from "@angular/core";
import { TrackService } from "../../../services/track.service";
import { Track } from "../../models/track-model";
import { ActivatedRoute } from "@angular/router";
import { BUCKET_URL } from "../../../utils/files/constants";
import { NgTemplateOutlet } from "@angular/common";

@Component({
  selector: "player-component",
  imports: [NgTemplateOutlet],
  standalone: true,
  templateUrl: "./player.component.html",
  styleUrl: "./player.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerComponent implements OnInit {

  public readonly audioSrc = viewChild<ElementRef<HTMLAudioElement>>('audio');

  public readonly track = signal<Track | null>(null);
  public readonly currentTrackTime = signal<number>(0);
  public readonly trackPlaying = signal<boolean>(false);

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

    if (currTrack) {
     
      currTrack.path = `${BUCKET_URL}/tracce/${currTrack.title}`;
      currTrack.imagePath = `${BUCKET_URL}/img/${currTrack._id}/${currTrack.imageId}`

      this.track.set(currTrack);
    }
  }

  playTrack() {
    if (this.audioSrc()) {
      this.audioSrc().nativeElement.volume = 1;

      this.audioSrc().nativeElement.ontimeupdate = (event) => {
        const animate = () => {
          this.currentTrackTime.set((event.target as HTMLAudioElement).currentTime);
          requestAnimationFrame(animate);
        };
        animate();
      }

      this.audioSrc().nativeElement.play();
      this.audioSrc().nativeElement.loop = true;

      this.trackPlaying.set(true)
    }
  }

  pauseTrack() {
    this.audioSrc().nativeElement.pause();
    this.trackPlaying.set(false)
  }

  thumbMove(event: Event) {
    this.audioSrc().nativeElement.pause();
    this.audioSrc().nativeElement.volume = 1;

    const newTime = (event.target as any).value
    this.audioSrc().nativeElement.currentTime = newTime;
    this.trackPlaying.set(true);
  }
}