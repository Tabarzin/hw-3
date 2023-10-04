import Button from '@App/commonComponents/Button';
import Card from '@App/commonComponents/Card';
import axios from 'axios';
import * as React from 'react';
import { Link } from 'react-router-dom';
import st from './RelatedItems.module.scss';

interface RelatedItemsProps {
  categoryId: number;
}

const RelatedItems: React.FC<RelatedItemsProps> = ({ categoryId }) => {
  const [relatedProducts, setRelatedProducts] = React.useState([]);

  React.useEffect(() => {
    // Fetch all categories to find the category name
    axios
      .get('https://api.escuelajs.co/api/v1/categories')
      .then((categoriesResponse) => {
        // Find the category with the specified categoryId
        const category = categoriesResponse.data.find((category) => category.id === categoryId);

        if (category) {
          axios
            .get('https://api.escuelajs.co/api/v1/products')
            .then((productsResponse) => {
              console.log('Products Response:', productsResponse.data);

              const filteredProducts = productsResponse.data.filter(
                (product) => product.category.name === category.name,
              );

              const first3Products = filteredProducts.slice(0, 3);

              setRelatedProducts(first3Products);

              //   setRelatedProducts(filteredProducts);
            })
            .catch((error) => console.log(error));
        }
      })
      .catch((error) => console.log(error));
  }, [categoryId]);

  console.log('related products', relatedProducts);

  return (
    <>
      <span className={st.title}>Related Items</span>
      <div className={st.related_block}>
        {relatedProducts.map((relatedProduct) => (
          <Link key={relatedProduct['id']} to={`/product/${relatedProduct['id']}`} style={{ textDecoration: 'none' }}>
            <Card
              key={relatedProduct['id']}
              image={relatedProduct.images[1]}
              captionSlot={relatedProduct.category.name}
              title={relatedProduct['title']}
              subtitle={relatedProduct['description']}
              contentSlot={`$${relatedProduct.price}`}
              actionSlot={<Button> Add to Cart </Button>}
              onClick={() => console.log('Card clicked:', relatedProduct.id)}
            />
          </Link>
        ))}
      </div>
    </>
  );
};

export default RelatedItems;
