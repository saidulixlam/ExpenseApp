import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Card, ListGroup, Button } from 'react-bootstrap';
import Layout from '../store/Layout/Layout';

const Premium = () => {
    const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);

    return (
        <Layout>
            <Container className='mt-5'>
            <Container className={`my-5 ${isDarkMode ? 'text-light' : 'text-dark'}`}>
                <Card className={isDarkMode ? 'bg-dark' : 'bg-light'}>
                    <Card.Body>
                        <Card.Title>Premium Access</Card.Title>
                        <Card.Text>
                            Unlock premium features for a better expense tracking experience.
                        </Card.Text>
                        <ListGroup className="list-group-flush rounded">
                            <ListGroup.Item>Ad-free experience</ListGroup.Item>
                            <ListGroup.Item>Advanced expense analytics</ListGroup.Item>
                            <ListGroup.Item>Priority customer support</ListGroup.Item>
                        </ListGroup>
                        <Button
                            className={`mt-3 rounded ${isDarkMode ? 'btn-warning' : 'btn-primary'}`}
                        >
                            Join Premium
                        </Button>
                    </Card.Body>
                </Card>
            </Container>
            </Container>
        </Layout>
    );
}

export default Premium;
