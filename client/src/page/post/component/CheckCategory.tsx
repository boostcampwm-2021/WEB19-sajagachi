import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import Chip from '@mui/material/Chip';
import { fetchGet } from '../../../util';
import service from '../../../util/service';

const CategoryStyle = css`
  width: 90%;
  font-family: -apple-system;
  & > h3 {
    margin-bottom: 5px;
  }
  & > div {
    display: flex;
    flex-wrap: wrap;
  }
`;

const ChipStyle = (checked: boolean) => {
  return css`
    width: 80px;
    margin: 3px 3px;
    ${checked ? 'background-color: #ebabab; color: #ffffff;' : ''}
    &:hover {
      background-color: #ebe4e4;
      ${checked ? 'background-color: #ebabab;' : ''}
    }
  `;
};

interface CategoryState {
  category: number | null;
  setCategory: (category: number | null) => void;
  popError: (msg: string) => void;
}

function CheckCategory({ category, setCategory, popError }: CategoryState) {
  const [categoryList, setCategoryList] = useState<{ name: string; checked: boolean }[]>([]);

  const getCategories = async () => {
    try {
      const categories = await service.getCategories();
      setCategoryList(
        categories.map((x: any) => {
          return { name: x.name, checked: false };
        })
      );
    } catch (err: any) {
      popError(err.message);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleCategoryClick = (idx: number) => {
    const updateCategoryList = [...categoryList];
    updateCategoryList[idx].checked = true;
    if (category !== null) updateCategoryList[category - 1].checked = false;
    setCategoryList(updateCategoryList);
    if (category === idx + 1) setCategory(null);
    else setCategory(idx + 1);
  };

  return (
    <div css={CategoryStyle}>
      <h3>카테고리</h3>
      <div>
        {categoryList.map((categoryElem, i) => (
          <Chip
            label={categoryElem.name}
            css={ChipStyle(categoryElem.checked)}
            onClick={() => {
              handleCategoryClick(i);
            }}
            data-idx={i}
          />
        ))}
      </div>
    </div>
  );
}

export default React.memo(CheckCategory);
