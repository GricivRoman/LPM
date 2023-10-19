import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { BaseEntity } from '../models/baseEntity';

@Injectable()
export class DataService<T extends BaseEntity> {
	public url: string;

	constructor(private http: HttpClient){
	}

	public get(id: Guid): Observable<T>{
		return this.http.get<T>(`${this.url}/${id}`);
	}

	// TODO пагинация
	public getList(): Observable<T[]>{
		return this.http.get<T[]>(`${this.url}/list`);
	}

	// TODO пагинация
	public getSelectItemList(): Observable<T[]>{
		return this.http.get<T[]>(`${this.url}/select-list`);
	}

	public save(model: T): Observable<Guid>{
		return this.http.post<Guid>(`${this.url}`, model);
	}

	public update(model: T): Observable<void>{
		return this.http.patch<void>(`${this.url}`, model);
	}

	public delete(id: Guid): Observable<void>{
		return this.http.delete<void>(`${this.url}/${id}`);
	}
}