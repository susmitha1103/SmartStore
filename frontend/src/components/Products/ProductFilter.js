import React, { useState, useEffect } from 'react';
import { Menu, MenuItem, IconButton, Typography, FormControl, InputLabel, Select } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import axios from 'axios';

const ProductFilter = ({ onFilter }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    price: '',
    isAvailable: '',
    category: '',
    subcategory: '',
    sortOrder: ''
  });

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const token = localStorage.getItem('jwtToken');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      try {
        const response = await axios.get('http://localhost:3000/api/products/category/categories', config);
        setCategories(response.data.categories);
        setSubcategories(response.data.subcategories);
        console.log("Fetched categories:", response.data.categories);
        console.log("Fetched subcategories:", response.data.subcategories);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prev) => {
      const newFilters = { ...prev, [name]: value };
      console.log('Updated Filters:', newFilters); // Log the updated filters
      return newFilters;
    });
  };

  const applyFilters = async () => {
    handleClose();
    try {
      console.log("Filters being applied", filters);
      const token = localStorage.getItem('jwtToken');
      const response = await axios.get('http://localhost:3000/api/products/filter/filter-products', {
        params: filters,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      onFilter(response.data);
      console.log("Applied filters result:", response.data);
    } catch (err) {
      console.error('Error applying filters', err);
    }
  };

  return (
    <div>
      <IconButton
        aria-controls="filter-menu"
        aria-haspopup="true"
        onClick={handleClick}
        color="inherit"
      >
        <FilterListIcon />
      </IconButton>
      <Menu
        id="filter-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>
          <Typography variant="body1">Price:</Typography>
          <select name="sortOrder" onChange={handleFilterChange} value={filters.sortOrder}>
            <option value="">Sort by Price</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </MenuItem>
        <MenuItem>
          <Typography variant="body1">Availability:</Typography>
          <select name="isAvailable" onChange={handleFilterChange} value={filters.isAvailable}>
            <option value="">Any</option>
            <option value="true">In Stock</option>
            <option value="false">Out of Stock</option>
          </select>
        </MenuItem>
        <MenuItem>
          <FormControl fullWidth>
            <Typography variant="body1">Category</Typography>
            <Select
              name="category"
              onChange={handleFilterChange}
              value={filters.category}
            >
              <option value="">Any</option>
              {categories.map((category) => (
                <MenuItem key={category._id} value={category._id}>{category.name}</MenuItem>

              ))}
            </Select>
          </FormControl>
        </MenuItem>
        <MenuItem>
          <FormControl fullWidth>
            <Typography variant='body1'>Subcategory</Typography>
            <Select
              name="subcategory"
              onChange={handleFilterChange}
              value={filters.subcategory}
            >
              <option value="">Any</option>
              {subcategories.map((subcategory) => (
                <MenuItem key={subcategory._id} value={subcategory._id}>{subcategory.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </MenuItem>
        <MenuItem onClick={applyFilters}>
          Apply Filters
        </MenuItem>
      </Menu>
    </div>
  );
};

export default ProductFilter;
