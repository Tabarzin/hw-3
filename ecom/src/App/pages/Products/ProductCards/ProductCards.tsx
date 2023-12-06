// import Button from '@App/commonComponents/Button';
// import Card from '@App/commonComponents/Card';

// import { fetchProducts } from '@App/services/api';
// import * as React from 'react';
// import { Link } from 'react-router-dom';
// import styles from './ProductCards.module.scss';

// const ProductCards = () => {
//   const [products, setProducts] = React.useState([]);

//   React.useEffect(() => {
//     fetchProducts()
//       .then((response) => {
//         setProducts(response.data);
//         console.log(products);
//       })
//       .catch((error) => {
//         console.error('Error fetching products:', error);
//       });
//   }, []);

//   return (
//     <div className={styles.cards}>
//       {products.map((product) => (
//         <Link key={product['id']} to={`/product/${product['id']}`} style={{ textDecoration: 'none' }}>
//           <Card
//             key={product['id']}
//             image={product.images[1]}
//             captionSlot={product.category.name}
//             title={product['title']}
//             subtitle={product['description']}
//             contentSlot={`$${product.price}`}
//             actionSlot={<Button> Add to Cart </Button>}
//             onClick={() => console.log('Card clicked:', product.id)}
//           />
//         </Link>
//       ))}
//     </div>
//   );
// };

// export default ProductCards;

// import Button from '@App/commonComponents/Button';
// import Card from '@App/commonComponents/Card';
// import paginationStore from '@App/stores/PaginationStore';
// import productStore from '@App/stores/ProductsStore';
// import { runInAction } from 'mobx';
// import { observer } from 'mobx-react-lite';
// import * as React from 'react';
// import { Link } from 'react-router-dom';
// import styles from './ProductCards.module.scss';

// const ProductCards: React.FC = observer(() => {
//   React.useEffect(() => {
//     productStore.fetchProductsData();
//   }, []);

//   const products = productStore.products;

//   const startIdx = (paginationStore.currentPage - 1) * paginationStore.itemsPerPage;
//   const endIdx = startIdx + paginationStore.itemsPerPage;

//   return (
//     <div className={styles.cards}>
//       {products.slice(startIdx, endIdx).map((product) => (
//         <Link key={product.id} to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
//           <Card
//             key={product.id}
//             image={product.images[1]}
//             captionSlot={product.category.name}
//             title={product.title}
//             subtitle={product.description}
//             contentSlot={`$${product.price}`}
//             actionSlot={<Button> Add to Cart </Button>}
//             onClick={() => console.log('Card clicked:', product.id)}
//           />
//         </Link>
//       ))}
//     </div>
//   );
// });

// export default ProductCards;

// import Button from '@App/commonComponents/Button';
// import Card from '@App/commonComponents/Card';
// import paginationStore from '@App/stores/PaginationStore';

// import productsStore from '@App/stores/ProductsStore';
// import { observer } from 'mobx-react-lite';
// import * as React from 'react';
// import { Link } from 'react-router-dom';
// import styles from './ProductCards.module.scss';

// const ProductCards = observer(() => {
//   const products = productsStore.products;

//   const startIdx = (paginationStore.currentPage - 1) * paginationStore.itemsPerPage;
//   const endIdx = startIdx + paginationStore.itemsPerPage;

//   console.log(products, 'Products');

//   return (
//     <div className={styles.cards}>
//       {products.slice(startIdx, endIdx).map((product) => (
//         <Link key={product.id} to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
//           <Card
//             key={product.id}
//             image={product.images[1]}
//             captionSlot={product.category.name}
//             title={product.title}
//             subtitle={product.description}
//             contentSlot={`$${product.price}`}
//             actionSlot={<Button> Add to Cart </Button>}
//             onClick={() => console.log('Card clicked:', product.id)}
//           />
//         </Link>
//       ))}
//     </div>
//   );
// });

// export default ProductCards;

import Button from '@App/commonComponents/Button';
import Card from '@App/commonComponents/Card';
import paginationStore from '@App/stores/PaginationStore';
import productsStore from '@App/stores/ProductsStore';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../../Pagination';
import styles from './ProductCards.module.scss';

const ProductCards: React.FC = observer(() => {
  React.useEffect(() => {
    productsStore.fetchProductsData();
  }, []);

  const products = productsStore.products;
  console.log(products);

  let PageSize = 9;

  const [currentPage, setCurrentPage] = React.useState(1);

  const currentTableData = React.useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return products.slice(firstPageIndex, lastPageIndex);
  }, [PageSize, currentPage]);

  console.log(currentTableData, 'TABLE');

  return (
    <div>
      <div className={styles.cards}>
        {currentTableData.map((product) => (
          <Link key={product.id} to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
            <Card
              key={product.id}
              image={product.images[1]}
              captionSlot={product.category.name}
              title={product.title}
              subtitle={product.description}
              contentSlot={`$${product.price}`}
              actionSlot={<Button> Add to Cart </Button>}
              onClick={() => console.log('Card clicked:', product.id)}
            />
          </Link>
        ))}
      </div>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={products.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
});

export default ProductCards;
