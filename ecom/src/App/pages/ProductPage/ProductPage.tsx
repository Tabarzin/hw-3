import * as React from 'react';
import { useParams } from 'react-router-dom';
import { fetchProduct } from '@/App/services/api';
import styles from './ProductPage.module.scss';
import axios from 'axios';

interface ProductDetailsProps {
  productId: string;
}

const ProductPage: React.FC<ProductDetailsProps> = ({ productId }) => {
  const { id } = useParams<{ id: string }>();
  const [productDetails, setProductDetails] = React.useState<any>({});

  React.useEffect(() => {
    axios
      .get(`https://api.escuelajs.co/api/v1/products/${id}`)
      .then((response) => setProductDetails(response.data))
      .catch((error) => console.log(error));
  }, [id]);
  console.log(productDetails);

  return (
    <div className="product-details">
      <h2>{productDetails.id}</h2>
      <p>{productDetails.description}</p>
      <p>{productDetails.price}</p>
    </div>
  );
};

export default ProductPage;
