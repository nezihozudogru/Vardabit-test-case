import cartReducer, { addToCart, removeFromCart, updateQuantity, clearCart } from '../store/slices/cartSlice.js';

describe('Cart Slice', () => {
  const initialState = {
    items: [],
    totalPrice: 0
  };

  test('should handle initial state', () => {
    expect(cartReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  test('should handle addToCart', () => {
    const mockProduct = {
      id: 1,
      name: 'Test Product',
      price: 100
    };

    const actual = cartReducer(initialState, addToCart(mockProduct));
    expect(actual.items).toHaveLength(1);
    expect(actual.items[0].quantity).toBe(1);
    expect(actual.totalPrice).toBe(100);
  });

  test('should handle removeFromCart', () => {
    const stateWithItem = {
      items: [{ id: 1, name: 'Test Product', price: 100, quantity: 1 }],
      totalPrice: 100
    };

    const actual = cartReducer(stateWithItem, removeFromCart({ id: 1 }));
    expect(actual.items).toHaveLength(0);
    expect(actual.totalPrice).toBe(0);
  });

  test('should handle updateQuantity', () => {
    const stateWithItem = {
      items: [{ id: 1, name: 'Test Product', price: 100, quantity: 1 }],
      totalPrice: 100
    };

    const actual = cartReducer(stateWithItem, updateQuantity({ id: 1, quantity: 2 }));
    expect(actual.items[0].quantity).toBe(2);
    expect(actual.totalPrice).toBe(200);
  });

  test('should handle clearCart', () => {
    const stateWithItems = {
      items: [{ id: 1, name: 'Test Product', price: 100, quantity: 1 }],
      totalPrice: 100
    };

    const actual = cartReducer(stateWithItems, clearCart());
    expect(actual).toEqual(initialState);
  });
});
