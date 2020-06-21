import React from 'react';
import { Container, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import CardBody  from 'react-bootstrap/Card';



export default class  ContactPage extends React.Component {
    render(){
        return (
        <Container>
            <Card>
                <CardBody>
                    <Card.Title>
                        <FontAwesomeIcon icon= { faPhone } /> ContactPage
                    </Card.Title>
                    <Card.Text>
                        Contact details will be shown here
                    </Card.Text>
                </CardBody>
            </Card>
        </Container>
        );
    }
   
}