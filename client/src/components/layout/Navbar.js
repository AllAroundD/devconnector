import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import Tooltip from "@material-ui/core/Tooltip";

const Navbar = ({ auth: { isAuthenticated, user }, logout }) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const json = localStorage.getItem("devconnector_darkmode");
    const currentMode = JSON.parse(json);
    if (currentMode) {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    const json = JSON.stringify(darkMode);
    localStorage.setItem("devconnector_darkmode", json);
  }, [darkMode]);

  const authLinks = (
    <ul>
      <li>
        <Link to="/profiles">Developers</Link>
      </li>
      <li>
        <Link to="/posts">Posts</Link>
      </li>
      <li>
        <Tooltip title="View Your Dashboard" arrow>
          <Link to="/dashboard">
            <i className="fas fa-user"></i>{" "}
            {/* <div className="navbar__avatar"> */}
            {/* <img className="round-img my-1" src={user.avatar} alt="avatar" style={{height: '20px', width: '20px' }}></img>{' '} */}
            <span className="hide-sm">Dashboard</span>
            {/* </div> */}
          </Link>
        </Tooltip>
      </li>
      <li>
        <Tooltip title="Logout" arrow>
          <a href="#!" onClick={logout}>
            <i className="fas fa-sign-out-alt"></i>{" "}
            <span className="hide-sm">Logout</span>
          </a>
        </Tooltip>
      </li>
      <li>
        <div className="dark__setting">
          <Tooltip title="Toggle Dark Mode" arrow>
            <a href="#!" onClick={() => setDarkMode(!darkMode)}>
              <i className="fas fa-adjust "></i>
            </a>
          </Tooltip>
        </div>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/profiles">Developers</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <a href="#!" onClick={() => setDarkMode(!darkMode)}>
          <i className="fas fa-adjust"></i>
        </a>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i> DevConnector
        </Link>
      </h1>
      {/* { !loading && (<Fragment>{ isAuthenticated ? authLinks : guestLinks }</Fragment>)} */}
      <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired, // ptor (emmett)
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
