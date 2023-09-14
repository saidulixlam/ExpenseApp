import { Container,Navbar,Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const UpdateProfile = () => {
    return (
        <div className='my-5'>
            <Navbar expand="lg" className="bg-body-tertiary my-5">
                <Container>
                    <Navbar.Brand href="#home">Wellcome to the expense tracker </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/updateprofile">Complete Your Profile</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default UpdateProfile;