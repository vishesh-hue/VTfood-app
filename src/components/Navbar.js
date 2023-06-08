import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";

import Badge from 'react-bootstrap/Badge'
import Modal from '../Modal';
import Cartss from '../screens/Cartss';
import { UseCart } from './reducers/context';
export default function Navbar(props) {

  const [cartView , setCartView] = useState(false)
    const navigate = useNavigate();
    const data = UseCart();
    const handleLogout = () => {
        localStorage.removeItem('authToken')

        navigate("/login")
    }

    const loadCart = () => {
        setCartView(true)
    }


    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-success position-sticky"
                style={{ boxShadow: "0px 10px 20px black", filter: 'blur(20)', position: "fixed", zIndex: "10", width: "100%" }}>
                <div className="container-fluid">
                    <Link className="navbar-brand fs-1 fst-italic" to="/">VTFood</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link fs-5 mx-3 active" aria-current="page" to="/">Home</Link>  {/* index.css - nav-link color white */}
                            </li>
                            {(localStorage.getItem('authToken'))?
                            <li className='nav-item'><Link className='nav-link fs-5 ' aria-current='page' to='/myOrder'>My Orders</Link>
                                    </li>
                            : " "

                        }
                           
                            
                        </ul>
                        {(!localStorage.getItem)?
                        <div className='d-flex'>
                        <Link className="btn bg-white text-success mx-1"  to="/login">login</Link>  {/* index.css - nav-link color white */}
                           
                           <Link className="btn bg-white text-success mx-1"  to="/createuser">singup</Link>  {/* index.css - nav-link color white */}
                     
                        </div>
                        :<div className='d-flex'>
                            <div className='btn bg-white text-success mx-2' onClick={()=>{setCartView(true)}}>My Cart
                            {" "}<Badge pill bg='danger'>{data.length}</Badge>
                            </div>
                            {cartView? <Modal onClose={()=>{setCartView(false)}}><Cartss></Cartss></Modal>:null}
                            <div className='btn bg-white text-danger mx-2' onClick={handleLogout}>Logout
                            </div>


                        </div>
                        
                    
                    
                    }
                        
                               

                    </div>
                </div>
            </nav>
        </div>
    )
}