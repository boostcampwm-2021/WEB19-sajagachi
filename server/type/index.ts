export type getPostsOption = {
	offset: number | undefined;
	limit: number | undefined;
	category: string | undefined;
	finished: boolean | undefined;
	search: string | undefined;
	lat: number | undefined;
	long: number | undefined;
};

export type PostColumn = {
	userId: number;
	categoryId: number;
	title: string;
	content: string;
	capacity: number;
	deadline: string;
	lat: number;
	long: number;
};
