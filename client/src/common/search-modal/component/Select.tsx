import React, { useEffect } from 'react';
import SelectChip from './SelectChip';

interface SelectProps {
  options: string[];
  selected: boolean[];
  setSelected: (selected: boolean[]) => void;
}

export default function Select(props: SelectProps) {
  useEffect(() => {
    const defaultValue = new Array(props.options.length).fill(false);
    props.setSelected(defaultValue);
  }, []);

  const handleSelect = (idx: number) => {
    const newVal = [...props.selected];
    newVal[idx] = !newVal[idx];
    props.setSelected(newVal);
  };

  return (
    <div>
      {props.options.map((e, i) => (
        <SelectChip selected={props.selected[i]} onClick={() => handleSelect(i)}>
          {e}
        </SelectChip>
      ))}
    </div>
  );
}
