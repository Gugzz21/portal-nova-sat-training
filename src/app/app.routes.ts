import { Routes } from '@angular/router';

export const routes: Routes = [
    {

      path : '',
      loadComponent: () => import('./pages/home/home.component').then(mod => mod.HomeComponent),
      children :  [


        { path: 'card',
          loadComponent: () => import('./components/card/card.component').then(mod => mod.CardComponent)

        },

          {
            path: 'dashboard',
            loadComponent: () => import('./pages/dashboardpage/dashboardpage.component').then(mod => mod.DashboardpageComponent)
          },
      ]
    }
];
