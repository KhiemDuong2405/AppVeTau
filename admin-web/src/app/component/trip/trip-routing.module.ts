import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTripComponent } from './add-trip/add-trip.component';
import { TripComponent } from './trip.component';
import { EditTripComponent } from './edit-trip/edit-trip.component';

const routes: Routes = [
  {
    path: '',
    component: TripComponent,
    children: [
      { path: 'add-trip', component: AddTripComponent },
      { path: 'delete-trip', component: EditTripComponent },
      { path: '', redirectTo: 'add-trip', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TripRoutingModule { }
