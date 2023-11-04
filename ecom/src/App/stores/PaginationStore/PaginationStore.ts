// import { makeAutoObservable } from 'mobx';

// class PaginationStore {
//   currentPage = 1;
//   itemsPerPage = 9;

//   constructor() {
//     makeAutoObservable(this);
//   }

//   setPage(page: number) {
//     this.currentPage = page;
//   }
// }

// const paginationStore = new PaginationStore();
// export default paginationStore;

import { observable, computed, action, makeAutoObservable } from 'mobx';
import productsStore from '../ProductsStore/ProductsStore';

class PaginationStore {
  @observable currentPage = 1; // Current page
  @observable itemsPerPage = 9; // Number of items to display per page

  @computed get totalProducts() {
    return productsStore.products.length;
  }

  @computed get totalPages() {
    return Math.ceil(this.totalProducts / this.itemsPerPage);
  }

  @action setCurrentPage = (page) => {
    this.currentPage = page;
    console.log('currentPage set to:', page);
  };
}

const paginationStore = new PaginationStore();

export default paginationStore;
