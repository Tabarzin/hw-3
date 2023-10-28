import Button from '@App/commonComponents/Button';
import Input from '@App/commonComponents/Input';
import MultiDropdown from '@App/commonComponents/MultiDropdown';
import Text from '@App/commonComponents/Text';
import productStore from '@App/stores/ProductsStore';
import { useLocalObservable } from 'mobx-react-lite';
import * as React from 'react';
import ProductCards from './ProductCards';
import ProductsTitle from './ProductsTitle';
import styles from './Products.module.scss';

const Products = () => {
  const [numberOfProducts, setNumberOfProducts] = React.useState(0);

  React.useEffect(() => {
    productStore.fetchProductsData().then(() => {
      setNumberOfProducts(productStore.products.length);
    });
  }, []);
  // const numberOfProducts = productStore.products.length;

  const getPlaceholderText = (selectedOptions: Option[]) => {
    if (selectedOptions.length === 0) {
      return 'Filter';
    }

    return 'Filter';
  };

  return (
    <div className={styles.products}>
      <ProductsTitle />
      <div className={styles.input_filter}>
        <div className={styles.input_btn}>
          <Input
            className={styles.input_text}
            value={'Search product'}
            onChange={function (value: string): void {
              throw new Error('Function not implemented.');
            }}
          />
          <Button> Find now</Button>
        </div>
        <div className={styles.filter}>
          <MultiDropdown
            options={[]}
            value={[]}
            onChange={function (value: Option[]): void {
              throw new Error('Function not implemented.');
            }}
            getTitle={getPlaceholderText}
          />
        </div>
      </div>

      <div className={styles.cards_block}>
        <div className={styles.product_number}>
          <Text tag={'h1'} color={'primary'} weight={'bold'}>
            Total product
          </Text>
          <Text view={'p-20'} color={'accent'} weight={'bold'}>
            {numberOfProducts}
          </Text>
        </div>
        <ProductCards />
      </div>
    </div>
  );
};

export default Products;
