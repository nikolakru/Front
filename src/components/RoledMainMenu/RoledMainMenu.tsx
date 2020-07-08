import React from "react";
import { MainMenuItem, MainMenu } from "../MainMenu/MainMenu";

interface RoledMainMenuProperties {
    role: 'administrator' | 'visitor';
}

export default class RoledMainMenu extends React.Component<RoledMainMenuProperties> {
    render() {
        let items: MainMenuItem[] = [];

        switch (this.props.role) {
            case 'visitor': items = this.getVisitorMenuItems(); break;
            case 'administrator': items = this.getAdministratorMenuItems(); break;
        }

        return <MainMenu items={ items }  />

        
    }

    getAdministratorMenuItems(): MainMenuItem[] {
        return [
            new MainMenuItem("Home", "/"),
            new MainMenuItem("Dashboard", "/administrator/dashboard"),
            new MainMenuItem("Logout", "/administrator/logout"),
            new MainMenuItem("AdministratorDashbordAntikvitet", "/administrtor/dashboard/antikvitet")
        ];
    }

    getVisitorMenuItems(): MainMenuItem[] {
        return [
            new MainMenuItem("Home", "/"),
            new MainMenuItem("Contact", "/contact"),
            new MainMenuItem("Login", "/auth/administrator/login"),
            new MainMenuItem("Antikvitet","api/antikvitet/:aId")
        ];
    }
}