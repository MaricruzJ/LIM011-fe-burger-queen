import { of } from 'rxjs';

export class MockFirestoreService {
  getProducts() {
      return of([]);
  }

  // addTask() {}
}