import { NgModule } from '@angular/core';
import { FillerComponent } from './filler.component';
import { HttpClient } from '@angular/common/http';
import { AlertService } from '../../shared/module-frontend/forc-alert/alert.service';
import { FillerRoutingModule } from './filler-routing.module';

@NgModule({
	imports: [
		FillerRoutingModule
	],
	declarations: [
		FillerComponent
	],
	exports: [
		FillerComponent
	],
	providers: [
		HttpClient,
		AlertService
	]
})
export class FillerModule {

}