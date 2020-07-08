import React from 'react';
import { Container, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListAlt } from '@fortawesome/free-solid-svg-icons';
import AntikvitetType from '../../types/AntikvitetType';
import RoledMainMenu  from '../RoledMainMenu/RoledMainMenu';


interface AntikvitetPageProperties {
    match: {
        params: {
            aId: number;

        }
    }
    
}
interface AntikvitetPageState {
    type?: AntikvitetType;
}

interface ApiAntikvitetDto{
  antikvitetId: number;
  name: string;
  description: string;
  photos: {
    imagePath: string;
  }[],
}


export default class AntikvitetPage extends React.Component<AntikvitetPageProperties>{
    state: AntikvitetPageState;
    constructor(props: Readonly<AntikvitetPageProperties>){
        super(props);

        this.state = { };
    }
    

    render(){
        return (
        <Container>
          <RoledMainMenu role='visitor' />
          <Card>
            <Card.Body>
              <Card.Title>
                    <FontAwesomeIcon icon = { faListAlt } />
              </Card.Title>
              <Card.Text>
                antikviteti
              </Card.Text>
            </Card.Body>
          </Card>
        </Container>
        );
    }
    
        
    
}