import { Routes } from '@angular/router';
import { CadastroEvento } from './pages/cadastro-evento/cadastro-evento';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'eventos/novo'
  },
  {
    path: 'eventos/novo',
    component: CadastroEvento
  },
  {
    path: '**',
    redirectTo: 'eventos/novo'
  }
];
