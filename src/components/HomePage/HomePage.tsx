

import {Container, Card} from 'react-bootstrap';
import {faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import AntikvitetType from '../../types/AntikvitetType';


interface HomePageState{
  isUserLoggedIn: boolean;
  antikvitets: AntikvitetType[];
}


class HomePage extends React.Component {
  render() {
    return(
        <Container>
          <Card>
            <Card.Body>
              <Card.Title>
                  <FontAwesomeIcon icon={ faHome } /> Home
              </Card.Title>
              <Card.Text>
                Home page
              </Card.Text>
            </Card.Body>
          </Card>
          
        </Container>
     );
   }   
}

export default HomePage;
