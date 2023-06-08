import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Signup() {
  const [creds, setCreds] = useState({ name: '', email: '', password: '', geolocation: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name:creds.name , 
        email:creds.email,
         password:creds.password ,
          location:creds.geolocation
      }),
    });
    // Handle the response
    const data = await response.json()
    console.log(data)

    if(!data.success){ 
     alert("enter valid creds")
     }
   

  };

  const onChange = (e) => {
    setCreds({
      ...creds,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div className='container'>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='name' className='form-label'>
              Name
            </label>
            <input type='text' className='form-control' name='name' value={creds.name} onChange={onChange} />
          </div>
          <div className='mb-3'>
            <label htmlFor='email' className='form-label'>
              Email address
            </label>
            <input type='email' className='form-control' name='email' value={creds.email} onChange={onChange} />
            <div id='emailHelp' className='form-text'>
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className='mb-3'>
            <label htmlFor='password' className='form-label'>
              Password
            </label>
            <input type='password' className='form-control' name='password' value={creds.password} onChange={onChange} />
          </div>
          <div className='mb-3'>
            <label htmlFor='geolocation' className='form-label'>
              Geolocation
            </label>
            <input type='text' className='form-control' name='geolocation' value={creds.geolocation} onChange={onChange} />
          </div>
          <button type='submit' className='btn btn-primary'>
            Submit
          </button>
          <Link to='/Login' className='m-3 btn btn-danger'>
            Already a User
          </Link>
        </form>
      </div>
    </>
  );
}

