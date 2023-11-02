import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../services/data.service';
import { BaseEntity } from '../models/baseEntity';
import { AlertService } from '../module-frontend/forc-alert/alert.service';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ApiValidationErrorsResolvingService } from '../services/apiValidationErrorsResolving.service';
import { Observer, takeUntil, Subject } from 'rxjs';
import { Guid } from 'guid-typescript';
import { AlertDialogStates } from '../module-frontend/forc-alert/alertDialogStates';
import { DatePipe } from '@angular/common';

@Component({
	selector: 'app-reactive-form-component',
	template: ''
})
export class ReactiveFromComponent<TEntity extends BaseEntity> implements OnInit, OnDestroy{
	private readonly _destroy$ = new Subject<void>;
	public readonly destroy$ = this._destroy$.asObservable();

	public form: FormGroup;
	public model: TEntity;
	protected modelSource: TEntity;
	public apiUrl: string;
	public modelId?: Guid;
	public saveButtonDisabled: boolean;

	// TODO вынести создание мустой модели в базовый компонент
	protected createEmptyModel : () => TEntity;

	constructor(
        protected dataService: DataService<TEntity>,
        protected alertService: AlertService,
        protected errorResolvingService: ApiValidationErrorsResolvingService
	){
	}

	ngOnInit() {
		this.dataService.url = this.apiUrl;
		if(this.modelId){
			this.setModelByModelId(this.modelId);
		} else {
			this.model = this.createEmptyModel();
		}

		this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => this.onFormValueChange());
	}

	onFormValueChange(){
		this.form.markAsTouched();
		this.saveButtonDisabled = !this.form?.valid;
		// TODO реализовать метод Equals, для сравнения равенства значений всех полей
		// this.saveButtonDisabled = this.model === this.modelSource;
	}

	public setModelByModelId(id: Guid, setModelAction?: () => void) {
		this.dataService.get(id).pipe(takeUntil(this.destroy$)).subscribe({
			next: (data: TEntity) => {
				this.model = data;
				this.modelSource = { ... this.model };
				this.initFrom(this.model);

				if(setModelAction){
					setModelAction();
				}
			},
			error: (err) => {
				this.showError(err);
			}
		});
	}

	public save(saveAction?: (id: Guid) => void){
		if(!this.form?.valid){
			this.alertService.showMessage('The form is invalid', AlertDialogStates.error);
			return;
		}
		this.updateModel();
		if(this.model?.id){
			this.dataService.update(this.model).pipe(takeUntil(this.destroy$)).subscribe(this.afterSaveOrUpdateAction(saveAction));
		} else {
			this.dataService.save(this.model).pipe(takeUntil(this.destroy$)).subscribe(this.afterSaveOrUpdateAction(saveAction));
		}
	}

	public delete(id: Guid){
		this.dataService.delete(id);
	}

	public initFrom(data: TEntity){
		Object.keys(this.form.controls).forEach((controlKey) => {
			(Object(this.form.controls[controlKey]) as AbstractControl).setValue(this.getValueToSetToForm(data, controlKey), {
				emitEvent: true
			});
		});
	}

	refreshDataServiceUrl(){
		this.dataService.url = this.apiUrl;
	}

	ngOnDestroy(){
		this._destroy$.next();
		this._destroy$.complete();
	}

	protected updateModel(){
		Object.keys(this.form.controls).forEach((controlKey) => {
			Object(this.model)[controlKey] = (Object(this.form.controls[controlKey]) as AbstractControl).value;
		});
	}

	private afterSaveOrUpdateAction(saveAction?: (id: Guid) => void): Partial<Observer<any>>{
		return {
			next: (id: Guid) => {
				this.alertService.showMessage('Saved successful', AlertDialogStates.success);
				if(saveAction){
					saveAction(id);
				}
			},
			error: (err) => {
				this.errorResolvingService.resolveApiValidationErrors(this.form, err);
				this.showError(err);
			}
		};
	}

	private showError(err: any){
		if(typeof err.message === 'string' ){
			this.alertService.showMessage(err.message, AlertDialogStates.error);
		}
	}

	private getValueToSetToForm(data: TEntity, controlKey: string): any{
		const fieldValue = Object(data)[controlKey];
		const date = new Date(fieldValue);

		return typeof fieldValue === 'string' && isFinite(+date) ? this.getDateString(date) : fieldValue;
	}

	private getDateString(date: Date): string {
		const datePipe: DatePipe = new DatePipe('en-US');
		const dateString = datePipe.transform(date, 'YYY-MM-dd');
		return dateString as string;
	}
}