import { TestBed } from '@angular/core/testing';

import { FirestoreService } from './firestore.service';
import { AngularFirestoreMock } from 'src/app/__mocks__/angular-firestore-mock';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';

const fixtureData = [
  {
    id: '123c', data: {
      category: 'classic',
      image: "https://firebasestorage.googleapis.com/v0/b/burgerqueen-ee96d.appspot.com/o/simple-vegan.png?alt=media&token=fd963695-7468-4c0b-86f4-78c188eb1e10",
      name: "Hamburguesa simple vegetariana",
      popup: true,
      price: 10
    }
  },
  {
    id: '123d', data: {
      category: "drinks",
      image: "https://firebasestorage.googleapis.com/v0/b/burgerqueen-ee96d.appspot.com/o/jugo.png?alt=media&token=ecc56c98-6a3c-4cb0-a8f0-278380b22c4a",
      name: "Jugo de frutas natural",
      popup: false,
      price: 7,
    }
  },
  {
    id: '123p', data: {
      category: "piqueos",
      image: "https://firebasestorage.googleapis.com/v0/b/burgerqueen-ee96d.appspot.com/o/papas-fritas.png?alt=media&token=fcebdc4a-43a3-495d-b137-def003c13a8c",
      name: "Papas fritas",
      popup: false,
      price: 5,
    }

  },
  {
    id: '123e', data: {
      category: "huevo",
      image: "https://firebasestorage.googleapis.com/v0/b/burgerqueen-ee96d.appspot.com/o/huevo.png?alt=media&token=2bd203e1-b8ec-49ee-bcd0-2673a6904535",
      name: "Huevo",
      popup: false,
      price: 1,
    }

  }
]

fdescribe('FirestoreService', () => {
  let firestoreService: FirestoreService;
  // let angularFirestore: AngularFirestoreMock;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: AngularFirestore, useValue: new AngularFirestoreMock(fixtureData) }],
      imports: [
        // AngularFireModule.initializeApp(environment),
        AngularFirestoreModule
      ]
    });
  });

  beforeEach(() => {
    firestoreService = TestBed.get(FirestoreService);
  });


  it('debería crearse el servicio', () => {
    expect(firestoreService).toBeTruthy();
  });

  it('getProducts debería de retornar un observable', () => {
    const result = [
      {
        id: '123c',
        data: {
          category: 'classic',
          image: "https://firebasestorage.googleapis.com/v0/b/burgerqueen-ee96d.appspot.com/o/simple-vegan.png?alt=media&token=fd963695-7468-4c0b-86f4-78c188eb1e10",
          name: "Hamburguesa simple vegetariana",
          popup: true,
          price: 10
        }
      },
      {
        id: '123d', data: {
          category: "drinks",
          image: "https://firebasestorage.googleapis.com/v0/b/burgerqueen-ee96d.appspot.com/o/jugo.png?alt=media&token=ecc56c98-6a3c-4cb0-a8f0-278380b22c4a",
          name: "Jugo de frutas natural",
          popup: false,
          price: 7,
        }
      },
      {
        id: '123p', data: {
          category: "piqueos",
          image: "https://firebasestorage.googleapis.com/v0/b/burgerqueen-ee96d.appspot.com/o/papas-fritas.png?alt=media&token=fcebdc4a-43a3-495d-b137-def003c13a8c",
          name: "Papas fritas",
          popup: false,
          price: 5,
        }

      },
      {
        id: '123e', data: {
          category: "huevo",
          image: "https://firebasestorage.googleapis.com/v0/b/burgerqueen-ee96d.appspot.com/o/huevo.png?alt=media&token=2bd203e1-b8ec-49ee-bcd0-2673a6904535",
          name: "Huevo",
          popup: false,
          price: 1,
        }
      }
    ]

    firestoreService.getProducts().subscribe((response) => {
      expect(response).toEqual(result);
    })
  })
});
