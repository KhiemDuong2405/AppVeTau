import { Routes } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { TripComponent } from './component/trip/trip.component';
import { UserComponent } from './component/user/user.component';
import { TicketComponent } from './component/ticket/ticket.component';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'trip',
    loadChildren: () =>
      import('./component/trip/trip-routing.module').then((m) => m.TripRoutingModule),
  },
  {
    path: 'user',
    component: UserComponent,
  },
  {
    path: 'ticket',
    component: TicketComponent,
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/dashboard',
  },
];
