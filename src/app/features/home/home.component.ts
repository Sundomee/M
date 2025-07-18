import { Component, OnInit, WritableSignal, inject, signal } from "@angular/core";
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { TrackService } from "../../core/track-service";
import { MatSliderModule } from "@angular/material/slider";
import { Track } from "../../shared/models/track-model";
import { Router } from "@angular/router";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { DlInputComponent } from "../../shared/components/input/input.component";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { DlControlDirective } from "../../shared/components/input/dl-control.directive";

@Component({
  selector: 'c-home',
  standalone: true,
  imports: [
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatSliderModule,
    MatFormFieldModule,
    MatInputModule,
    DlInputComponent,
    DlControlDirective,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class Home implements OnInit {

  public tracks: WritableSignal<Track[]> = signal([]);
  private trackService: TrackService = inject(TrackService);
  private router: Router = inject(Router);

  protected readonly search_controller = new FormControl<string>('')

  constructor() {

    this.search_controller.valueChanges.subscribe((value) => console.log(value))
  }

  async ngOnInit(): Promise<void> {

    const tracks = (await this.trackService.getTracks()).data;
    this.tracks.set(tracks);

    console.log(this.tracks());
  }


  navigateToTrack(track: Track) {
    this.router.navigateByUrl(`/listen/${track._id}`)
  }

}
