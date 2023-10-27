import { makeAutoObservable } from 'mobx';

class PaginationStore {
  currentPage = 1;
  itemsPerPage = 9;

  constructor() {
    makeAutoObservable(this);
  }

  setPage(page: number) {
    this.currentPage = page;
  }
}

const paginationStore = new PaginationStore();
export default paginationStore;
