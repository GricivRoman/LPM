import { Component, Inject } from '@angular/core';
import { OrganizationSelectService } from './organizationSelect.service';
import { DataService } from '../../services/data.service';
import { BaseSelector} from '../../base-components/selectComponent';

@Component({
	selector: 'app-select-organization',
	template: `
		<app-select
			[label]="label"
			[control]="control"
			[selectService]="selectService"
			[isMultiple]="isMultiple"
		></app-select>
	`,
	providers:[{ provide: 'SelectService', useClass: OrganizationSelectService }, { provide: 'OS_DataService', useClass: DataService }]
})
export class OrganizationSelectComponent extends BaseSelector {
	constructor(@Inject('SelectService') public override selectService: OrganizationSelectService){
		super(selectService);
	}
}