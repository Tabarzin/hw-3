import BackButton from '@App/commonComponents/BackButton';
import Text from '@App/commonComponents/Text';
import axios from 'axios';
import * as React from 'react';
import { useParams } from 'react-router-dom';

import { Navigation, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/scss';
import 'swiper/scss/navigation';

import 'swiper/scss/scrollbar';
import RelatedItems from './RelatedItems';
import styles from './ProductPage.module.scss';
import Button from '@App/commonComponents/Button';

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
  console.log('Hey', productDetails.category?.id);

  return (
    <div className={styles.product_wrapper}>
      <div className={styles.product}>
        <BackButton />
        <div className={styles.product_container}>
          <Swiper
            modules={[Navigation, Scrollbar, A11y]}
            spaceBetween={40}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
          >
            {productDetails.images &&
              productDetails.images.map((imageUrl: string, index: number) => (
                <SwiperSlide key={index}>
                  <img
                    key={index}
                    className={styles.product_image}
                    src={imageUrl}
                    alt={`Product Image ${index + 1} `}
                  />
                </SwiperSlide>
              ))}
          </Swiper>
          <div className={styles.product_text_block}>
            <Text view="title" className={styles.title}>
              {productDetails.title}
            </Text>
            <Text view="p-20" maxLines={2} className={styles.description}>
              {productDetails.description}
            </Text>
            <Text view="title" className={styles.price}>{`$${productDetails.price}`}</Text>
            <div className={styles.buttons}>
              <Button>Buy Now</Button>
              <Button>Add to Cart</Button>
            </div>
          </div>
        </div>
      </div>
      {<RelatedItems categoryId={productDetails.category?.id} />}
    </div>
  );
};

export default ProductPage;
