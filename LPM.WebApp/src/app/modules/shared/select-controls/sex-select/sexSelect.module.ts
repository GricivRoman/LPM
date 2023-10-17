import { NgModule } from '@angular/core';
import { SelectModule } from '../../module-frontend/forc-select/select.module';
import { SexSelectComponent } from './sexSelect.component';
import { SexSelectService } from './sexSelect.service';

@NgModule({
	imports: [
		SelectModule
	],
	declarations: [
		SexSelectComponent
	],
	exports: [
		SexSelectComponent
	],
	providers: [
		SexSelectService
	]
})
export class SexSelectModule {

}