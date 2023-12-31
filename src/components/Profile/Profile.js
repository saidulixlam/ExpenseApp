import React, { useRef, useState, useEffect } from 'react';
import { Container, Form, Button, Card, Image, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Profile = () => {
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const phone = '8822266900';

    const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);

    const nameRef = useRef();
    const imageRef = useRef();

    const token = localStorage.getItem('token');

    const handleUpdateButtonClick = async (e) => {
        e.preventDefault();

        if (!imageRef.current.files || imageRef.current.files.length === 0) {
            alert('No image selected for update.');
            return;
        }

        const imageUrl = URL.createObjectURL(imageRef.current.files[0]);
        const updatedName = nameRef.current.value;

        try {
            const response = await fetch(
                'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAgGnMLqkFKJf5KduGtLESSQoaaEzpd4sM',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        idToken: token,
                        displayName: updatedName,
                        photoUrl: imageUrl,
                        returnSecureToken: true,
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (!response.ok) {
                const data = await response.json();
                let errorMessage = 'Authentication Failed';

                if (data && data.error && data.error.message) {
                    errorMessage = data.error.message;
                }

                throw new Error(errorMessage);
            }

            const data = await response.json();
            setImage(data.photoUrl);
            localStorage.setItem('image',image);
            window.alert('Profile updated successfully.');
        } catch (err) {
            alert(err.message);
        } finally {
            setName(updatedName);
        }
    };

    useEffect(() => {
        fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAgGnMLqkFKJf5KduGtLESSQoaaEzpd4sM',
            {
                method: 'POST',
                body: JSON.stringify({
                    idToken: token,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Failed to fetch user data');
            })
            .then((data) => {
                const user = data.users[0];
                if (user) {
                    const image = user.photoUrl;
                    setName(user.displayName);
                    setEmail(user.email);
                    nameRef.current.value = user.displayName;
                    setImage(image);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [token]);

    const verifyEmailHandler = async () => {
        try {
            const response = await fetch(
                'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAgGnMLqkFKJf5KduGtLESSQoaaEzpd4sM',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        requestType: 'VERIFY_EMAIL',
                        idToken: token,
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Firebase-Locale': 'en',
                    },
                }
            );
            if (!response.ok) {
                throw new Error('request failed');
            }
            const data = await response.json();
            alert('Code sent on email, kindly check');
            return data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    return (
        <div className={`my-5 pt-4 vh-100 ${isDarkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
            <h1 className="text-center">Welcome to your Profile ...!!!</h1>

            <section className={`d-flex justify-content-between ${isDarkMode ? 'bg-dark text-light border' : 'bg-light text-dark'} shadow rounded`} style={{ fontStyle: 'italic', fontFamily: 'Arial, sans-serif' }}>
                <p className="ml-auto mx-1 mt-3 p-2" >"Work hard and spread your knowledge like eternity"</p>
                <section className={`mr-auto mx-1 my-3 p-2`} >
                    <small>Your Profile is <strong>64% </strong>completed. <span><Link to='/profile'>Complete now...</Link></span></small>
                </section>
            </section>

            <Container className={`mt-4 p-4 vh-100 ${isDarkMode ? 'bg-dark' : 'bg-light'} rounded`} fluid>
                <Row className='justify-content-center'>
                    <Col sm={12} md={6} lg={4} className='mb-3'>
                        <div className='text-center'>
                            <Image className={`bg-light shadow rounded-circle p-2`} style={{ height: '14rem', width: '14rem' }} src={image} roundedCircle />
                        </div>
                    </Col>
                    <Col sm={12} md={6} lg={8}>
                        <Card className={`rounded ${isDarkMode ? 'bg-dark border' : 'bg-light'}`} style={{ border: 'none' }}>
                            <h4 className={`text-center my-3 p-2 ${isDarkMode ? 'bg-dark text-light' : 'bg-light text-dark'} rounded`}>User Details</h4>
                            <div className={`text-center my-1 mx-3 d-flex ${isDarkMode ? 'text-light' : 'text-dark'}`}>
                                <strong>
                                    <p>Name :</p>
                                </strong>
                                <p>&nbsp;{name}</p>
                            </div>
                            <div className={`text-center my-1 mx-3 d-flex ${isDarkMode ? 'text-light' : 'text-dark'}`}>
                                <strong>Phone Number :</strong>
                                <p>&nbsp;{phone}</p>
                            </div>
                            <div className={`text-center my-1 mx-3 d-flex ${isDarkMode ? 'text-light' : 'text-dark'}`}>
                                <strong>Email :</strong>
                                <p>&nbsp;{email}</p>
                            </div>
                            <div className={`text-center my-1 mx-3 d-flex ${isDarkMode ? 'text-light' : 'text-dark'}`}>
                                <Button variant="success" type="submit" className='my-2 p-1 mr-2' onClick={verifyEmailHandler}>Verify Email</Button>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <Container className={`p-5 ${isDarkMode ? 'bg-dark' : 'bg-light'} rounded`} fluid>
                <h3 className={`mx-2 text-center ${isDarkMode ? 'bg-dark border  ' : 'bg-light'} shadow p-2 rounded`} style={{ fontFamily: 'Arial, sans-serif' }}>
                    Update Profile
                </h3>
                <Form className={`p-4 mx-2 shadow rounded border`} style={{ background: isDarkMode ? 'var(--dark-background)' : 'var(--light-background)' }}>
                    <Form.Group controlId="formName">
                        <Form.Label>Update Name:</Form.Label>
                        <Form.Control type="text" placeholder="Enter your name" ref={nameRef} />
                    </Form.Group>
                    <Form.Group controlId="formProfilePic">
                        <Form.Label>Update Profile Picture:</Form.Label>
                        <Form.Control type="file" accept=".jpg, .jpeg, .png" ref={imageRef} />
                    </Form.Group>
                    <Button variant="success" type="submit" className='my-2 p-1 mr-2' onClick={handleUpdateButtonClick}>
                        Update
                    </Button>
                    <Button variant="danger" className="my-2 p-1 mx-2">
                        Cancel
                    </Button>
                </Form>
            </Container>
        </div>
    );
};

export default Profile;
