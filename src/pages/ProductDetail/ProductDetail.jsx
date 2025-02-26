import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Box, Container, Grid, Typography, Button, Paper, Breadcrumbs, Link } from '@mui/material';
import { addToCart } from '../../store/slices/cartSlice';
import { getProductById } from '../../services/api';
import Cart from '../../components/Cart/Cart';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
    }
  };

  if (loading) {
    return <Box sx={{ p: 4 }}>Loading...</Box>;
  }

  if (!product) {
    return <Box sx={{ p: 4 }}>Product not found</Box>;
  }

  return (
    <Box sx={{ display: 'flex', bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      <Container maxWidth="lg" sx={{ py: 4, flex: 1 }}>
        <Breadcrumbs sx={{ mb: 4 }}>
          <Link href="/" underline="hover" color="inherit">
            Products
          </Link>
          <Typography color="text.primary">{product.name}</Typography>
        </Breadcrumbs>

        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <img src={product.image} alt={product.name} style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box>
                    <Typography variant="h4" gutterBottom>
                      {product.name}
                    </Typography>

                    <Typography variant="h5" color="primary" gutterBottom>
                      {product.price.toLocaleString()} ₺
                    </Typography>

                    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                      {product.description}
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mb: 2
                      }}
                    >
                      <Box>
                        <Typography variant="subtitle1">Brand: {product.brand}</Typography>
                        <Typography variant="subtitle1">Model: {product.model}</Typography>
                      </Box>

                      <Button
                        variant="contained"
                        onClick={handleAddToCart}
                        sx={{
                          bgcolor: '#3366FF',
                          '&:hover': { bgcolor: '#2952CC' },
                          height: '40px'
                        }}
                      >
                        ADD TO CART
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ position: { md: 'sticky' }, top: '24px' }}>
              <Cart />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProductDetail;
