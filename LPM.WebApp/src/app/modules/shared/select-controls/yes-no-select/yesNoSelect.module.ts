import { NgModule } from '@angular/core';
import { SelectModule } from '../../module-frontend/forc-select/select.module';
import { YesNoSelectComponent } from './yesNoSelect.component';
import { YesNoSelectService } from './yesNoSelect.service';

@NgModule({
	imports: [
		SelectModule
	],
	declarations: [
		YesNoSelectComponent
	],
	exports: [
		YesNoSelectComponent
	],
	providers: [
		YesNoSelectService
	]
})
export class YesNoSelectModule {

}