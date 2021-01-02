import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logout } from '../../actions/auth'

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {

    const [darkMode, setDarkMode] = useState(false)

    useEffect(() => {
      const json = localStorage.getItem("devconnector_darkmode")
      const currentMode = JSON.parse(json)
      if (currentMode) {
        setDarkMode(true)
      } else {
        setDarkMode(false)
      }
    }, [])

    useEffect(() => {
        if (darkMode) {
          document.body.classList.add("dark")
        } else {
          document.body.classList.remove("dark")
        }
        const json = JSON.stringify(darkMode)
        localStorage.setItem("devconnector_darkmode", json)
      }, [darkMode])

    const authLinks = (
        <ul>
            <li>
                <Link to='/profiles'>Developers</Link>
            </li>
            <li>
                <Link to='/posts'>Posts</Link>
            </li>
            <li>
                <Link to='/dashboard'>
                    <i className="fas fa-user"></i>{' '}
                    <span className="hide-sm">Dashboard</span>
                </Link>
            </li>
            <li>
                <a href="#!" onClick={logout} >
                    <i className="fas fa-sign-out-alt"></i>{' '}
                    <span className="hide-sm">Logout</span>
                </a>
            </li>
            <li>
                <a href="#!" onClick={() => setDarkMode(!darkMode)} >
                    <i class="fas fa-adjust"></i>
                </a>
            </li>
        </ul> 
    )

    const guestLinks = (
        <ul>
            <li>
                <Link to='/profiles'>Developers</Link>
            </li>
            <li>
                <Link to='/register'>Register</Link>
            </li>
            <li>
                <Link to='/login'>Login</Link>
            </li>
        </ul> 
    )

    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/">
                    <i className="fas fa-code"></i> DevConnector
                </Link>
            </h1>
            { !loading && (<Fragment>{ isAuthenticated ? authLinks : guestLinks }</Fragment>)}
        </nav>

    )
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,      // ptor (emmett)
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logout })(Navbar)
