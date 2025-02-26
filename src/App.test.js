import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import App from './App';
import productReducer from './store/slices/productSlice';
import cartReducer from './store/slices/cartSlice';

test('renders app without crashing', () => {
  const store = configureStore({
    reducer: {
      products: productReducer,
      cart: cartReducer
    }
  });

  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );

  expect(screen.getByText(/VardaBit Shop/i)).toBeInTheDocument();
});
