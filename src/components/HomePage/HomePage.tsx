import {Container, Card, Row, Col} from 'react-bootstrap';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import api , { ApiResponse } from '../../api/api';
import AntikvitetType from '../../types/AntikvitetType';
import { Link } from 'react-router-dom';
import { ApiConfig } from '../../config/api.config';
import RoledMainMenu  from '../RoledMainMenu/RoledMainMenu';

interface HomePageState{
  isUserLoggedIn: boolean;
  antikvitets: AntikvitetType[];
}

interface ApiAntikvitetDto{
  antikvitetId: number;
  name: string;
  description: string;
  photos: {
    imagePath: string;
  }[],
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

  componentWillUpdate(){
    this.getAntikvitets();
  }

  private getAntikvitets(){
      api('api/antikvitet/', 'get', {})
      .then((res: ApiResponse) => {
        if(res.status === "error" || res.status === "login"){
          this.setLogginState(false);
          return;

        }
        this.putAntikvitetsInState(res.data);
      });
  }

  private putAntikvitetsInState(data: ApiAntikvitetDto[]){
    const antikvitets: AntikvitetType[]  = data.map(antikvitet =>{
        const object = {
        antikvitetId: antikvitet.antikvitetId,
        name: antikvitet.name,
        description: antikvitet.description,
        imagePath: '',
        }

        if(antikvitet.photos !==undefined && antikvitet.photos?.length > 0){
          object.imagePath = antikvitet.photos[antikvitet.photos.length-1].imagePath;
        }


        return object;

        
      

    });

    const newState = Object.assign(this.state, {
      antikvitets: antikvitets,
    });

    this.setState(newState);

  }

  private setLogginState(isLoggedIn: boolean){
    const newState = Object.assign(this.state, {
      isUserLoggedIn: isLoggedIn,
    });
        this.setState(newState);
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
      <Col  lg="3" md="4" sm="6" xs="12">
        <Card className="mb-3">
          <Card.Body>
          <Card.Header>
            <img alt={ antikvitet.name }
                 src={ ApiConfig.PHOTO_PATH + "/" + antikvitet.imagePath}
                 className="w-100"
                  />
          </Card.Header>
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
