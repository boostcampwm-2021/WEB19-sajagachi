import { Request, Response } from 'express';
import { parse } from 'html-metadata-parser';
import { MetaResult, APIOutput } from '../type';

export const parsePreviewLinkData = async (req: Request, res: Response, next: Function) => {
  try {
    let url = req.query.url as string;

    if (!url) {
      next({ statusCode: 400, message: 'Invalid URL' });
    }

    url = url.indexOf('://') === -1 ? 'http://' + url : url;

    const isUrlValid =
      /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi.test(url);

    if (!isUrlValid) {
      next({ statusCode: 400, message: 'Invalid URL' });
    }

    const { hostname } = new URL(url);

    const metadata = await getMetadata(url);
    if (!metadata) {
      return sendResponse(res, null);
    }

    const { image, description, title, siteName } = manufactureMetadata(metadata);

    const output: APIOutput = {
      title,
      description,
      image,
      siteName,
      hostname
    };

    sendResponse(res, output);
  } catch (error) {
    next({ statusCode: 500, message: 'Internal server error' });
  }
};

const manufactureMetadata = (metadata: MetaResult) => {
  const image = checkMetadataImage(metadata);
  const description = checkMetadataDesc(metadata);
  const title = checkMetadataTitle(metadata);
  const siteName = checkMetadataSiteName(metadata);
  return { image, description, title, siteName };
};

const checkMetadataImage = (metadata: MetaResult) => {
  const { images, og } = metadata;
  if (og.image) {
    return og.image;
  }
  return images.length > 0 ? images[0].url : null;
};

const checkMetadataDesc = (metadata: MetaResult) => {
  const { og, meta } = metadata;
  if (og.description) {
    return og.description;
  }
  return meta.description ? meta.description : null;
};

const checkMetadataTitle = (metadata: MetaResult) => {
  const { og, meta } = metadata;
  if (og.title) {
    return og.title;
  }
  return meta.title || '';
};

const checkMetadataSiteName = (metadata: MetaResult) => {
  const { og } = metadata;
  return og.site_name || '';
};

const sendResponse = (res: Response, output: APIOutput | null) => {
  if (!output) {
    return res.status(404).json({ metadata: null });
  }

  return res.status(200).json({ metadata: output });
};

const getMetadata = async (url: string): Promise<MetaResult | null> => {
  try {
    const result = (await parse(url)) as MetaResult;
    return result;
  } catch (err) {
    return null;
  }
};
