import { Component, Inject } from '@angular/core';
import { OrganizationSelectService } from './organizationSelect.service';
import { DataService } from '../../services/data.service';
import { SelectComponent } from '../../base-components/selectComponent';

@Component({
	selector: 'app-select-organization',
	template: `
		<app-select-single
			[label]="label"
			[control]="control"
			[selectService]="selectService"
		></app-select-single>
	`,
	providers:[{ provide: 'SelectService', useClass: OrganizationSelectService }, { provide: 'OS_DataService', useClass: DataService }]
})
export class OrganizationSelectComponent extends SelectComponent {
	constructor(@Inject('SelectService') public override selectService: OrganizationSelectService){
		super(selectService);
	}
}