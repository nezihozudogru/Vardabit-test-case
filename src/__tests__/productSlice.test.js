import productReducer, { setProducts, setSearchQuery, setFilters } from '../store/slices/productSlice.js';

describe('Product Slice', () => {
  const initialState = {
    items: [],
    loading: false,
    currentPage: 1,
    error: null,
    searchQuery: '',
    filters: {
      brand: [],
      model: [],
      sortBy: 'oldToNew'
    }
  };

  test('should handle initial state', () => {
    expect(productReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  test('should handle setProducts', () => {
    const mockProducts = [{ id: 1, name: 'Test Product' }];

    const actual = productReducer(initialState, setProducts(mockProducts));
    expect(actual.items).toEqual(mockProducts);
  });

  test('should handle setSearchQuery', () => {
    const actual = productReducer(initialState, setSearchQuery('test'));
    expect(actual.searchQuery).toEqual('test');
  });

  test('should handle setFilters', () => {
    const newFilters = {
      brand: ['Apple'],
      sortBy: 'priceHighToLow'
    };

    const actual = productReducer(initialState, setFilters(newFilters));
    expect(actual.filters.brand).toEqual(['Apple']);
    expect(actual.filters.sortBy).toEqual('priceHighToLow');
  });
});
