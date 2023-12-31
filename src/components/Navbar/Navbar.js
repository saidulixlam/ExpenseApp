import React, { useRef } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store/authSlice';
import { toggleDarkMode } from '../store/darkModeSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon,faHome,faWallet,faUser,faSignOut,faBars } from '@fortawesome/free-solid-svg-icons';

const NavBar = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth);
  const isLoggedIn = isAuth.isLoggedIn;
  const history = useHistory();
  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
  };
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);
  const navbarRef = useRef(null); // Create a ref for the Navbar component

  // Event listener to handle clicks anywhere on the document
  const handleDocumentClick = (e) => {
    // Check if the click target is outside of the Navbar
    if (navbarRef.current && !navbarRef.current.contains(e.target)) {
      // Collapse the Navbar if it's expanded
      const navbarToggle = navbarRef.current.querySelector('.navbar-toggler');
      if (navbarToggle && !navbarToggle.classList.contains('collapsed')) {
        navbarToggle.click(); // Simulate a click on the Navbar toggle button
      }
    }
  };

  // Add the event listener when the component mounts
  // Remove it when the component unmounts to prevent memory leaks
  React.useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  function logoutHandler() {
    dispatch(authActions.logout());
    localStorage.removeItem('imageUrl')
    history.replace('/login');
  }

  const toggleTheme = () => {
    // Dispatch the toggleDarkMode action to toggle dark mode
    dispatch(toggleDarkMode());
  };

  return (
    <React.Fragment>
      {isLoggedIn && <Navbar
        bg="primary"
        variant="dark"
        expand="md"
        className="fixed-top"
        style={{ zIndex: 1000 }}
        collapseOnSelect
        ref={navbarRef} // Attach the ref to the Navbar component
      >
        <Container fluid>
          <Navbar.Toggle aria-controls="basic-navbar-nav" size="sm" >
          <FontAwesomeIcon icon={faBars} />
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <Nav.Item className="mx-5">
                <Nav.Link as={Link} to="/home" style={linkStyle}>
                <FontAwesomeIcon icon={faHome} />
                </Nav.Link>
              </Nav.Item>

              {isLoggedIn && (<Nav.Item className="mx-5">
                <Nav.Link as={Link} to="/expenses" style={linkStyle}>
                <FontAwesomeIcon icon={faWallet} />
                </Nav.Link>
              </Nav.Item>)}
              {isLoggedIn && (<Nav.Item className="mx-5">
                <Nav.Link as={Link} to="/profile" style={linkStyle}>
                <FontAwesomeIcon icon={faUser} />
                </Nav.Link>
              </Nav.Item>)}
              {!isLoggedIn && (
                <Nav.Item className="mx-5">
                  <Nav.Link as={Link} to="/login" style={linkStyle}>
                    Login
                  </Nav.Link>
                </Nav.Item>
              )}
              {isLoggedIn && (
                <Nav.Item className="mx-5">
                  <Nav.Link onClick={logoutHandler} style={linkStyle}>
                  <FontAwesomeIcon icon={faSignOut} />
                  </Nav.Link>
                </Nav.Item>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>}
      {isLoggedIn && <div className="position-fixed top-0 end-0 m-1" style={{ zIndex: 1000 }}>
        
        <Button
                    variant="light"
                    onClick={toggleTheme}
                    className="mt-2 p-1 mx-2 rounded btn-sm text-danger"
                >
                    {isDarkMode ? <FontAwesomeIcon  icon={faSun} size="lg"/>:<FontAwesomeIcon icon={faMoon} size="lg"/>} 
                </Button>
        
      </div>}
    </React.Fragment>
  );
};

export default NavBar;