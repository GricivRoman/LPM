import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ApiInterceptor } from './modules/shared/services/api-interceptor';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthActivatorService } from './modules/employees-module/authentication/authGuard';
import { AuthenticationService } from './modules/employees-module/authentication/authentication.service';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FontAwesomeModule,
		FormsModule,
		ReactiveFormsModule,
		CommonModule,
		HttpClientModule,
		MatDialogModule,
		BrowserAnimationsModule
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: ApiInterceptor,
			multi: true,
		},
		AuthActivatorService,
		AuthenticationService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
