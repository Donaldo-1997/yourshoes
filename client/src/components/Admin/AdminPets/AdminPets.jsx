import React from "react";
import SideBar from "../SideBar/SideBar";
import DatatableProducts from "./DatatableProducts";
import { BackgroundListPets, ContainerListPets } from "./StyledAdminPets";

export default function AdminPets() {

    return(
        <BackgroundListPets>
            <ContainerListPets>
                <SideBar />
                <DatatableProducts />
            </ContainerListPets>
        </BackgroundListPets>
    )
}