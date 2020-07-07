import {Container, Card, Row, Col} from 'react-bootstrap';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';

import AntikvitetType from '../../types/AntikvitetType';
import { Link } from 'react-router-dom';

import RoledMainMenu  from '../RoledMainMenu/RoledMainMenu';

interface HomePageState{
  isUserLoggedIn: boolean;
  antikvitets: AntikvitetType[];
}


class HomePage extends React.Component {

  state: HomePageState;

  constructor(props: Readonly<{}>){
    super(props);

    this.state = {
      isUserLoggedIn: true,
      antikvitets: [],
    };
  }

  componentWillMount(){
    this.getAntikvitets();
  }

  private getAntikvitets(){

  }

  render() {
    return(
      <Container>
          <RoledMainMenu role='visitor' />
          <Card>
            <Card.Body>
              <Card.Title>
                  <FontAwesomeIcon icon={ faList } /> Lista antikviteta
              </Card.Title>
              <Row>
              {this.state.antikvitets.map(this.singleAntikvitet) }
              </Row>
              
            </Card.Body>
          </Card>
          
        </Container>
     );
   }   
   private singleAntikvitet(antikvitet: AntikvitetType){
    return(
      <Col md="3">
        <Card>
          <Card.Body>
              <Card.Title>{ antikvitet.name }</Card.Title>
                <Card.Text>
                    {antikvitet.description}
                </Card.Text>
                <Link to ={ `/api/antikvitet/${ antikvitet.antikvitetId }`}
                className="btn btn-primary">
                Open antikvitet
                </Link>
                
          </Card.Body>
        </Card>
      </Col>

    );
  }
}



export default HomePage;
