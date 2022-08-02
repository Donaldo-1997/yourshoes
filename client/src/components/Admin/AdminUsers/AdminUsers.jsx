import React from "react";
import AdminTable from "./AdminTable";
import SideBar from "../SideBar/SideBar";
import { BackgroundListUsers, ContainerListUsers  } from "./StyledAdminUsers";


export default function AdminUsers() {

    return (
        <>
        <BackgroundListUsers>
            <ContainerListUsers >
                {/* <div className="listTitle">Users</div> */}
                <SideBar />
                <AdminTable/>
                {/* <AdminDonation/> */}
            </ContainerListUsers >
        </BackgroundListUsers>
        </>
    )
}