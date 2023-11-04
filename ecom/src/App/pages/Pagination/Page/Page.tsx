// import * as React from 'react';
// import { NavLink } from 'react-router-dom';
// import styles from './Page.module.scss';

// type Props = {
//   number: number;
//   isActive: boolean;
//   //   onClick: () => void;
// };

// export const QUERY_PAGE_PARAM = 'page';

// const Page: React.FC<Props> = ({ number, isActive }) => {
//   const basicStyle = `${styles.page}`;
//   const activeStyle = `${styles.page_active}`;

//   return (
//     <NavLink to={`?${QUERY_PAGE_PARAM}=${number}`} className={`${basicStyle} ${isActive ? activeStyle : ''}`}>
//       {number}
//     </NavLink>
//   );

//   //   <div className={`${basicStyle} ${isActive ? { activeStyle } : ''}`}>{number}</div>;
// };

// export default Page;

import paginationStore from '@App/stores/PaginationStore';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import styles from './Page.module.scss';

type Props = {
  number: number;
};

const Page = observer(({ number }: Props) => {
  const isActive = number === paginationStore.currentPage;
  const basicStyle = `${styles.page}`;
  const activeStyle = `${styles.page_active}`;

  const handlePageClick = () => {
    paginationStore.setCurrentPage(number);
  };

  return (
    <button onClick={handlePageClick} className={`${basicStyle} ${isActive ? activeStyle : ''}`}>
      {number}
    </button>
  );
});

export default Page;
