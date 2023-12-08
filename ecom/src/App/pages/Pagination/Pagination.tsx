/* eslint-disable react/prop-types */
// import * as React from 'react';
// import { useSearchParams } from 'react-router-dom';
// import Page, { QUERY_PAGE_PARAM } from './Page';

// import styles from './Pagination.module.scss';

// const convertStrToNum = (value: string): number | null => {
//   const number = Number(value);

//   if (Number.isNaN(number)) {
//     return null;
//   }
//   return number;
// };

// const Pagination: React.FC = () => {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const pageParam = searchParams.get(QUERY_PAGE_PARAM);
//   const activePageNumber = pageParam === null ? pageParam : convertStrToNum(pageParam);

//   //   const handlePageClick = (pageNumber: number) => {
//   //     setSearchParams({ [QUERY_PAGE_PARAM]: pageNumber.toString() });
//   //   };

//   //   if (activePageNumber === null) {
//   //     return null;
//   //   }

//   return (
//     <div className={styles.pagination}>
//       {[1, 2, 3].map((number) => (
//         <Page
//           isActive={activePageNumber === number}
//           key={number}
//           number={number}
//           //   onClick={() => handlePageClick(number)}
//         />
//       ))}
//     </div>
//   );
// };

// export default Pagination;

// import paginationStore from '@App/stores/PaginationStore';
// import { observer } from 'mobx-react-lite';
// import * as React from 'react';

// const Pagination = observer(() => {
//   const { currentPage, totalPages, setCurrentPage } = paginationStore;

//   const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

//   return (
//     <div className="pagination-numbers">
//       {pageNumbers.map((pageNumber) => (
//         <button
//           key={pageNumber}
//           onClick={() => setCurrentPage(pageNumber)}
//           className={currentPage === pageNumber ? 'active' : ''}
//         >
//           {pageNumber}
//         </button>
//       ))}
//     </div>
//   );
// });

// export default Pagination;

// import paginationStore from '@App/stores/PaginationStore';
// import productsStore from '@App/stores/ProductsStore';
// import { observer } from 'mobx-react-lite';
// import * as React from 'react';

// const Pagination = observer(() => {
//   const { currentPage, totalPages, setCurrentPage } = paginationStore;

//   const itemsPerPage = paginationStore.itemsPerPage;

//   const pages = Math.ceil(productsStore.products.length / itemsPerPage);

//   const pageNumbers = Array.from({ length: pages }, (_, i) => i + 1);

//   const handleNextPageClick = () => {
//     productsStore.loadNextPage();
//   };

//   return (
//     <div className="pagination-numbers">
//       {pageNumbers.map((pageNumber) => (
//         <button
//           key={pageNumber}
//           onClick={() => handleNextPageClick()}
//           className={currentPage === pageNumber ? 'active' : ''}
//         >
//           {pageNumber}
//         </button>
//       ))}
//     </div>
//   );
// });

// export default Pagination;

import { usePagination, DOTS } from '@App/customHooks/usePagination';
import * as React from 'react';
import styles from './Pagination.module.scss';

const Pagination = (props) => {
  const { onPageChange, totalCount, siblingCount = 1, currentPage, pageSize } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (!paginationRange || !Array.isArray(paginationRange) || paginationRange.length < 2) {
    return null;
  }

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul className={styles.pagination_container}>
      <li
        className={`${styles.pagination_item} ${currentPage === 1 ? styles.disabled : styles.active}`}
        onClick={onPrevious}
      ></li>
      <div className={styles.arrow_left}>
        <svg
          className={styles.arrow_left}
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
        >
          <path
            d="M20.12 26.5599L11.4267 17.8666C10.4 16.8399 10.4 15.1599 11.4267 14.1333L20.12 5.43994"
            stroke="#AFADB5"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {paginationRange.map((pageNumber) => {
        if (pageNumber === DOTS) {
          return (
            <li key={1} className="pagination-item dots">
              &#8230;
            </li>
          );
        }

        return (
          <li
            key={pageNumber}
            className={`${styles.pagination_item} ${pageNumber === currentPage ? styles.selected : ''}`}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={`${styles.pagination_item} ${currentPage === lastPage ? styles.disabled : styles.active}`}
        onClick={onNext}
      >
        <div className="arrow right">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path
              d="M11.88 26.5599L20.5733 17.8666C21.6 16.8399 21.6 15.1599 20.5733 14.1333L11.88 5.43994"
              stroke="#151411"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </li>
    </ul>
  );
};

export default Pagination;
