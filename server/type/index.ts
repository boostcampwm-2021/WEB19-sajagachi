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

export type TokenType = {
	id: number;
};

export type APIOutput = {
	title: string | null;
	description: string | null;
	image: string | null;
	siteName: string | null;
	hostname: string | null;
};
type Image = {
	url: string;
};

export type MetaResult = {
	images: Array<Image>;
	meta: {
		description?: string;
		title?: string;
	};
	og: {
		image?: string;
		description?: string;
		title?: string;
		images?: Array<Image>;
		site_name?: string;
		type?: string;
		url?: string;
		videos?: Array<Image>;
	};
};
