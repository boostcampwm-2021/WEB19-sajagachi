export interface ItemType {
	id: number;
	category: string;
	title: string;
	content: string;
	capacity: number;
	participantCnt: number;
	deadline: string;
	finished: boolean;
}

export interface LocationType {
	lat: number;
	lng: number;
	isLoaded?: boolean;
}

export interface LoginUserType {
	id: number;
	name: string;
	isSigned: boolean;
}

export interface QueryStringType {
	offset?: number;
	limit?: number;
	category?: number[];
	finished?: boolean | undefined;
	lat?: number;
	long?: number;
	search?: string;
}
