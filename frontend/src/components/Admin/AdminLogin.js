import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { TextField, Button,Card, CardContent, Container, Typography } from '@mui/material';

const AdminLogin = () =>{

  const[username, setUsername] = useState('');
  const[password, setPassword] = useState('');
  const[error, setError] = useState('');

  const handleLogin = async() =>{
    try{
      const response = await axios.post('http://localhost:3000/api/admin/login',{
        username,
        password
      });
      const{token} = response.data;
      localStorage.setItem('jwtToken',token);
      console.log('Login Successful', token)
    }
    catch(error){
      console.error('There was an error!', error);
      setError('Invalid username or password.');
    }
  };
  return(
    <Container
    maxWidth="xs"
      sx={{
        
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '50vh'
      }}>
      <Card variant="outlined" alignItems = "center"
      sx={{
        display : 'flex',
        marginTop: 20,
        flexDirection : 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3,
        minHeight : '50vh',
        width : 'auto',
        maxWidth : 'auto'

      }}>
        <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          maxWidth: 400
        }}>
        <Typography variant = "h4" gutterBottom>
        Admin Login
      </Typography>
      <TextField
        label = "Username"
        value = {username}
        onChange={(e) => setUsername(e.target.value)}
        controlled
        size = "small"
        margin = "normal"
      />
      <TextField
      label = "Password"
      value = {password}
      onChange= {(e) => setPassword(e.target.value) }
      controlled
      size = "small"
      margin = "normal" 
      />
      <Button variant = "contained" color = "primary" onClick={handleLogin}
      sx ={{
        marginTop : 2
      }}>
        Admin Login
      </Button>
      </CardContent>
      </Card>
    </Container>

  );
};

export default AdminLogin;
