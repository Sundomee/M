import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DlHeaderComponent } from "./shared/components/header/header.component";
import { DlSidenavComponent } from './shared/components/sidenav/sidenav.component';
import { AppTheme } from './shared/components/theme-switcher/theme-switcher.component';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DlHeaderComponent, DlSidenavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {

  public readonly sidenavToggled = signal<boolean>(false);
  private readonly themeService = inject(ThemeService);

  ngOnInit() {
    document.body.classList.add('dark-theme');
  }

  onBackdropClick() {
    this.sidenavToggled.set(false);
  }

  onThemeChanged(event: AppTheme) {
    this.themeService.changeTheme(event)
  }

}
