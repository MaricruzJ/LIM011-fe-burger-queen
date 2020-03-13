export interface Order {
  quantity: number;
  main: object;
  extra: object;
}

/* public arrayOrder = [
  { cantidad: 1, principal: {}, extras: ['queso', 'huevo'] },
  { cantidad: 1, principal: {}, extras: [] },
  { cantidad: 1, principal: {}, extras: ['queso'] },
  { cantidad: 1, principal: {}, extras: ['huevo'] }
]; */