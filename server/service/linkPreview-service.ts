import linkPreviewGenerator from 'link-preview-generator';

const parsePreviewLinkData = async (url: string) => {
	const previewData = await linkPreviewGenerator(url, [], '', '');
	return previewData;
};

export default { parsePreviewLinkData };
