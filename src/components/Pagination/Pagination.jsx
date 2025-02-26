import { Box, IconButton, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
      <IconButton onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        <ChevronLeftIcon />
      </IconButton>

      {[...Array(totalPages)].map((_, index) => (
        <IconButton
          key={index + 1}
          onClick={() => onPageChange(index + 1)}
          sx={{
            bgcolor: currentPage === index + 1 ? '#3366FF' : 'transparent',
            color: currentPage === index + 1 ? 'white' : 'inherit',
            '&:hover': {
              bgcolor: currentPage === index + 1 ? '#2952CC' : 'rgba(0, 0, 0, 0.04)'
            }
          }}
        >
          <Typography>{index + 1}</Typography>
        </IconButton>
      ))}

      <IconButton onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        <ChevronRightIcon />
      </IconButton>
    </Box>
  );
};

export default Pagination;
