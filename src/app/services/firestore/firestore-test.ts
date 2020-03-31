
/** return fresh array of test heroes */
export function getTestFirestoreProducts(): any[] {
  return [
    {
      category: 'classic',
      image: "https://firebasestorage.googleapis.com/v0/b/burgerqueen-ee96d.appspot.com/o/simple-vegan.png?alt=media&token=fd963695-7468-4c0b-86f4-78c188eb1e10",
      name: "Hamburguesa simple vegetariana",
      popup: true,
      price: 10
    },
    {
      category: "drinks",
      image: "https://firebasestorage.googleapis.com/v0/b/burgerqueen-ee96d.appspot.com/o/jugo.png?alt=media&token=ecc56c98-6a3c-4cb0-a8f0-278380b22c4a",
      name: "Jugo de frutas natural",
      popup: false,
      price: 7,
    },
    {
      category: "piqueos",
      image: "https://firebasestorage.googleapis.com/v0/b/burgerqueen-ee96d.appspot.com/o/papas-fritas.png?alt=media&token=fcebdc4a-43a3-495d-b137-def003c13a8c",
      name: "Papas fritas",
      popup: false,
      price: 5,
    }
  ];
}