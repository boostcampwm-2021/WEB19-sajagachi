export interface ItemType {
	id: number;
	category: string;
	title: string;
	capacity: number;
	participantCnt: number;
	deadline: string;
}

export type TagType = {
	content: string;
	color: string;
};
