import * as React from 'react';
import { useSearchParams } from 'react-router-dom';
import Page, { QUERY_PAGE_PARAM } from './Page';

import styles from './Pagination.module.scss';

const convertStrToNum = (value: string): number | null => {
  const number = Number(value);

  if (Number.isNaN(number)) {
    return null;
  }
  return number;
};

const Pagination: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = searchParams.get(QUERY_PAGE_PARAM);
  const activePageNumber = pageParam === null ? pageParam : convertStrToNum(pageParam);

  //   const handlePageClick = (pageNumber: number) => {
  //     setSearchParams({ [QUERY_PAGE_PARAM]: pageNumber.toString() });
  //   };

  //   if (activePageNumber === null) {
  //     return null;
  //   }

  return (
    <div className={styles.pagination}>
      {[1, 2, 3].map((number) => (
        <Page
          isActive={activePageNumber === number}
          key={number}
          number={number}
          //   onClick={() => handlePageClick(number)}
        />
      ))}
    </div>
  );
};

export default Pagination;
