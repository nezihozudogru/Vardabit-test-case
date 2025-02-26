import { Card, CardMedia, CardContent, Typography, Button, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/slices/cartSlice';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        '&:hover': {
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          transform: 'translateY(-2px)',
          transition: 'all 0.3s ease'
        }
      }}
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <Box sx={{ p: 2 }}>
        {' '}
        <CardMedia
          component="img"
          height="180"
          image={product.image}
          alt={product.name}
          sx={{
            objectFit: 'cover',
            borderRadius: 1
          }}
        />
      </Box>
      <CardContent
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          p: 2,
          pt: 0
        }}
      >
        <Box>
          <Typography
            variant="h6"
            component="div"
            sx={{
              color: '#3366FF',
              fontSize: '1rem',
              mb: 1,
              cursor: 'pointer',
              '&:hover': { color: '#2952CC' }
            }}
          >
            {product.name}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              fontWeight: 600,
              fontSize: '1.1rem',
              mb: 2
            }}
          >
            {product.price.toLocaleString()} ₺
          </Typography>
        </Box>

        <Button
          variant="contained"
          fullWidth
          onClick={(e) => {
            e.stopPropagation();
            handleAddToCart();
          }}
          sx={{
            bgcolor: '#3366FF',
            '&:hover': { bgcolor: '#2952CC' },
            textTransform: 'none'
          }}
        >
          ADD TO CART
        </Button>
      </CardContent>
    </Card>
  );
};
export default ProductCard;
