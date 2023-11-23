import { Component, Inject, ViewChild } from '@angular/core';
import { YesNoSelectService } from './yesNoSelect.service';
import { BaseSelector } from '../../base-components/selectComponent';
import { SelectComponent } from '../../module-frontend/forc-select/selector/select.component';

@Component({
	selector: 'yes-no-select',
	template: `
        <app-select
            [label]="label"
            [control]="control"
            [selectService]="selectService"
        ></app-select>
    `,
	providers:[{ provide: 'SelectService', useClass: YesNoSelectService }]
})
export class YesNoSelectComponent extends BaseSelector {

	constructor(@Inject('SelectService') public override selectService: YesNoSelectService){
		super(selectService);
	}
}