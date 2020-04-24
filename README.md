# zoohq
Simple State Engine for JavaScript Applications

## Example

```javascript
const stateItems = [];
let latestItemName;

zoohq.setStore({
  items: stateItems,
  useCoupon: true
});

zoohq.register('UPDATE_ITEMS', (store) => {
  stateItems = store.items;
});

zoohq.listen('UPDATE_ITEMS', (event) => {
  const { store } = event.detail;
  latestItemName = store.items.slice(-1)[0].name;
};

const addItemToBasket = (item) => {
  zoohq.dispatch('UPDATE_ITEMS', {
    items: [...zoohq.store.items, item]
  });
};

console.log(zoohq.store.items, storeItems, latestItemName);
// []
// []
// undefined

addItemToBasket({name: 'mlp_calendar', price: '19.99', currency: 'USD'});

console.log(zoohq.store.items, stateItems, latestItemName);
// [0: {name: 'mlp_calendar', price: '19.99', currency: 'USD'}]
// [0: {name: 'mlp_calendar', price: '19.99', currency: 'USD'}]
// undefined

console.log(zoohq.store.items, stateItems, latestItemName);
// [0: {name: 'mlp_calendar', price: '19.99', currency: 'USD'}]
// [0: {name: 'mlp_calendar', price: '19.99', currency: 'USD'}]
// undefined

addItemToBasket({name: 'fluttershy_pencil_case', price: '18.50', currency: 'USD'});

console.log(zoohq.store.items, stateItems, latestItemName);
// [0: {name: 'mlp_calendar', price: '19.99', currency: 'USD'}, 1: {name: 'fluttershy_pencil_case', price: '18.50', currency: 'USD'}]
// [0: {name: 'mlp_calendar', price: '19.99', currency: 'USD'}, 1: {name: 'fluttershy_pencil_case', price: '18.50', currency: 'USD'}]
// fluttershy_pencil_case
```
