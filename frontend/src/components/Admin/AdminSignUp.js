import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button,Card, CardContent, Container, Typography } from '@mui/material';

const AdminSignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSignUp = async() => {
    try{
      const response = await axios.post('http://localhost:3000/api/admin/signup',{
        username,
        password
      }
      );
      const res = response.data;
      console.log('Signup successful!', res);
      setSuccess('Signup successful!');
      setError('');
    }
    catch (error) {
      console.error('There was an error!', error);
      setError('Signup failed.');
      setSuccess('');
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
        Admin Signup
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
      type = "password"
      value = {password}
      onChange= {(e) => setPassword(e.target.value) }
      controlled
      size = "small"
      margin = "normal" 
      />
      <Button variant = "contained" color = "primary" onClick = {handleSignUp}
      sx ={{
        marginTop : 2
      }}>
        Admin Signup
      </Button>
      </CardContent>
      </Card>
    </Container>

  );
};

export default AdminSignUp;
