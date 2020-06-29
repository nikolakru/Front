import React from 'react';
import { Container, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListAlt } from '@fortawesome/free-solid-svg-icons';
import AntikvitetType from '../../types/AntikvitetType';



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


export default class AntikvitetPage extends React.Component<AntikvitetPageProperties>{
    state: AntikvitetPageState;
    constructor(props: Readonly<AntikvitetPageProperties>){
        super(props);

        this.state = { };
    }

    render(){
        return (
        <Container>
          <Card>
            <Card.Body>
              <Card.Title>
                    <FontAwesomeIcon icon = { faListAlt } /> {this.state.type?.name }
              </Card.Title>
              <Card.Text>
                ovde ce biti antikviteti
              </Card.Text>
            </Card.Body>
          </Card>
        </Container>
        );
    }
    componentWillMount(){
        
    }
}