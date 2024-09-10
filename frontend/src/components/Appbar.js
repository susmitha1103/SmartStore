import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AddProduct from './Admin/AddProduct';

const Appbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeItem, setActiveItem] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    setIsLoggedIn(false);
    axios.defaults.headers.common['Authorization'] = null;
    navigate('/login');
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setActiveItem('Products');
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setActiveItem(null);
  };

  const handleMenuItemClick = (action) => {
    handleMenuClose();
    switch (action) {
      case 'AddProduct':
        navigate('/add-product');
        break;
      case 'ViewProducts':
        navigate('/view-products');
        break;
      default:
        break;
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1976D2' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          SmartStore
        </Typography>
        {isLoggedIn ? (
          <>
            <Typography
              variant="body1"
              sx={{
                marginRight: '20px',
                cursor: 'pointer',
                color: activeItem === 'Products' ? '#64B5F6' : '#E0E0E0',
                borderBottom: activeItem === 'Products' ? '2px solid #64B5F6' : 'none',
                transition: 'color 0.3s, border-bottom 0.3s',
              }}
              aria-controls="products-menu"
              aria-haspopup="true"
              onMouseEnter={handleMenuOpen}
            >
              Products
            </Typography>
            <Menu
              id="products-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              onMouseLeave={handleMenuClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
              PaperProps={{
                style: {
                  marginTop: '35px',
                },
              }}
            >
              <MenuItem
                onClick={() => handleMenuItemClick('AddProduct')}
                sx={{
                  backgroundColor: '#FFFFFF',
                  '&:hover': { backgroundColor: '#64B5F6', color: '#FFFFFF' },
                }}
              >
                Add Product
              </MenuItem>
              <MenuItem
                onClick={() => handleMenuItemClick('ViewProducts')}
                sx={{
                  backgroundColor: '#FFFFFF',
                  '&:hover': { backgroundColor: '#64B5F6', color: '#FFFFFF' },
                }}
              >
                View Products
              </MenuItem>
            </Menu>
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
