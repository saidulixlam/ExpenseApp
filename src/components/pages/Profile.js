// import { Fragment } from "react";
import { Container, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const Profile = () => {
    return (
        <div className="my-5 pt-4">
            <h1 className="text-center">Welcome to your Profile ...!!!</h1>

            <section className="d-flex justify-content-between bg-light" style={{ fontStyle: 'italic', fontFamily: 'Arial, sans-serif' }}>
                <p className="ml-auto mx-1 mt-3 p-2 bg-light shadow rounded" >"Work hard and spread your knowledge like eternity"</p>
                <section className="mr-auto mx-1 my-3 p-2 bg-light shadow rounded" >
                    <small>Your Profile is <strong>64% </strong>
                        completed .
                        <span><Link to='/profile'>Complete now...</Link></span></small>
                </section>
            </section>
            <Container className='my-4 p-3 mx-5' fluid>
                <p>name:xyz</p>
                contact:xyz
            </Container>
            <Container className='my-5 p-4 mx-5' fluid>
            <h2 className="text-center" style={{  fontFamily: 'Arial, sans-serif' }}>Contact Details</h2>
                <Form className="p-4 mx-5">
                    <Form.Group controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter your name" />
                    </Form.Group>

                    <Form.Group controlId="formProfilePic">
                        <Form.Label>Update Profile Picture</Form.Label>
                        <Form.Control type="file" accept=".jpg, .jpeg, .png" />
                    </Form.Group>

                    <Button variant="success" type="submit">
                        Update
                    </Button>
                    <Button variant="danger" className="ml-2">
                        Cancel
                    </Button>
                </Form>
            </Container>

        </div>
    );
}

export default Profile;