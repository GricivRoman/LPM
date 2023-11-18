import { NgModule } from '@angular/core';
import { SelectModule } from '../../module-frontend/forc-select/select.module';
import { PositionSelectService } from './positionSelect.service';
import { PositionSelectComponent } from './positionSelectComponent';
import { DataService } from '../../services/data.service';

@NgModule({
	imports: [
		SelectModule
	],
	declarations: [
		PositionSelectComponent
	],
	exports: [
		PositionSelectComponent
	],
	providers: [
		DataService,
		{ provide: 'PS_DataService', useClass: DataService },
		PositionSelectService
	]
})
export class PositionSelectModule {

}