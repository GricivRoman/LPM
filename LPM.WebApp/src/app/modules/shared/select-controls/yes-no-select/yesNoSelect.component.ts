import { Component, Inject } from '@angular/core';
import { YesNoSelectService } from './yesNoSelect.service';
import { BaseSelector } from '../../base-components/selectComponent';

@Component({
	selector: 'yes-no-select',
	template: `
        <div class="row">
            <div class=col-8>
                <label for="selector">{{label}}</label>
            </div>
            <div class=col-4>
                <app-select
                    [control]="control"
                    [selectService]="selectService"
                ></app-select>
            </div>
        </div>

    `,
	providers:[{ provide: 'SelectService', useClass: YesNoSelectService }]
})
export class YesNoSelectComponent extends BaseSelector {

	constructor(@Inject('SelectService') public override selectService: YesNoSelectService){
		super(selectService);
	}
}