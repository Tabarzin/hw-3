import Button from '@App/commonComponents/Button';
import * as React from 'react';
import Card from '@/App/commonComponents/Card';
import { fetchProducts } from '@/App/services/api';
import styles from './ProductCards.module.scss';
import { Link } from 'react-router-dom';

const ProductCards = () => {
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    fetchProducts()
      .then((response) => {
        setProducts(response.data);
        console.log(products);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  return (
    <div className={styles.cards}>
      {products.map((product) => (
        <Link key={product['id']} to={`/product/${product['id']}`}>
          <Card
            key={product['id']}
            image={product.images[1]}
            captionSlot={product.category.name}
            title={product['title']}
            subtitle={product['description']}
            contentSlot={`$${product.price}`}
            actionSlot={<Button> Add to Cart </Button>}
            onClick={() => console.log('Card clicked:', product.id)}
          />
        </Link>
      ))}
    </div>
  );
};

export default ProductCards;
