import { useEffect, useState } from 'react';
import { Box, Container, Grid, Pagination } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../../services/api';
import { setProducts } from '../../store/slices/productSlice';
import Filters from '../../components/Filters/Filters';
import ProductCard from '../../components/ProductCard/ProductCard';
import Cart from '../../components/Cart/Cart';

const PRODUCTS_PER_PAGE = 12;

const ProductList = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const products = useSelector((state) => state.products.items);
  const filters = useSelector((state) => state.products.filters);
  const searchQuery = useSelector((state) => state.products.searchQuery);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await getProducts();
      dispatch(setProducts(data));
    };
    loadProducts();
  }, [dispatch]);

  const filterProducts = () => {
    return products
      .filter((product) => {
        const matchesSearch = searchQuery ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) : true;
        const matchesBrand = filters.brand.length ? filters.brand.includes(product.brand) : true;
        const matchesModel = filters.model.length ? filters.model.includes(product.model) : true;

        return matchesSearch && matchesBrand && matchesModel;
      })
      .sort((a, b) => {
        switch (filters.sortBy) {
          case 'newToOld':
            return b.id - a.id;
          case 'priceHighToLow':
            return b.price - a.price;
          case 'priceLowToHigh':
            return a.price - b.price;
          default:
            return a.id - b.id;
        }
      });
  };

  const filteredProducts = filterProducts();
  const pageCount = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const displayedProducts = filteredProducts.slice((page - 1) * PRODUCTS_PER_PAGE, page * PRODUCTS_PER_PAGE);

  const handlePageChange = (_, newPage) => {
    setPage(newPage);
    window.scrollTo(0, 0);
  };

  return (
    <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', py: 3 }}>
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} md={2.5}>
            <Box sx={{ position: 'sticky', top: 24 }}>
              <Filters />
            </Box>
          </Grid>

          <Grid item xs={12} md={7}>
            <Grid container spacing={2.5}>
              {displayedProducts.map((product) => (
                <Grid item xs={12} sm={6} md={3} key={product.id}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>

            {pageCount > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Pagination count={pageCount} page={page} onChange={handlePageChange} color="primary" />
              </Box>
            )}
          </Grid>

          <Grid item xs={12} md={2.5}>
            <Box sx={{ position: { md: 'sticky' }, top: 24 }}>
              <Cart />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProductList;
