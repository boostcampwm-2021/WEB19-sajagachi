import React from 'react';
import { css } from '@emotion/react';
import Select from '@mui/material/Select/Select';
import MenuItem from '@mui/material/MenuItem';

interface CapacityState {
	capacity: number;
	setCapacity: (capacity: number) => void;
}

const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: 48 * 3 + 8
		}
	}
};

function SelectCapacity({ capacity, setCapacity }: CapacityState) {
	function handleCapacityChange(e: any) {
		setCapacity(e.target.value);
	}

	return (
		<Select
			labelId="demo-simple-select-standard-label"
			id="demo-simple-select-standard"
			value={capacity}
			onChange={handleCapacityChange}
			sx={{
				width: '120px',
				mt: '5vh',
				mb: '5vh',
				borderColor: '#ebabab',
				color: '#ebabab'
			}}
			maxRows={4}
			MenuProps={MenuProps}
			variant="standard"
		>
			<MenuItem value={0}>최대인원</MenuItem>
			<MenuItem value={2}>2</MenuItem>
			<MenuItem value={3}>3</MenuItem>
			<MenuItem value={4}>4</MenuItem>
			<MenuItem value={5}>5</MenuItem>
			<MenuItem value={6}>6</MenuItem>
		</Select>
	);
}

export default React.memo(SelectCapacity);
