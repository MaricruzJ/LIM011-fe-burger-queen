/* public arrayOrder = [
  { cantidad: 1, principal: {}, extras: ['queso', 'huevo'] },
  { cantidad: 1, principal: {}, extras: [] },
  { cantidad: 1, principal: {}, extras: ['queso'] },
  { cantidad: 1, principal: {}, extras: ['huevo'] }
]; */

export interface OrderItem {
  id: string;
  quantity: number;
  product: object;
  extra: object;
  amount: number;
}
