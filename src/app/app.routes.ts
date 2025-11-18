import { Routes } from '@angular/router';

export const routes: Routes = [
    {

      path : '',
      loadComponent: () => import('./pages/home/home.component').then(mod => mod.HomeComponent),
      children :  [

        {
            path: '',
            loadComponent: () => import('./pages/dashboardpage/dashboardpage.component').then(mod => mod.DashboardpageComponent)
          },


        { path: 'about',
          loadComponent: () => import('./pages/aboutpage/aboutpage.component').then(mod => mod.AboutpageComponent)
        },

        { path: 'contact',
          loadComponent: () => import('./pages/contactpage/contactpage.component').then(mod => mod.ContactpageComponent)
        }


      ]
    }
];
