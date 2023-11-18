import { Component, ViewChild, Inject } from '@angular/core';
import { PositionSelectService } from './positionSelect.service';
import { DataService } from '../../services/data.service';
import { SelectComponent } from '../../module-frontend/forc-select/select-single/select.component';
import { BaseSelector} from '../../base-components/selectComponent';

@Component({
	selector: 'app-select-position',
	template: `
		<app-select
			[label]="label"
			[control]="control"
			[selectService]="selectService"
			[isMultiple]="isMultiple"
		></app-select>
	`,
	providers:[{ provide: 'SelectService', useClass: PositionSelectService }, { provide: 'PS_DataService', useClass: DataService }]
})
export class PositionSelectComponent extends BaseSelector {
	@ViewChild(SelectComponent, {static: false}) selector: SelectComponent;

	constructor(@Inject('SelectService') public override selectService: PositionSelectService){
		super(selectService);
	}

	resetSelectList(){
		this.selector.resetSelectList();
	}
}