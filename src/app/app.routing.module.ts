import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//path
import { IncomingIcoComponent } from './component/incoming-ico/incoming-ico.component';


const routes: Routes = [
  { path: 'ICOS', component: IncomingIcoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }