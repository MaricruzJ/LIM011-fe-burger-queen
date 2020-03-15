/* export interface Order {
  quantity: number;
  main: object;
  extra: object;
  date: string;
} */

/* public arrayOrder = [
  { cantidad: 1, principal: {}, extras: ['queso', 'huevo'] },
  { cantidad: 1, principal: {}, extras: [] },
  { cantidad: 1, principal: {}, extras: ['queso'] },
  { cantidad: 1, principal: {}, extras: ['huevo'] }
]; */

export interface Order {
  id: string;
  quantity: number;
  product: string;
  extra: object;
  amount: number;
  date: string;
}
