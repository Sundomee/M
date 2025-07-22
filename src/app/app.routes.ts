import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '', redirectTo: '/home', pathMatch: 'full'
  },
  {
    path: 'home', loadComponent: () => import('./features/home/home.component').then((c) => c.Home)
  },
  {
    path: 'listen',
    children: [
      {
        path: ':trackId',
        loadComponent: () => import('./shared/components/player-component/player.component').then((c) => c.PlayerComponent)
      }
    ]
  }
];
