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

import Button from '@App/commonComponents/Button';
import Card from '@App/commonComponents/Card';
import paginationStore from '@App/stores/PaginationStore';
import productStore from '@App/stores/ProductsStore';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { Link } from 'react-router-dom';
import styles from './ProductCards.module.scss';

const ProductCards: React.FC = observer(() => {
  const products = productStore.products; // Access products from the MobX store

  React.useEffect(() => {
    productStore.fetchProductsData(); // Fetch data when the component mounts
  }, []);

  const startIdx = (paginationStore.currentPage - 1) * paginationStore.itemsPerPage;
  const endIdx = startIdx + paginationStore.itemsPerPage;

  return (
    <div className={styles.cards}>
      {products.slice(startIdx, endIdx).map((product) => (
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
  );
});

export default ProductCards;
