import BackButton from '@App/commonComponents/BackButton';
import axios from 'axios';
import * as React from 'react';
import { useParams } from 'react-router-dom';

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/scss';
import 'swiper/scss/navigation';

import 'swiper/scss/scrollbar';
import styles from './ProductPage.module.scss';

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
    <div className={styles.product}>
      <BackButton />
      <div className={styles.product_container}>
        <Swiper
          modules={[Navigation, Scrollbar, A11y]}
          spaceBetween={10}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log('slide change')}
        >
          {productDetails.images &&
            productDetails.images.map((imageUrl: string, index: number) => (
              <SwiperSlide key={index} className={styles.product_image}>
                <img key={index} src={imageUrl} alt={`Product Image ${index + 1} `} />
              </SwiperSlide>
            ))}
        </Swiper>
        <h2>{productDetails.id}</h2>
        <p>{productDetails.description}</p>
        <p>{productDetails.price}</p>
      </div>
    </div>
  );
};

export default ProductPage;
