import React from 'react'
import { Link } from 'react-router-dom';

function Authnavbar(props) {
  return (
    <nav>
        <h3>Banka</h3>
        {props.type === 'signup' ? <div>If you already have an account <Link to='/login' className='link'>Log in</Link></div>: 
            props.type === 'login' ? <div>If you don't have an account <Link to='/' className='link'>Sign Up</Link></div>: null
        }
    </nav>
  )
}

export default Authnavbar;