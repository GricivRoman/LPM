import { SortingItem } from './sortingItem';

export class PagedQueryObject {
	page: number = 1;
	pageSize: number = 10;
	takeAll: boolean;
	sortingCollection: SortingItem[];
}