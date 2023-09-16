import React, { useContext } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import AuthContext from '../store/auth-context';


const NavBar = () => {
    const ctx=useContext(AuthContext);
    const isLoggedIn=ctx.isLoggedIn;
   
    const linkStyle = {
        color: 'white',
        textDecoration: 'none',
    };
      const history = useHistory();

      if (!isLoggedIn) {
        history.replace('/login');
      }
    function logoutHandler() {
        ctx.logout();
    }


    return (
        <React.Fragment>
            <Navbar bg="dark" variant="dark" expand="lg"
                className="fixed-top "
                style={{ zIndex: 1000 }} collapseOnSelect
            >
                <Container fluid>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mx-auto">
                            <Nav.Item className="mx-5">
                                <Nav.Link as={Link} to="/home" style={linkStyle}>
                                    Home
                                </Nav.Link>
                            </Nav.Item>
                             {isLoggedIn && ( 
                            <Nav.Item className="mx-5">
                                <Nav.Link as={Link} to="/products" style={linkStyle}>
                                    Products
                                </Nav.Link>
                            </Nav.Item>
                             )} 
                            <Nav.Item className="mx-5">
                                <Nav.Link as={Link} to="/about" style={linkStyle}>
                                    About
                                </Nav.Link>
                            </Nav.Item>
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
                                    Logout
                                </Nav.Link>
                            </Nav.Item>
                             )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {/* <div className="position-fixed top-0 end-0 m-1" style={{ zIndex: 1000 }}>
  <HeaderCart onClick={props.onClick} />
</div> */}
        </React.Fragment>
    );
};

export default NavBar;