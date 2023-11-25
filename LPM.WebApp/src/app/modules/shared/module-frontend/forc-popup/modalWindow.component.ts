import { Component, OnDestroy, Type, ViewChild } from '@angular/core';
import { CommonModule, NgComponentOutlet } from '@angular/common';

@Component({
	selector: 'app-popup-window',
	template: `
		<div>
			<div class="modal-header p-2">
				<h4 class="mb-1">{{title}}</h4>
			</div>
			<div class="modal-body py-1">
				<ng-container *ngComponentOutlet="innerComp"></ng-container>
			</div>
			<div class="modal-footer p-0 px-1">
				<button type="button" class="btn btn-outline-secondary" (click)="reset()" *ngIf="resetButtonVisible">Сбросить</button>
				<button type="button" class="btn btn-success" (click)="save()" *ngIf="saveButtonVisible" [disabled]="saveButtonDisabled">{{saveButtonTitle}}</button>
				<button type="button" class="btn btn-outline-secondary" (click)="close()">Закрыть</button>
			</div>
		</div>
	`,
	standalone: true,
	imports: [CommonModule]
})

// TODO придумать как добавлять кнопки динамически
export abstract class ModalWindowComponent implements OnDestroy{
	public static componentToWrap: Type<any>;
	protected innerComp: Type<any>;

	public title: string;
	public saveButtonTitle: string;

	public saveButtonDisabled : boolean;
	public saveButtonVisible = true;
	public resetButtonVisible = false;

	public save: () => void;
	public close: () => void;
	public reset: () => void;

	@ViewChild(NgComponentOutlet, {static: false}) inerRef: NgComponentOutlet;

	constructor(){
		this.innerComp = ModalWindowComponent.componentToWrap;
	}

	ngOnDestroy(): void {
		ModalWindowComponent.componentToWrap = Type;
	}

}
