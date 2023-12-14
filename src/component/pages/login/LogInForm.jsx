import React, { useState } from 'react';
import './logInForm.css';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { Link, useNavigate  } from 'react-router-dom'; // Import the useHistory hook from react-router-dom

import { TextField } from '@mui/material';
import { IP } from '../../data';

const LoginForm = ({setUser,setUserDetail}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
// error msg
const [open, setOpen] = React.useState(false);

const navigate = useNavigate (); 

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   // Add your login logic here
  //   console.log('Email:', email);
  //   console.log('Password:', password);
  //   // if(user == "admin"){setUser('admin')}
  //   // else if(user == "teacher"){setUser('teacher')}
  //   // else if(úser == 'student'){setUser('student')}
  //   // else{setUser(null)}

    
   


   


    

  // };

  const handleCreateInstitute = () => {
    navigate('/createInstitute');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(email == "admin@gmail.com" && password == '12345'){setUser('admin')}
    else{

      try {
        const response = await fetch(`http://${IP}:8000/api/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          // Login successful
          const userType = data.userType;
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
  

    }
   
  };
  

  return (
    <div className='main-login'>
         <form className="login-form" onSubmit={handleSubmit}>
      <h2>Login</h2>
      {/* <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      /> */}
      <TextField 
      className='input'
      id="email" 
      label="Email" 
      variant="standard" 
      type="email"
    //   placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
      />
      
      {/* <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      /> */}
       <TextField 
       className='input'
       fullWidth
      id="password" 
      label="Password" 
      variant="standard" 
      type="password"
    //   placeholder="Email"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
      required
      />
      <div className='btn-div'>
      <button type="submit">Log In</button>
      <button to="/createInstitute" onClick={()=>{handleCreateInstitute()}}>Create Institute</button>
      
      </div>

      { open &&
      
      <Alert severity="error">
      Invalid credentials — <strong>check it out!</strong>
      </Alert>
      }

    </form>

    {/*=========================== // error msg =========================== */}

    
    </div>
   
  );
};

export default LoginForm;
