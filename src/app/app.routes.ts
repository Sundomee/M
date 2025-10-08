import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '', redirectTo: '/home', pathMatch: 'full'
  },
  {
    path: 'home', loadComponent: () => import('./features/home/home.component').then((c) => c.Home)
  },
  {
    path: 'track',
    children: [
      {
        path: ':trackId',
        loadComponent: () => import('./shared/components/player-component/player.component').then((c) => c.PlayerComponent)
      }
    ]
  },
  {
    path: 'sign',
    loadComponent: () => import('./features/sign-form/sign-form.component').then((c) => c.SignFormComponent),
  },
  {
    path: 'play',
    loadComponent: () => import('./shared/components/player-component/player.component').then((c) => c.PlayerComponent),
  }
];
