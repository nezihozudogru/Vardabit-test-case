import { Box, Typography, IconButton, Button, Paper, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity, clearCart } from '../../store/slices/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  const handleQuantityChange = (id, currentQuantity, change) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity >= 0) {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <Paper sx={{ p: 3, borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Cart</Typography>
        <IconButton onClick={handleClearCart} size="small" sx={{ color: '#FF0000' }}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Box>

      <Box sx={{ mt: 2 }}>
        {Object.values(cartItems).map((item) => (
          <Box
            key={item.id}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {item.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.price.toLocaleString()}₺
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                bgcolor: '#3366FF',
                borderRadius: 1,
                color: 'white'
              }}
            >
              <IconButton size="small" onClick={() => handleQuantityChange(item.id, item.quantity, -1)} sx={{ color: 'white' }}>
                <RemoveIcon fontSize="small" />
              </IconButton>
              <Typography sx={{ mx: 2, fontWeight: 500 }}>{item.quantity}</Typography>
              <IconButton size="small" onClick={() => handleQuantityChange(item.id, item.quantity, 1)} sx={{ color: 'white' }}>
                <AddIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        ))}

        {Object.keys(cartItems).length === 0 && (
          <Typography color="text.secondary" align="center" sx={{ my: 2 }}>
            Your cart is empty
          </Typography>
        )}
      </Box>

      {Object.keys(cartItems).length > 0 && (
        <>
          <Divider sx={{ my: 3 }} />

          <Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mb: 2,
                alignItems: 'center'
              }}
            >
              <Typography variant="h6">Total Price:</Typography>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {totalPrice.toLocaleString()}₺
              </Typography>
            </Box>

            <Button
              variant="contained"
              fullWidth
              sx={{
                bgcolor: '#3366FF',
                '&:hover': { bgcolor: '#2952CC' },
                py: 1.5,
                textTransform: 'none',
                fontSize: '1rem'
              }}
            >
              Checkout
            </Button>
          </Box>
        </>
      )}
    </Paper>
  );
};

export default Cart;
