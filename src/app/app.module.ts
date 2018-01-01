import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { NavtoolbarComponent } from './component/navtoolbar/navtoolbar.component';
import { IncomingIcoComponent } from './component/incoming-ico/incoming-ico.component';
import { AppRoutingModule } from './app.routing.module';
import { HttpModule } from '@angular/http';

//services
import { IcoService } from './component/incoming-ico/ico-services.service';
import { AuthenticationService } from './authentication/authentication.service';
import { LoginComponent } from './component/login/login.component';
import { RegistrationComponent } from './component/registration/registration.component';
import { AuthenticationGuard } from './authentication/authentication.guard';


@NgModule({
  declarations: [
    AppComponent,
    NavtoolbarComponent,
    IncomingIcoComponent,
    LoginComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MaterialModule
  ],
  providers: [IcoService, AuthenticationService, AuthenticationGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
