import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import productReducer from './slices/productSlice';

const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  if (action.type?.startsWith('cart/')) {
    const cartState = store.getState().cart;
    localStorage.setItem('cart', JSON.stringify(cartState));
  }
  return result;
};

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware)
});
const loadCartState = () => {
  try {
    const serializedCart = localStorage.getItem('cart');
    if (serializedCart === null) return undefined;
    return JSON.parse(serializedCart);
  } catch (err) {
    return undefined;
  }
};
const cartState = loadCartState();
if (cartState) {
  store.dispatch({ type: 'cart/initialize', payload: cartState });
}
