import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../../store/slices/productSlice';
import { Paper, Typography, Radio, RadioGroup, FormControlLabel, FormControl, Checkbox, TextField, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Filters = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.products.filters);
  const products = useSelector((state) => state.products.items);

  const [brandSearch, setBrandSearch] = useState('');
  const [modelSearch, setModelSearch] = useState('');

  const uniqueBrands = [...new Set(products.map((product) => product.brand))].filter((brand) => brand.toLowerCase().includes(brandSearch.toLowerCase()));
  const uniqueModels = [...new Set(products.map((product) => product.model))].filter((model) => model.toLowerCase().includes(modelSearch.toLowerCase()));

  const handleSortChange = (event) => {
    dispatch(setFilters({ ...filters, sortBy: event.target.value }));
  };

  const handleBrandChange = (brand) => {
    const newBrands = filters.brand.includes(brand) ? filters.brand.filter((b) => b !== brand) : [...filters.brand, brand];
    dispatch(setFilters({ ...filters, brand: newBrands }));
  };

  const handleModelChange = (model) => {
    const newModels = filters.model.includes(model) ? filters.model.filter((m) => m !== model) : [...filters.model, model];
    dispatch(setFilters({ ...filters, model: newModels }));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        width: '280px'
      }}
    >
      <Paper
        sx={{
          p: 2,
          borderRadius: 2,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}
      >
        <Typography variant="h6" gutterBottom>
          Sort By
        </Typography>
        <FormControl>
          <RadioGroup value={filters.sortBy} onChange={handleSortChange}>
            <FormControlLabel value="oldToNew" control={<Radio size="small" />} label="Old to new" sx={{ '& .MuiTypography-root': { fontSize: '0.9rem' } }} />
            <FormControlLabel value="newToOld" control={<Radio size="small" />} label="New to old" sx={{ '& .MuiTypography-root': { fontSize: '0.9rem' } }} />
            <FormControlLabel value="priceHighToLow" control={<Radio size="small" />} label="Price high to low" sx={{ '& .MuiTypography-root': { fontSize: '0.9rem' } }} />
            <FormControlLabel value="priceLowToHigh" control={<Radio size="small" />} label="Price low to High" sx={{ '& .MuiTypography-root': { fontSize: '0.9rem' } }} />
          </RadioGroup>
        </FormControl>
      </Paper>
      <Paper
        sx={{
          p: 2,
          borderRadius: 2,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}
      >
        <Typography variant="h6" gutterBottom>
          Brands
        </Typography>
        <TextField
          size="small"
          placeholder="Search brands"
          fullWidth
          sx={{
            mb: 2,
            '& .MuiOutlinedInput-root': {
              fontSize: '0.9rem'
            }
          }}
          value={brandSearch}
          onChange={(e) => setBrandSearch(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary', fontSize: '1.2rem' }} />
          }}
        />
        <Box
          sx={{
            maxHeight: '150px',
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
              width: '4px'
            },
            '&::-webkit-scrollbar-track': {
              background: '#f1f1f1',
              borderRadius: '4px'
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#888',
              borderRadius: '4px',
              '&:hover': {
                background: '#666'
              }
            }
          }}
        >
          {uniqueBrands.map((brand) => (
            <FormControlLabel
              key={brand}
              control={<Checkbox size="small" checked={filters.brand.includes(brand)} onChange={() => handleBrandChange(brand)} />}
              label={brand}
              sx={{
                display: 'flex',
                py: 0.5,
                pl: 1,
                '& .MuiTypography-root': {
                  fontSize: '0.9rem',
                  flexGrow: 1
                },
                '&:hover': {
                  bgcolor: 'rgba(0, 0, 0, 0.04)'
                }
              }}
            />
          ))}
        </Box>
      </Paper>
      <Paper
        sx={{
          p: 2,
          borderRadius: 2,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}
      >
        <Typography variant="h6" gutterBottom>
          Model
        </Typography>
        <TextField
          size="small"
          placeholder="Search models"
          fullWidth
          sx={{
            mb: 2,
            '& .MuiOutlinedInput-root': {
              fontSize: '0.9rem'
            }
          }}
          value={modelSearch}
          onChange={(e) => setModelSearch(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary', fontSize: '1.2rem' }} />
          }}
        />
        <Box
          sx={{
            maxHeight: '150px',
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
              width: '4px'
            },
            '&::-webkit-scrollbar-track': {
              background: '#f1f1f1',
              borderRadius: '4px'
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#888',
              borderRadius: '4px',
              '&:hover': {
                background: '#666'
              }
            }
          }}
        >
          {uniqueModels.map((model) => (
            <FormControlLabel
              key={model}
              control={<Checkbox size="small" checked={filters.model.includes(model)} onChange={() => handleModelChange(model)} />}
              label={model}
              sx={{
                display: 'flex',
                py: 0.5,
                pl: 1,
                '& .MuiTypography-root': {
                  fontSize: '0.9rem',
                  flexGrow: 1
                },
                '&:hover': {
                  bgcolor: 'rgba(0, 0, 0, 0.04)'
                }
              }}
            />
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

export default Filters;
