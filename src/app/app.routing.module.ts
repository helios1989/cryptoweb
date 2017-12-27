import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//path
import { IncomingIcoComponent } from './component/incoming-ico/incoming-ico.component';
import { LoginComponent } from './component/login/login.component';
import { RegistrationComponent} from './component/registration/registration.component';

const routes: Routes = [
  { path: 'ICOS', component: IncomingIcoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegistrationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }