import { fetchProducts } from '@App/services/api';
import { makeAutoObservable, runInAction } from 'mobx';

class ProductStore {
  products = [];

  constructor() {
    makeAutoObservable(this);
  }

  async fetchProductsData() {
    try {
      const response = await fetchProducts();
      const data = response.data;
      runInAction(() => {
        this.products = data;
      });
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }
}

const productStore = new ProductStore();

export default productStore;
