import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import ProductList from '../pages/ProductList/ProductList';
import productReducer from '../store/slices/productSlice';
import cartReducer from '../store/slices/cartSlice';

const renderWithProviders = (component) => {
  const store = configureStore({
    reducer: {
      products: productReducer,
      cart: cartReducer
    }
  });

  return render(
    <Provider store={store}>
      <BrowserRouter>{component}</BrowserRouter>
    </Provider>
  );
};

describe('ProductList Component', () => {
  test('renders products correctly', () => {
    const mockProducts = [
      { id: 1, name: 'iPhone 12', brand: 'Apple', price: 1000 },
      { id: 2, name: 'Galaxy S21', brand: 'Samsung', price: 900 }
    ];

    renderWithProviders(<ProductList />);
    // eslint-disable-next-line no-undef
    store.dispatch({ type: 'products/setProducts', payload: mockProducts });

    expect(screen.getByText('iPhone 12')).toBeInTheDocument();
  });
});
