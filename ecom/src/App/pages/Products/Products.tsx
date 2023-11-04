import Button from '@App/commonComponents/Button';
import Input from '@App/commonComponents/Input';
import MultiDropdown from '@App/commonComponents/MultiDropdown';
import Text from '@App/commonComponents/Text';
import productsStore from '@App/stores/ProductsStore';
import { useLocalObservable } from 'mobx-react-lite';
import * as React from 'react';
import Pagination from '../Pagination';
import ProductCards from './ProductCards';
import ProductsTitle from './ProductsTitle';
import styles from './Products.module.scss';

const Products = () => {
  const [numberOfProducts, setNumberOfProducts] = React.useState(0);

  React.useEffect(() => {
    productsStore.fetchProductsData().then(() => {
      setNumberOfProducts(productsStore.products.length);
      console.log(numberOfProducts, 'TOTAL PPPPPPPP');
    });
  }, []);

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
          {numberOfProducts !== 0 ? (
            <Text view={'p-20'} color={'accent'} weight={'bold'}>
              {numberOfProducts}
            </Text>
          ) : null}
        </div>
        <ProductCards />
      </div>
    </div>
  );
};

export default Products;
