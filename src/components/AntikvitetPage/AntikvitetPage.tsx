import React from 'react';
import { Container, Card, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import AntikvitetType from '../../types/AntikvitetType';
import RoledMainMenu  from '../RoledMainMenu/RoledMainMenu';
import api , {  ApiResponse } from '../../api/api';
import { ApiConfig } from '../../config/api.config';


interface AntikvitetPageProperties {
    match: {
        params: {
            aId: number;

        }
    }
    
}
interface AntikvitetPageState {
    type?: AntikvitetType;
    antikvitet?: ApiAntikvitetDto;
}

interface ApiAntikvitetDto{
  antikvitetId: number;
  name: string;
  description: string;
  year: string;
  price: number;
  photos: {
    photoId: number;
    imagePath: string;
  }[],
}


export default class AntikvitetPage extends React.Component<AntikvitetPageProperties>{
    state: AntikvitetPageState;
    constructor(props: Readonly<AntikvitetPageProperties>){
        super(props);

        this.state = {
          
          
      };
    }
    private setLogginState(isLoggedIn: boolean) {
      const newState = Object.assign(this.state, {
          isUserLoggedIn: isLoggedIn,
      });

      this.setState(newState);
  }

  private setMessage(message: string) {
      const newState = Object.assign(this.state, {
          message: message,
      });

      this.setState(newState);
  }

  private setAntikvitetData(antikvitetData: ApiAntikvitetDto | undefined) {
      const newState = Object.assign(this.state, {
          antikvitet: antikvitetData,
      });

      this.setState(newState);
  }



  componentDidMount() {
      this.getAntikvitetData();
  }

  componentDidUpdate(oldProperties: AntikvitetPageProperties) {
      if (oldProperties.match.params.aId === this.props.match.params.aId) {
          return;
      }

      this.getAntikvitetData();
  }

  getAntikvitetData() {
      api('api/antikvitet/' + this.props.match.params.aId, 'get', {})
      .then((res: ApiResponse) => {
          if (res.status === 'login') {
              return this.setLogginState(false);
          }

          if (res.status === 'error') {
              this.setAntikvitetData(undefined);
              
              this.setMessage('This antikvitet does not exist.');
              return;
          }

          const data: ApiAntikvitetDto = res.data;

          this.setMessage('');
          this.setAntikvitetData(data);

        
      });
  }

  

  

  

    render(){
        return (
        <Container>
          <RoledMainMenu role='visitor' />
          <Card>
                    <Card.Body>
                        <Card.Title>
                            <FontAwesomeIcon icon={ faBoxOpen } /> {
                                this.state.antikvitet?
                                this.state.antikvitet?.name :
                                'Antikvitet not found'
                            }
                        </Card.Title>

                        

                        {
                            this.state.antikvitet ?
                            ( this.renderAntikvitetData(this.state.antikvitet) ) :
                            ''
                        }
                    </Card.Body>
                </Card>
            </Container>
        );
    }

    renderAntikvitetData(antikvitet: ApiAntikvitetDto) {
      return (
          <Row>
              <Col xs="12" lg="8">
                 <div className="description">
                      { antikvitet.description }
                  </div>
              </Col>

              <Col xs="12" lg="8">
                 <div className="year">
                      { antikvitet.year + ' godina porekla'}
                  </div>
              </Col>

              <Col xs="12" lg="8">
                 <div className="price">
                      { antikvitet.price + ' EUR'}
                  </div>
              </Col>
          
        
                <Col xs="12" lg="4">
                    <Row>
                        <Col xs="12" className="mb-3">
                            <img alt={ 'Image - ' + antikvitet.photos[0].photoId}
                                    src={ ApiConfig.PHOTO_PATH + '/' + antikvitet.photos[0].imagePath }
                                    className="w-100" />
                        </Col>
                    </Row>

                </Col>

        </Row>
        
      )
    }
  }