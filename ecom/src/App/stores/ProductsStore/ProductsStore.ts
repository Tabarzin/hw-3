// import { fetchProducts } from '@App/services/api';
// import { makeAutoObservable, runInAction } from 'mobx';

// class ProductStore {
//   products = [];

//   constructor() {
//     makeAutoObservable(this);
//   }

//   get numberOfProducts() {
//     return this.products.length;
//   }

//   async fetchProductsData() {
//     try {
//       const response = await fetchProducts();
//       const data = response.data;
//       console.log(data, 'DATA');

//       runInAction(() => {
//         this.products = data;
//       });
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     }
//   }
// }

// const productStore = new ProductStore();

// export default productStore;

// ProductsStore.js
import { fetchProducts } from '@App/services/api'; // Import your API functions
import { makeObservable, observable, action } from 'mobx';

class ProductsStore {
  @observable products = [];
  @observable offset = 0;
  @observable limit = 10; // Set the initial limit
  @observable isLoading = false;

  constructor() {
    makeObservable(this);
  }

  @action
  async fetchProductsData() {
    try {
      this.isLoading = true;
      const response = await fetchProducts(this.offset, this.limit); // Pass offset and limit as parameters to the API function
      this.products = response.data;
      this.isLoading = false;
    } catch (error) {
      console.error('Error fetching products:', error);
      this.isLoading = false;
    }
  }

  @action
  loadNextPage() {
    this.offset += this.limit;
    this.fetchProductsData(); // Fetch the next page of products
  }
}

const productsStore = new ProductsStore();

export default productsStore;
