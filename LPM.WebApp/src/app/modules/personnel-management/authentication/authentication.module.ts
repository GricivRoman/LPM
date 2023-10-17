import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginPageComponent } from './login/loginPage.component';
import { CheckInPageComponent } from './checkIn/checkInPage.component';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from './authentication.service';
import { HttpClientModule } from '@angular/common/http';
import { ForcControlsModule } from '../../shared/module-frontend/controls/forc-controls.module';
import { AlertService } from '../../shared/module-frontend/forc-alert/alert.service';

@NgModule({
	imports: [
		FormsModule,
		ReactiveFormsModule,
		AuthenticationRoutingModule,
		CommonModule,
		HttpClientModule,
		ForcControlsModule
	],
	declarations: [
		LoginPageComponent,
		CheckInPageComponent
	],
	providers: [
		AuthenticationService,
		AlertService
	]
})
export class AuthenticationModule {

}