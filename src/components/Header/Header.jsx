import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AppBar, Toolbar, Typography, InputBase, Box, IconButton, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import { setSearchQuery } from '../../store/slices/productSlice';

const Header = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);
    dispatch(setSearchQuery(value));
  };

  return (
    <AppBar position="sticky" sx={{ bgcolor: '#3366FF' }}>
      <Toolbar>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography
            variant="h4"
            noWrap
            component="div"
            sx={{
              fontSize: '28px',
              fontWeight: 700,
              letterSpacing: '0.5px'
            }}
          >
            Vardabit
          </Typography>
        </Link>
        <Paper
          component="form"
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: '280px',
            height: '40px',
            borderRadius: 1,
            bgcolor: 'rgba(255, 255, 255, 0.15)',
            '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.25)' },
            border: 'none',
            boxShadow: 'none',
            ml: '190px',
            mr: 2
          }}
        >
          <IconButton sx={{ p: '10px', color: 'white' }} aria-label="search">
            <SearchIcon />
          </IconButton>
          <InputBase
            sx={{
              ml: 1,
              flex: 1,
              color: 'white',
              '& input::placeholder': {
                color: 'rgba(255, 255, 255, 0.7)',
                opacity: 1
              }
            }}
            placeholder="Search..."
            value={searchValue}
            onChange={handleSearchChange}
            inputProps={{ 'aria-label': 'search' }}
          />
        </Paper>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton color="inherit" size="small">
          <ShoppingCartIcon />
        </IconButton>
        <Typography variant="subtitle1" sx={{ ml: 1, mr: 3 }}>
          {totalPrice > 0 && `${totalPrice.toLocaleString()}₺`}
        </Typography>
        <IconButton color="inherit" size="small">
          <PersonIcon />
        </IconButton>
        <Typography variant="subtitle1" sx={{ ml: 1 }}>
          Kerem
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
