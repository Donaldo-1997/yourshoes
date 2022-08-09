import React from "react";
import AdminTable from "./AdminTable";
import SideBar from "../SideBar/SideBar";
import { BackgroundListUsers, ContainerListUsers  } from "./StyledAdminUsers";
import NavBar2 from "../../Navbar2/Navbar2"


export default function AdminUsers() {

    return (
        <>
        <NavBar2/>
        <BackgroundListUsers>
            <ContainerListUsers >
              
                <SideBar />
                <AdminTable/>
                
            </ContainerListUsers >
        </BackgroundListUsers>
        </>
    )
}