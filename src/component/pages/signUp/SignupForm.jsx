import React, { useState } from 'react';
import './signupForm.css';
import { Alert, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import { IP } from '../../data';
const SignupForm = ({setUser,setUserDetail}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = React.useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Add your signup logic here
    console.log('Email:', email);
    console.log('name:', name);
    console.log('Password:', password);

    try {
      const response = await fetch(`http://${IP}:8000/api/institute`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          instituteName: name,
          instituteEmail: email,
          institutePassword: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Login successful
        console.log(data);
        const userType = 'institute';
        const userDetail = data.data;

        setUser(userType);
        setUserDetail(userDetail);
        console.log('user detail in',userDetail)
      } else {
        // Login failed
        console.error('Error:');
        setUser(null);
        setOpen((prevOpen) => true);
      }
    } catch (error) {
      console.error('Error:', error);
      setUser(null);
      setOpen((prevOpen) => true);
    }

  };

  return (
    <div className='main-signup'>
    <form className="signup-form" onSubmit={handleSubmit}>
      <h2>Signup</h2>
      <TextField
       className='input'
       id="name" 
       label="Name" 
       variant="standard" 
       type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <TextField
       className='input'
       id="email" 
       label="Email" 
       variant="standard" 
       type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <TextField
        className='input'
        fullWidth
       id="password" 
       label="Password" 
       variant="standard" 
       type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <div className='btn-div'>
      <button type="submit">Create</button>
      <Link to="/"><button >Login</button></Link>
      {/* <button to="/login">Login</button> */}
      </div>
      
      { open &&
      
      <Alert severity="error">
      Invalid — <strong>check it out!</strong>
      </Alert>
      }

    </form>
    </div>
  );
};

export default SignupForm;
