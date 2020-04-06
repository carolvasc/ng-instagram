import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AccessComponent } from './access/access.component';

import { AuthGuard } from './auth-guard.service';

export const ROUTES: Routes = [
  { path: '', component: AccessComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] }
]