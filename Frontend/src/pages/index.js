import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
    return (
        <div>
            Welcome to Solar Energy Learning Application <br/>
            Register as a Student <br />
            <Link to="/registration">
                <button>Register</button>
            </Link> 
        </div>
    )
}

export default HomePage