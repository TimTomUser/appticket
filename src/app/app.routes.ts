import { Routes } from '@angular/router';
// import { AppHeader } from './components/app-header/app-header';
// import { CommentsComponents } from './comments/comments.components';
// import { AppDemande } from './components/app-demande/app-demande';


export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/app-header/app-header').then(m => m.AppHeader)
    },
    {
        path: 'comments.components',
         loadComponent: () => import('./comments/comments.components').then(m => m.CommentsComponents)
    },
    {
        path: 'app-demande',
         loadComponent: () => import('./components/app-demande/app-demande').then(m => m.AppDemande)
    }
];
