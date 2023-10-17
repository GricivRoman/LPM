import { Component, Input, OnInit } from '@angular/core';
import { SelectItem } from '../../../models/selectItem';
import { FormControl } from '@angular/forms';
import { SelectService } from '../select.service';
import { first } from 'rxjs';

@Component({
	selector: 'app-select-single',
	templateUrl: 'select-single.component.html',
	styleUrls: ['select-single.component.css']
})
export class SelectSingleComponent implements OnInit {

	@Input()
		selectService: SelectService;

	@Input()
		label:string = 'Label required';

	@Input()
		control: FormControl;

	private emptyItem: SelectItem = {
		id: undefined,
		value: '(empty)'
	};

	private loadingItem: SelectItem = {
		id: undefined,
		value: 'loading..'
	};

	selectList: any[] = [this.loadingItem];

	ngOnInit(): void {
		this.control.valueChanges.pipe(first()).subscribe({
			next: () => {
				if(this.control.value) {
					if(!this.control?.value.length) {
						this.selectList = [this.control.value as SelectItem];
					} else {
						this.selectList = this.control.value as SelectItem[];
					}
				}
			}
		});
	}

	selectorOpened() {
		this.selectService.getItemList().subscribe({
			next: (items: SelectItem[]) => {
				if(items.length > 0){
					const itemsToPush = items.filter(x => !this.selectList.map(i => i.id).includes(x.id));
					this.selectList = this.selectList.concat(itemsToPush).filter(x => x !== this.loadingItem);
				} else {
					this.selectList = [this.emptyItem];
				}
			}
		});
	}
}