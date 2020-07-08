import React from 'react';
import { Container, Card, Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import { faListAlt, faPlus, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Redirect } from 'react-router-dom';
import api, { ApiResponse } from '../../api/api';
import RoledMainMenu from '../RoledMainMenu/RoledMainMenu';
import AntikvitetType from '../../types/AntikvitetType';
import  ApiAntikvitetDto  from "../../dtos/ApiAntikvitetDto";


interface AdministratorDashboardAntikvitetState {
    isAdministratorLoggedIn: boolean;
    antikvitets: AntikvitetType[];

    addModal: {
        visible: boolean;
        name: string;
        imagePath: string;
        description: string;
        message: string;
    };

    editModal: {
        antikvitetId?: number;
        visible: boolean;
        name: string;
        imagePath: string;
        description: string;
        message: string;
    };
}

class AdministratorDashbordAntikvitet extends React.Component {
    state: AdministratorDashboardAntikvitetState;

    constructor(props: Readonly<{}>) {
        super(props);

        this.state = {
            isAdministratorLoggedIn: true,
            antikvitets: [],

            addModal: {
                visible: false,
                name: '',
                imagePath: '',
                description: '',
                message: '',
            },

            editModal: {
                visible: false,
                name: '',
                imagePath: '',
                description: '',
                message: '',
            },
        };
    }

    private setAddModalVisibleState(newState: boolean) {
        this.setState(Object.assign(this.state,
            Object.assign(this.state.addModal, {
                visible: newState,
            })
        ));
    }

    private setAddModalStringFieldState(fieldName: string, newValue: string) {
        this.setState(Object.assign(this.state,
            Object.assign(this.state.addModal, {
                [ fieldName ]: newValue,
            })
        ));
    }
    
    private setAddModalNumberFieldState(fieldName: string, newValue: any) {
        this.setState(Object.assign(this.state,
            Object.assign(this.state.addModal, {
                [ fieldName ]: (newValue === 'null') ? null : Number(newValue),
            })
        ));
    }

    private setEditModalVisibleState(newState: boolean) {
        this.setState(Object.assign(this.state,
            Object.assign(this.state.editModal, {
                visible: newState,
            })
        ));
    }

    private setEditModalStringFieldState(fieldName: string, newValue: string) {
        this.setState(Object.assign(this.state,
            Object.assign(this.state.editModal, {
                [ fieldName ]: newValue,
            })
        ));
    }
    
    private setEditModalNumberFieldState(fieldName: string, newValue: any) {
        this.setState(Object.assign(this.state,
            Object.assign(this.state.editModal, {
                [ fieldName ]: (newValue === 'null') ? null : Number(newValue),
            })
        ));
    }

    componentWillMount() {
        this.getAntikvitets();
    }

    private getAntikvitets() {
        api('/api/antikvitet/', 'get', {} )
        .then((res: ApiResponse) => {
            if (res.status === "error" || res.status === "login") {
                this.setLogginState(false);
                return;
            }

            this.putAntikvitetsInState(res.data);
        });
    }

    private putAntikvitetsInState(data?: ApiAntikvitetDto[]) {
        const antikvitets: AntikvitetType[] | undefined = data?.map(antikvitet => {
            return {
                antikvitetId: antikvitet.antikvitetId,
                name: antikvitet.name,
                imagePath: antikvitet.photos?.imagePath,
                description: antikvitet.description,
            };
        });

        const newState = Object.assign(this.state, {
            antikvitets: antikvitets,
        });

        this.setState(newState);
    }

    private setLogginState(isLoggedIn: boolean) {
        this.setState(Object.assign(this.state, {
            isAdministratorLoggedIn: isLoggedIn,
        }));
    }

    render() {
        if (this.state.isAdministratorLoggedIn === false) {
            return (
                <Redirect to="/administrator/login" />
            );
        }

        return (
            <Container>
                <RoledMainMenu role="administrator" />

                <Card>
                    <Card.Body>
                        <Card.Title>
                            <FontAwesomeIcon icon={ faListAlt } /> Antikvitets
                        </Card.Title>

                        <Table hover size="sm" bordered>
                            <thead>
                                <tr>
                                    <th colSpan={ 3 }></th>
                                    <th className="text-center">
                                        <Button variant="primary" size="sm"
                                            onClick={ () => this.showAddModal() }>
                                            <FontAwesomeIcon icon={ faPlus } /> Add
                                        </Button>
                                    </th>
                                </tr>
                                <tr>
                                    <th className="text-right">ID</th>
                                    <th>Name</th>
                                    <th className="text-right">Description</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                { this.state.antikvitets.map(antikvitet => (
                                    <tr>
                                        <td className="text-right">{ antikvitet.antikvitetId }</td>
                                        <td>{ antikvitet.name }</td>
                                        <td className="text-right">{ antikvitet.description }</td>
                                        <td className="text-center">
                                            <Button variant="info" size="sm"
                                                onClick={ () => this.showEditModal(antikvitet) }>
                                                <FontAwesomeIcon icon={ faEdit } /> Edit
                                            </Button>
                                        </td>
                                    </tr>
                                ), this) }
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>

                <Modal size="lg" centered show={ this.state.addModal.visible } onHide={ () => this.setAddModalVisibleState(false) }>
                    <Modal.Header closeButton>
                        <Modal.Title>Add new antikvitet</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label htmlFor="name">Name</Form.Label>
                            <Form.Control id="name" type="text" value={ this.state.addModal.name }
                                onChange={ (e) => this.setAddModalStringFieldState('name', e.target.value) } />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="imagePath">Image URL</Form.Label>
                            <Form.Control id="imagePath" type="url" value={ this.state.addModal.imagePath }
                                onChange={ (e) => this.setAddModalStringFieldState('imagePath', e.target.value) } />
                        </Form.Group>
                        <Form.Group>
                            
                        </Form.Group>
                        <Form.Group>
                            <Button variant="primary" onClick={ () => this.doAddAntikvitet() }>
                                <FontAwesomeIcon icon={ faPlus } /> Add new antikvitet
                            </Button>
                        </Form.Group>
                        { this.state.addModal.message ? (
                            <Alert variant="danger" value={ this.state.addModal.message } />
                        ) : '' }
                    </Modal.Body>
                </Modal>

                <Modal size="lg" centered show={ this.state.editModal.visible } onHide={ () => this.setEditModalVisibleState(false) }>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit category</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label htmlFor="name">Name</Form.Label>
                            <Form.Control id="name" type="text" value={ this.state.editModal.name }
                                onChange={ (e) => this.setEditModalStringFieldState('name', e.target.value) } />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="imagePath">Image URL</Form.Label>
                            <Form.Control id="imagePath" type="url" value={ this.state.editModal.imagePath }
                                onChange={ (e) => this.setEditModalStringFieldState('imagePath', e.target.value) } />
                        </Form.Group>
                        
                        <Form.Group>
                            <Button variant="primary" onClick={ () => this.doEditCategory() }>
                                <FontAwesomeIcon icon={ faEdit } /> Edit category
                            </Button>
                        </Form.Group>
                        { this.state.editModal.message ? (
                            <Alert variant="danger" value={ this.state.editModal.message } />
                        ) : '' }
                    </Modal.Body>
                </Modal>
            </Container>
        );
    }

    private showAddModal() {
        this.setAddModalStringFieldState('name', '');
        this.setAddModalStringFieldState('imagePath', '');
        this.setAddModalStringFieldState('message', '');
        this.setAddModalNumberFieldState('parentCategoryId', 'null');
        this.setAddModalVisibleState(true);
    }

    private doAddAntikvitet() {
        api('/api/antikvitet/', 'post', {
            name: this.state.addModal.name,
            imagePath: this.state.addModal.imagePath,
            
        }, )
        .then((res: ApiResponse) => {
            if (res.status === "login") {
                this.setLogginState(false);
                return;
            }

            if (res.status === "error") {
                this.setAddModalStringFieldState('message', JSON.stringify(res.data));
                return;
            }

            this.setAddModalVisibleState(false);
            this.getAntikvitets();
        });
    }

    private showEditModal(antikvitet: AntikvitetType) {
        this.setEditModalStringFieldState('name', String(antikvitet.name));
        this.setEditModalStringFieldState('imagePath', String(antikvitet.imagePath));
        this.setEditModalStringFieldState('message', '');
       
        this.setEditModalNumberFieldState('antikvitetId', antikvitet.antikvitetId);
        this.setEditModalVisibleState(true);
    }

    private doEditCategory() {
        api('/api/antikvitet/' + this.state.editModal.antikvitetId, 'patch', {
            name: this.state.editModal.name,
            imagePath: this.state.editModal.imagePath,
            
        },)
        .then((res: ApiResponse) => {
            if (res.status === "login") {
                this.setLogginState(false);
                return;
            }

            if (res.status === "error") {
                this.setAddModalStringFieldState('message', JSON.stringify(res.data));
                return;
            }

            this.setEditModalVisibleState(false);
            this.getAntikvitets();
        });
    }
}

export default AdministratorDashbordAntikvitet;