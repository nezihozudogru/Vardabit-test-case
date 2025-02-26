import { createSlice } from '@reduxjs/toolkit';
const loadFiltersState = () => {
  try {
    const serializedFilters = localStorage.getItem('filters');
    return serializedFilters
      ? JSON.parse(serializedFilters)
      : {
          brand: [],
          model: [],
          sortBy: 'oldToNew'
        };
  } catch (err) {
    return {
      brand: [],
      model: [],
      sortBy: 'oldToNew'
    };
  }
};

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    loading: false,
    error: null,
    searchQuery: '',
    filters: loadFiltersState(),
    currentPage: 1
  },
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      localStorage.setItem('filters', JSON.stringify(state.filters));
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    resetFilters: (state) => {
      state.filters = {
        brand: [],
        model: [],
        sortBy: 'oldToNew'
      };
      localStorage.removeItem('filters');
    }
  }
});

export const { setProducts, setLoading, setError, setSearchQuery, setFilters, setCurrentPage, resetFilters } = productSlice.actions;

export default productSlice.reducer;
