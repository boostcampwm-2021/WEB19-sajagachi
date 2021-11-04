export interface ItemType {
	id: number;
	category: string;
	title: string;
	capacity: number;
	participantCnt: number;
	deadline: string;
}

export interface LocationType {
	lat: number;
	lng: number;
}

export interface QueryStringType {
	offset: number;
	limit: number;
	category: boolean[];
	finished: boolean[];
	location: LocationType;
}
