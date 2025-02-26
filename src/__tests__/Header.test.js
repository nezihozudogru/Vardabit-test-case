import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import Header from '../components/Header/Header';
import cartReducer from '../store/slices/cartSlice';
import productReducer from '../store/slices/productSlice';

const renderWithProviders = (component) => {
  const store = configureStore({
    reducer: {
      cart: cartReducer,
      products: productReducer
    }
  });

  return {
    store,
    ...render(
      <Provider store={store}>
        <BrowserRouter>{component}</BrowserRouter>
      </Provider>
    )
  };
};

describe('Header Component', () => {
  test('renders search input', () => {
    renderWithProviders(<Header />);
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });

  test('displays cart icon', () => {
    renderWithProviders(<Header />);
    expect(screen.getByTestId('ShoppingCartIcon')).toBeInTheDocument();
  });
});
