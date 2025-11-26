import { ChangeDetectionStrategy, Component, computed, effect, ElementRef, HostListener, inject, OnInit, signal, viewChild } from "@angular/core";
import { TrackService } from "../../../services/track.service";
import { Track } from "../../models/track-model";
import { ActivatedRoute } from "@angular/router";
import { BUCKET_URL } from "../../../utils/files/constants";
import { SocketService } from "../../../services/socket.service";

@Component({
  selector: "player-component",
  imports: [],
  standalone: true,
  templateUrl: "./player.component.html",
  styleUrl: "./player.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerComponent implements OnInit {

  public readonly audioSrc = viewChild<ElementRef<HTMLAudioElement>>('audio');
  public readonly runnable = viewChild<ElementRef<HTMLDivElement>>('runnable');
  public readonly runned = viewChild<ElementRef<HTMLDivElement>>('runned')
  public readonly handle = viewChild<ElementRef<HTMLDivElement>>('handle')

  public readonly track = signal<Track | null>(null);
  public readonly currentTrackTime = signal<number>(0);
  public readonly trackPlaying = signal<boolean>(false);
  public readonly mediaSource = signal<MediaSource | null>(new MediaSource());
  public readonly audioSource = signal<string | null>(null)
  public readonly chunkLoadedPerc = signal<number>(0);

  private isDragging: boolean = false;
  private barWidth: number = 0;
  private handleOffsetX: number = 0;

  private chunkQueue: any[] = [];
  private sourceBuffer: SourceBuffer;
  private appending: boolean = false;
  private loadedBytes: number = 0;

  private readonly trackService = inject(TrackService);
  private readonly route = inject(ActivatedRoute);
  private readonly socketService = inject(SocketService);

  constructor() {
    effect(() => {
      if (this.runnable()) {
        const runnableWidth: number = this.runnable().nativeElement.offsetWidth;
      }
    })

    effect(() => {

      if (this.currentTrackTime() && this.track()) {
        const progress = (this.currentTrackTime() / this.track().duration) * 100;

        this.runned().nativeElement.style.width = `${progress <= 100 ? progress : 100}%`
        this.handle().nativeElement.style.left = `${progress <= 100 ? progress : 100}%`
        this.handle().nativeElement.style.transform = `translate(-${50}%, -50%)`
      }
    })
  }

  async ngOnInit() {
    const track_id = this.route.snapshot.paramMap.get('trackId');
    this.socketService.connect();

    this.mediaSource().onsourceopen = async () => {
      this.sourceBuffer = this.mediaSource().addSourceBuffer('audio/mpeg')
      this.sourceBuffer.onupdateend = () => {
        this.appending = false
        this.appendNextChunk()
      }
    }

    this.socketService.getSocket.on('dataTrack', async (chunk: Uint8Array) => {
      this.chunkQueue.push(chunk);
      this.loadedBytes += chunk.byteLength;
      
      this.chunkLoadedPerc.set((this.loadedBytes / this.track().size ) * 100)
      this.appendNextChunk();
    })

    this.socketService.getSocket.on('close', () => {
      console.log('Audio stream ended');
      if (!((this.mediaSource().readyState as unknown as string) === 'open')) {
        this.mediaSource().endOfStream();
      }
    })

    this.audioSource.set(URL.createObjectURL(this.mediaSource()));
    this.track.set((await this.trackService.getTrackById(track_id)).data);
  }

  appendNextChunk() {
    if (this.appending || this.chunkQueue.length === 0) return;
    this.appending = true;
    this.sourceBuffer.appendBuffer(this.chunkQueue.shift())
  }

  @HostListener('window:keydown.space', ['$event'])
  onEnter(event: Event) {
    if (this.trackPlaying()) {
      this.pauseTrack();
    } else {
      this.playTrack();
    }
  }

  playTrack() {
    if (this.audioSrc()) {
      this.audioSrc().nativeElement.volume = .3;

      if (this.audioSrc().nativeElement.ended) {
        this.audioSrc().nativeElement.play();
      }

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

  newTrackTime(event: MouseEvent) {
    const clickX = event.offsetX;
    const barWidth = this.runnable().nativeElement.offsetWidth;
    const newTime = (clickX / barWidth) * this.audioSrc().nativeElement.duration;
    this.audioSrc().nativeElement.currentTime = newTime;
  }

  onHandleDown(event: MouseEvent) {
    this.isDragging = true
    this.barWidth = this.runnable().nativeElement.clientWidth;
    // Calculate the offset of the mouse to the handle element
    const handleRect = this.handle().nativeElement.getBoundingClientRect();
    this.handleOffsetX = event.clientX - handleRect.left;

    // Add event listeners to the document for better dragging control
    document.addEventListener('mousemove', this.onHandleMove.bind(this));
    document.addEventListener('mouseup', this.onHandleUp.bind(this));
  }

  onHandleMove(event: MouseEvent) {
    if (this.isDragging) {
      // Get the mouse position relative to the progress bar
      const progressBarRect = this.runnable().nativeElement.getBoundingClientRect(); // Get the bounding box of the progress bar
      const newX = event.clientX - progressBarRect.left - this.handleOffsetX; // Calculate relative position

      // Clip the position so it doesn't exceed the progress bar's width
      const limitedX = Math.min(Math.max(newX, 0), progressBarRect.width);

      const progress = (limitedX / this.barWidth) * 100;
      this.handle().nativeElement.style.left = `${progress}%`;
      this.runned().nativeElement.style.width = `${progress}%`;

      const newTime = (progress / 100) * this.audioSrc().nativeElement.duration;
      this.audioSrc().nativeElement.currentTime = newTime;
    }
  };

  onHandleUp() {
    this.isDragging = false;
  }

}