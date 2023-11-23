import { Component, Input, OnInit } from '@angular/core';
import { SelectItem } from '../../../models/selectItem';
import { SelectService } from '../select.service';
import { first } from 'rxjs';
import { BaseControlComponent } from '../../controls/baseControl.component';

@Component({
	selector: 'app-select',
	templateUrl: 'select.component.html',
	styleUrls: ['select.component.css']
})
export class SelectComponent extends BaseControlComponent implements OnInit {

	@Input()
		selectService: SelectService;

	@Input()
		hideLabel: boolean;

	@Input()
		isMultiple: boolean = false;

	private emptyItem: SelectItem = {
		id: undefined,
		value: '(пусто)'
	};

	private loadingItem: SelectItem = {
		id: undefined,
		value: 'загрузка..'
	};

	selectList: any[] = [this.loadingItem];

	selectorTouched = false;

	override ngOnInit(): void {
		super.ngOnInit();
		this.control.valueChanges.pipe(first()).subscribe({
			next: () => {
				if(this.selectorTouched){
					return;
				}
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
		this.selectorTouched = true;
		this.selectService.getItemList().subscribe({
			next: (items: SelectItem[]) => {
				console.log(this.selectList);
				console.log(items);
				if(items.length > 0){
					const itemsToPush = items.filter(x => !this.selectList.includes(x));
					this.selectList = this.selectList.concat(itemsToPush).filter(x => x.id !== undefined );
				} else {
					this.selectList = [this.emptyItem];
				}
			}
		});
	}

	resetSelectList(){
		this.selectList = [this.loadingItem];
	}
}