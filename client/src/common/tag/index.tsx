import React, { useEffect } from 'react';
import { css } from '@emotion/react';
import { TagType } from '../../type/types';
import { Chip } from '@mui/material';

export default function Tag({ content, color }: TagType) {
	return <Chip label={content} sx={{ color }} />;
}
