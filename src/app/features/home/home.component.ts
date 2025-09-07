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
import { ReactiveFormsModule } from "@angular/forms";
import { DlSidenavComponent } from "../../shared/components/sidenav/sidenav.component";
import { DlHeaderComponent } from "../../shared/components/header/header.component";

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
    DlSidenavComponent,
    DlHeaderComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class Home implements OnInit {

  public readonly sidenav_toggled = signal<boolean>(false)
  
  public readonly tracks: WritableSignal<Track[]> = signal([]);
  private readonly trackService: TrackService = inject(TrackService);
  private readonly router: Router = inject(Router);


  constructor() {}

  async ngOnInit(): Promise<void> {

    const tracks = (await this.trackService.getTracks()).data;
    this.tracks.set(tracks);

    console.log(this.tracks());
  }

  navigateToTrack(track: Track) {
    this.router.navigateByUrl(`/listen/${track._id}`)
  }

  toggleSidenav() {
    this.sidenav_toggled.update(toggled => !toggled)
  }

  onBackdropClick() {
    this.sidenav_toggled.set(false)
  }
}