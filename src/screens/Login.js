import React,{useState} from 'react'
import { Link , useNavigate} from 'react-router-dom';
export default function Login() {

  const [creds, setCreds] = useState({  email: '', password: '' });
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: creds.email,
        password: creds.password
      }),
    });
  
    const data = await response.json();
    console.log(data.err); // Log the `err` array to see the specific error messages
  
    if (!data.success) { 
      alert("enter valid creds");
    }
    if (data.success) {
      localStorage.setItem('userEmail' , creds.email);
      
      localStorage.setItem('authToken', data.authToken);
      console.log(localStorage.getItem('authToken'));
      navigate("/")
    }
  };
  

  const onChange = (e) => {
    setCreds({
      ...creds,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <div className='container'>
        <form onSubmit={handleSubmit}>
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
          
          <button type='submit' className='btn btn-primary'>
            Submit
          </button>
          <Link to='/createuser' className='m-3 btn btn-danger'>
            I m a new user
          </Link>
        </form>
      </div>
    </div>
  )
}
