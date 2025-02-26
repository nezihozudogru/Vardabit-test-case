import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Filters from '../components/Filters/Filters';
import productReducer from '../store/slices/productSlice';

const renderWithProviders = (component) => {
  const store = configureStore({
    reducer: {
      products: productReducer
    }
  });

  return {
    store,
    ...render(<Provider store={store}>{component}</Provider>)
  };
};

describe('Filters Component', () => {
  test('renders sort options', () => {
    renderWithProviders(<Filters />);
    expect(screen.getByText('Sort By')).toBeInTheDocument();
    expect(screen.getByText('Old to new')).toBeInTheDocument();
  });

  test('updates sort option when selected', () => {
    const { store } = renderWithProviders(<Filters />);
    fireEvent.click(screen.getByText('New to old'));

    const state = store.getState();
    expect(state.products.filters.sortBy).toBe('newToOld');
  });
});
