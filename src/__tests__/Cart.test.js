import { render, screen, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Cart from '../components/Cart/Cart';
import cartReducer from '../store/slices/cartSlice';

const renderWithProviders = (component) => {
  const store = configureStore({
    reducer: {
      cart: cartReducer
    }
  });

  return {
    store,
    ...render(<Provider store={store}>{component}</Provider>)
  };
};

describe('Cart Component', () => {
  test('renders empty cart message when cart is empty', () => {
    renderWithProviders(<Cart />);
    expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
  });

  test('renders cart items correctly', async () => {
    const { store } = renderWithProviders(<Cart />);

    await act(async () => {
      store.dispatch({
        type: 'cart/addToCart',
        payload: { id: 1, name: 'Test Product', price: 100 }
      });
    });

    expect(screen.getByText('Test Product')).toBeInTheDocument();
  });
});
