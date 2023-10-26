import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { BaseEntity } from '../models/baseEntity';
import { PagedQueryFilter } from '../filters/pagedQueryFilter';
import QueryString from 'qs';

@Injectable()
export class DataService<T extends BaseEntity> {
	public url: string;

	constructor(private http: HttpClient){
	}

	public get(id: Guid): Observable<T>{
		return this.http.get<T>(`${this.url}/${id}`);
	}

	// TODO пагинация
	public getList(filterObj: PagedQueryFilter = new PagedQueryFilter()): Observable<T[]>{
		const query = QueryString.stringify(filterObj, {addQueryPrefix: true, allowDots: true});
		return this.http.get<T[]>(`${this.url}/list${query}`);
	}

	public getSelectItemList(filterObj: PagedQueryFilter = new PagedQueryFilter()): Observable<T[]>{
		const query = QueryString.stringify(filterObj, {addQueryPrefix: true, allowDots: true});
		return this.http.get<T[]>(`${this.url}/select-list${query}`);
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